// pages/api/auth/signup.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'Email and password are required' });

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(409).json({ message: 'User already exists' });

    const hashedPassword = await hash(password, 12);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({ message: 'User created' });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong', error });
  }
}
