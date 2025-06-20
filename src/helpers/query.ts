import { NextApiRequest } from 'next';

export const DEFAULT_TAKE = 10;

export const isValid = (bool: string) => bool?.toLowerCase() === 'true';

export const getQueryTake = (req: NextApiRequest) => {
  const { take } = req.query;
  
  return Number(take) || DEFAULT_TAKE;
};
