import {
  add,
  isPast,
  isFuture,
  parseISO,
  startOfWeek,
  endOfWeek,
  isWithinInterval,
  endOfDay,
} from 'date-fns';

import { TaskType } from '../types';

export const startOfCurrentWeek = startOfWeek(new Date());
export const endOfCurrentWeek = endOfWeek(new Date());

export const getNextDate = (task: TaskType) => {
  const lastCheckin: string | undefined = task.checkins
    ? task.checkins[task.checkins.length - 1]
    : undefined;

  return lastCheckin
    ? add(parseISO(lastCheckin), {
        [task.interval]: task.frequency,
      }).toISOString()
    : task.startDate;
};

export const mapNextDates = (task: TaskType) => {
  return { ...task, nextDate: getNextDate(task) };
};

export const sortByNextDate = (task1: TaskType, task2: TaskType) => {
  if (!task1.nextDate || !task2.nextDate) {
    return 0;
  }
  return task1?.nextDate < task2?.nextDate ? -1 : task1.nextDate > task2.nextDate ? 1 : 0;
};

export const overdue = (task: TaskType) => {
  return isPast(endOfDay(parseISO(getNextDate(task))));
};

export const upcoming = (task: TaskType) => {
  return isFuture(endOfDay(parseISO(getNextDate(task))));
};

export const dueThisWeek = (task: TaskType) => {
  return isWithinInterval(parseISO(getNextDate(task)), {
    start: startOfCurrentWeek,
    end: endOfCurrentWeek,
  });
};

export const doneThisWeek = (task: TaskType) => {
  const lastCheckin: string | undefined = task.checkins
    ? task.checkins[task.checkins.length - 1]
    : undefined;

  if (!lastCheckin) {
    return false;
  }

  return isWithinInterval(parseISO(lastCheckin), {
    start: startOfCurrentWeek,
    end: endOfCurrentWeek,
  });
};
