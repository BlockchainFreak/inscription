import type { NextApiRequest, NextApiResponse } from 'next'
import { UserTable } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const email = req.query.email as string;

    const users = await db.select().from(UserTable).where(eq(UserTable.email, email)).execute();

    // if account does not exist, first sign up
    if(users.length === 0) {
        const newUser = {
            email: email,
            verified: false,
            nickname: "",
            createdAt: Date.now(),
            credits: 0,
            campusId: null,
        }
        await db.insert(UserTable).values(newUser)
        res.status(200).json({ newUser})
        return;
    }

    res.status(200).json(users[0])
}
