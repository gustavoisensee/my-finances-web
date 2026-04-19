import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { obsMonth, obsDashboard, obsMonthById } from '@/helpers/month';
import { getMonthByIdWithAllData, getMonths } from '@/services/month';
import { getSessionYear } from '@/helpers/year';
import { Year as YearType } from '@/types/year';

const getInitialYearId = (queryClient: ReturnType<typeof useQueryClient>): number => {
  const cachedYears = queryClient.getQueryData<YearType[]>(['years']);
  if (!cachedYears) return 0;
  const sessionYear = getSessionYear();
  return cachedYears.find((y) => y.value === sessionYear)?.id ?? 0;
};

export const useMonths = (iBudgets: boolean = false, iExpenses: boolean = false) => {
  const queryClient = useQueryClient();
  const [yearId, setYearId] = useState(() => getInitialYearId(queryClient));

  const { data, error, isFetching, refetch } = useQuery({
    queryKey: ['months', yearId],
    queryFn: () => getMonths(yearId, iBudgets, iExpenses),
    staleTime: 2 * 60 * 1000,
    retry: 3,
    enabled: yearId > 0
  });

  useEffect(() => {
    const fn = (_year: YearType) => setYearId(_year.id);
    obsMonth.subscribe(fn);
    obsDashboard.subscribe(refetch);

    return () => {
      obsMonth.unsubscribe(fn);
      obsDashboard.unsubscribe(refetch);
    }
  }, [refetch]);

  return {
    data, error, isFetching
  }
};

export const useMonthById = (monthId: number) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['month', monthId],
    queryFn: () => getMonthByIdWithAllData(monthId),
    staleTime: 2 * 60 * 1000, // 2 min
    retry: 3,
    enabled: monthId > 0
  });

  useEffect(() => {
    obsMonthById.subscribe(refetch);
    return () => obsMonthById.unsubscribe(refetch);
  }, [refetch]);

  return {
    data, error, isLoading
  }
};
