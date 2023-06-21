import { startOfWeek, endOfWeek } from 'date-fns';

export const startOfCurrentWeek = startOfWeek(new Date());
export const endOfCurrentWeek = endOfWeek(new Date());

export const nextTaskDate = (lastCheckin: Date, frequency: string, interval: string) => {};
