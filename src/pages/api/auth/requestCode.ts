// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { sendVerificationCode } from '@/lib/mailer';
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { verificationCodeTable } from '@/lib/schema';

const TIMELIMIT = 1 * 60 * 1000; // 1 minute before someone requests a new code

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { username, email } = req.body;

  const testExists = await db.select().from(verificationCodeTable).where(eq(verificationCodeTable.email, email)).execute();
  if (testExists.length > 0) {
    res.status(400).json({ message: `Email ${email} already exists` })
  }

  const code = ((Math.random() * 1_000_000) + 100_000).toString();

  const codes = await db.select().from(verificationCodeTable).where(eq(verificationCodeTable.email, email)).execute();

  const firstTime = codes.length === 0;

  try {
    if (firstTime) {
      // if there is no code for this email, create one
      await db.insert(verificationCodeTable).values({ email, code, lastUpdate: Date.now() }).execute();
      // send the code
      await sendVerificationCode({ email, code, username });
      // notify the client
      res.status(200).json(true)
    }
    else {
      const { lastUpdate } = codes[0];
      // check if the last code was sent more than 1 minute ago
      if (Date.now() - lastUpdate > TIMELIMIT) {
        // if so, update the code and send it
        await sendVerificationCode({ email, code, username });
        // update the code and lastUpdate
        await db.update(verificationCodeTable).set({ code, lastUpdate: Date.now() }).where(eq(verificationCodeTable.email, email)).execute();
        // notify the client
        res.status(200).json(true)
      } else {
        res.status(400).json({ message: `You can only request a new code every ${TIMELIMIT / 1000} seconds` })
      }
    }
  }
  catch (error) {
    res.status(400).json({ message: `Unable to send Code at email ${email}` })
  }
}
