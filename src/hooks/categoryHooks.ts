import { getCategories } from '@/services/category';
import { useQuery } from '@tanstack/react-query'

export const useCategories = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 2 * 60 * 1000, // 2 min
    retry: 3
  });

  return {
    data, error, isLoading
  }
};
