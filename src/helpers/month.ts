import Observable from './observable';

export const obsMonth = new Observable();

export const obsDashboard = new Observable();
export const refreshDashboard = () => obsDashboard.notify();

export const obsMonthById = new Observable();
export const refreshMonthById = () => obsMonthById.notify();
