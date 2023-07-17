import type { NextApiRequest, NextApiResponse } from 'next'
import { UserTable } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const email = req.query.email as string;

    const users = await db.select({
        campusId: UserTable.campusId,
        email: UserTable.email,
        name: UserTable.name,
        nickname: UserTable.nickname,
        credits: UserTable.credits,
    }).from(UserTable).where(eq(UserTable.email, email)).execute();

    if (users.length === 0) {
        res.status(404).json({ message: `User with email ${email} not found` })
    }

    res.status(200).json(users[0])
}
