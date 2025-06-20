// pages/api/auth/signin.ts
import { PrismaClient } from '@prisma/client';
import { compare } from 'bcryptjs';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

    const { email, password } = req.body;


    if (!email || !password)
      return res.status(400).json({ message: 'Email and password required' });

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isValid = await compare(password, user.password);
    console.log({ isValid });
    if (!isValid) return res.status(401).json({ message: 'Invalid credentials' });

    return res.status(200).json({
      id: user.id,
      email: user.email,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}
