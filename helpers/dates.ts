import {
  add,
  parseISO,
  startOfWeek,
  endOfWeek,
  isWithinInterval,
  startOfMonth,
  endOfMonth,
} from 'date-fns';

import { TaskType } from '../types';

export const startOfCurrentWeek = startOfWeek(new Date());
export const endOfCurrentWeek = endOfWeek(new Date());

export const dueThisWeek = (task: TaskType) => {
  const lastCheckin: string | undefined = task.checkins
    ? task.checkins[task.checkins.length - 1]
    : undefined;
  const nextDate = lastCheckin
    ? add(parseISO(lastCheckin), {
        [task.interval]: task.frequency,
      })
    : parseISO(task.startDate);

  return isWithinInterval(nextDate, {
    start: startOfCurrentWeek,
    end: endOfCurrentWeek,
  });
};

export const dueThisMonth = (task: TaskType) => {
  const lastCheckin: string | undefined = task.checkins
    ? task.checkins[task.checkins.length - 1]
    : undefined;
  const nextDate = lastCheckin
    ? add(parseISO(lastCheckin), {
        [task.interval]: task.frequency,
      })
    : parseISO(task.startDate);

  return (
    !isWithinInterval(nextDate, {
      start: startOfWeek(new Date()),
      end: endOfWeek(new Date()),
    }) &&
    isWithinInterval(nextDate, {
      start: startOfMonth(new Date()),
      end: endOfMonth(new Date()),
    })
  );
};
