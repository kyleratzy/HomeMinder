import { add, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';

import { TaskType } from '../types';

export const startOfCurrentWeek = startOfWeek(new Date());
export const endOfCurrentWeek = endOfWeek(new Date());

export const dueThisWeek = (task: TaskType) => {
  const lastCheckin: Date | undefined = task.checkins
    ? task.checkins[task.checkins.length - 1]
    : undefined;
  const nextDate = lastCheckin
    ? add(lastCheckin, {
        [task.interval]: task.frequency,
      })
    : task.startDate;

  return isWithinInterval(nextDate, {
    start: startOfCurrentWeek,
    end: endOfCurrentWeek,
  });
};
