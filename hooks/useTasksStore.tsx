import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';

import { TaskType } from '../types/TaskType';

interface UserTasksStoreState {
  tasks: TaskType[];
}

export const useTasksStore = create(
  devtools(
    persist<UserTasksStoreState>(
      (set, get) => ({
        tasks: [],
      }),
      {
        name: '@tasks',
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  )
);
