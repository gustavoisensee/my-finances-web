// pages/api/year.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { getQueryTake, isValid } from '@/helpers/query';

const prisma = new PrismaClient();

// i = include
type Params = {
  id?: string;
  iIncomes?: string;
  iBudgets?: string;
  iExpenses?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });
  
  try {
    const session = await getServerSession(req, res, authOptions);

    const {
      id,
      iIncomes = 'false',
      iBudgets = 'false',
      iExpenses = 'false',
    }: Params = req.query;

    if (!id) {
      return res.status(500).json('id must be passed!');
    }

    // @ts-ignore
    const userId = session?.user?.id || '';

    const months = await prisma.month.findFirst({
      include: {
        incomes: isValid(iIncomes),
        budgets: isValid(iBudgets) ? {
          include: {
            expenses: isValid(iExpenses)
          }
        } : false
      },
      where: {
        userId: Number(userId),
        id: Number(id)
      }
    });

    return res.status(200).json(months);
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong', error });
  }
}
