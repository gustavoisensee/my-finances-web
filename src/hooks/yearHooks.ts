import { FormEventHandler, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query'

import { getSessionYear, setSessionYear } from '@/helpers/year';
import { getYears } from '@/services/year';
import { Year } from '@/types/year';
import { obs as obsMonth } from '@/helpers/month';

export const useYears = () => {
  const { data, isFetching } = useQuery({
    queryKey: ['years'],
    queryFn: getYears,
    staleTime: 30 * 60 * 1000, // 30 min
    retry: 3
  });

  const defaultYear = getSessionYear();
  const [state, setState] = useState(defaultYear);
  const years = useMemo(() => data?.data as Year[] || [], [data?.data]);
  const year = useMemo(() => years.find((y: Year) => y.value === Number(state)), [years, state]);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const _year = Number(e.target.value);
    setSessionYear(_year);
    setState(_year);
  };

  useEffect(() => {
    setTimeout(() => {
      if (year) obsMonth.notify(year);
    }, 0);
  }, [year])

  return {
    isFetching, years, year, state, onChange
  }
};
