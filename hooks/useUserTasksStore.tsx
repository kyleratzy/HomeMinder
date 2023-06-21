import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';

import { TaskType } from '../types/TaskType';

interface UserTasksStoreState {
  userTasks: TaskType[];
  _hasHydrated: boolean;
  addUserTask(task: TaskType): void;
}

export const useUserTasksStore = create(
  devtools(
    persist<UserTasksStoreState>(
      (set, get) => ({
        userTasks: [],
        _hasHydrated: false,
        addUserTask: (task: TaskType) => set({ userTasks: [...get().userTasks, task] }),
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
