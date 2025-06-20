// pages/api/year.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });

  try {
    const yearList = await prisma.year.findMany();

    if (!yearList) return res.status(404).json({ message: 'Years not found' });

    return res.status(200).json(yearList);
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong', error });
  }
}
