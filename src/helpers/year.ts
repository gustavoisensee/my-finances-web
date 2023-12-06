import dayjs from 'dayjs';

export const getSessionYear = () => {
  return Number(global?.sessionStorage?.getItem('year') || dayjs().year());
}

export const setSessionYear = (year: number) => {
  sessionStorage.setItem('year', year.toString());
}