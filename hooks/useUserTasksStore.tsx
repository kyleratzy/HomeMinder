import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';

import { TaskType } from '../types/TaskType';

interface UserTasksStoreState {
  userTasks: TaskType[];
  _hasHydrated: boolean;
  addUserTask(task: TaskType): void;
  deleteUserTask(task: TaskType): void;
  completeTask(task: TaskType): void;
  uncompleteTask(task: TaskType): void;
}

export const useUserTasksStore = create(
  devtools(
    persist<UserTasksStoreState>(
      (set, get) => ({
        userTasks: [],
        _hasHydrated: false,
        addUserTask: (task: TaskType) => {
          const userTasks = [...get().userTasks];
          const existingTask = userTasks.findIndex((t) => t.id === task.id) >= 0;

          if (existingTask) {
            const otherTasks = userTasks.filter((t) => t.id !== task.id);
            set({ userTasks: [...otherTasks, task] });
          } else {
            set({ userTasks: [...userTasks, task] });
          }
        },
        deleteUserTask: (task: TaskType) => {
          const remainingTasks = [...get().userTasks].filter((t) => t.id !== task.id);
          set({ userTasks: [...remainingTasks] });
          // AsyncStorage.clear();
        },
        completeTask: (task: TaskType) => {
          const completedTask = {
            ...task,
            checkins: [...(task.checkins || []), new Date().toISOString()],
          };
          const existingTasks = [...get().userTasks];
          existingTasks.splice(
            existingTasks.findIndex((t: TaskType) => t.id === task.id),
            1
          );
          console.log(completedTask);
          set({ userTasks: [...existingTasks, completedTask] });
        },
        uncompleteTask: (task: TaskType) => {
          const uncompletedTask = { ...task };
          uncompletedTask?.checkins?.pop();

          const existingTasks = [...get().userTasks];
          existingTasks.splice(
            existingTasks.findIndex((t: TaskType) => t.id === task.id),
            1
          );
          set({ userTasks: [...existingTasks, uncompletedTask] });
        },
      }),
      {
        name: '@userTasks',
        storage: createJSONStorage(() => AsyncStorage),
        onRehydrateStorage: () => () => {
          useUserTasksStore.setState({ _hasHydrated: true });
        },
      }
    )
  )
);
