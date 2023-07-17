import type { NextApiRequest, NextApiResponse } from 'next'
import { UserTable } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { verificationCodeTable } from '@/lib/schema';
import { sha3_256 } from 'js-sha3';

type BodyParams = {
    campusId: string,
    email: string,
    name: string,
    nickname: string,
    password: string,
    code: string,
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const params = req.body as BodyParams;

    const codes = await db.select().from(verificationCodeTable).where(eq(verificationCodeTable.email, params.email)).execute();

    if (codes.length > 0) {
        res.status(400).json({ message: `Email ${params.email} already exists` })
    }

    if (codes.length === 0) {
        res.status(404).json({ message: `Code for email ${params.email} not found` })
    }

    const { code } = codes[0];

    if (code !== params.code) {
        res.status(400).json({ message: `The verfication code entered: ${params.code} was incorrect.` })
    }

    await db.insert(UserTable).values({
        campusId: params.campusId,
        email: params.email,
        name: params.name,
        nickname: params.nickname,
        passHash: sha3_256(params.password),
    }).execute();

    res.status(200).json(true)
}


