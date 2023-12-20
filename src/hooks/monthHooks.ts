import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query'

import { obs, obsDashboard, obsMonthById } from '@/helpers/month';
import { getMonthByIdWithAllData, getMonths } from '@/services/month';
import { Year as YearType } from '@/types/year';

export const useMonths = () => {
  const [yearId, setYearId] = useState(0);

  const { data, error, isFetching, refetch } = useQuery({
    queryKey: ['months', yearId],
    queryFn: () => getMonths(yearId),
    staleTime: 2 * 60 * 1000, // 2 min
    retry: 3,
    enabled: yearId > 0
  });

  useEffect(() => {
    const fn = (_year: YearType) => setYearId(_year.id);
    obs.subscribe(fn);
    obsDashboard.subscribe(refetch);

    return () => {
      obs.unsubscribe(fn);
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
