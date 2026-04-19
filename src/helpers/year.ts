import dayjs from 'dayjs';

export const getSessionYear = () => {
  return Number(sessionStorage.getItem('year') || dayjs().year());
}

export const setSessionYear = (year: number) => {
  sessionStorage.setItem('year', year.toString());
}