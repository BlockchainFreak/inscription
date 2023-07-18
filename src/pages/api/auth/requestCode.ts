// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { sendVerificationCode } from '@/lib/mailer';
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { UserTable, verificationCodeTable } from '@/lib/schema';

const TIMELIMIT = 1 * 60 * 1000; // 1 minute before someone requests a new code

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { username, email, campusId } = req.body;

  const users = await db.select().from(UserTable).where(eq(UserTable.email, email)).execute();

  const user = users[0]

  if(!user) {
    res.status(400).json({ message: `Please create an account first` })
  }

  if(user.verified) {
    res.status(201).json({ status: "verfied", message: `Account Already Verified` })
  }

  const codes = await db.select().from(verificationCodeTable).where(eq(verificationCodeTable.email, email)).execute();
  const firstTime = codes.length === 0;

  // generate a random 6 digit code
  const code = (Math.floor(Math.random() * 1_000_000) + 100_000).toString();

  try {
    if (firstTime) {
      // if there is no code for this email, create one
      console.log(`mailing code: ${code}`)
      await db.insert(verificationCodeTable).values({ email, code, lastUpdate: Date.now(), campusId }).execute();
      // send the code
      await sendVerificationCode({ email: `${campusId}@lums.edu.pk`, code, username });
      console.log("Code Mailed")
      // notify the client
      res.status(200).json({ success: true, message: `Code sent to ${campusId}@lums.edu.pk` })
    }
    else {
      const { lastUpdate } = codes[0];
      // check if the last code was sent more than 1 minute ago
      if (Date.now() - lastUpdate > TIMELIMIT) {
        // if so, update the code and send it
        await sendVerificationCode({ email: `${campusId}@lums.edu.pk`, code, username });
        console.log("Code Mailed")
        // update the code and lastUpdate
        await db.update(verificationCodeTable).set({ code, lastUpdate: Date.now() }).where(eq(verificationCodeTable.email, email)).execute();
        // notify the client
        res.status(200).json({ success: true, message: `Code sent to ${campusId}@lums.edu.pk` })
      } else {
        res.status(200).json({ success: false, message: `You can only request a new code every ${TIMELIMIT / 1000} seconds` })
      }
    }
  }
  catch (error) {
    console.log(error)
    res.status(200).json({ success: false, message: `Unable to send Code at email ${campusId}@lums.edu.pk` })
  }
}
