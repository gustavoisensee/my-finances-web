import { getMonthByIdWithAllData, getMonths } from '@/services/month';
import { useQuery } from '@tanstack/react-query'

export const useMonths = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['months'],
    queryFn: getMonths,
    staleTime: 2 * 60 * 1000, // 2 min
    retry: 3
  });

  return {
    data, error, isLoading
  }
};

export const useMonthById = (monthId: number) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['month', monthId],
    queryFn: () => getMonthByIdWithAllData(monthId),
    staleTime: 2 * 60 * 1000, // 2 min
    retry: 3,
    enabled: monthId > 0
  });

  return {
    data, error, isLoading
  }
};
