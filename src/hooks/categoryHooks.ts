import { getCategories } from '@/services/category';
import { Category } from '@/types/category';
import { useQuery } from '@tanstack/react-query'

export const useCategories = () => {
  const { data, error, isFetching } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 2 * 60 * 1000, // 2 min
    retry: 3
  });

  return {
    data: data?.data as Category[] || [],
    error,
    isFetching
  }
};
