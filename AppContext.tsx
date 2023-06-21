import { createContext, useState, useEffect } from 'react';

import useStorage from './hooks/useStorage';
import { TaskType } from './types';

type Context = {
  store: any;
  actions: any;
};

export const AppContext = createContext<Context>({} as Context);

export const AppContextWrapper = ({ children }: any) => {
  const [store, setStore] = useState({
    userTasks: [{}],
  });
  const [actions, setActions] = useState({
    addUserTask: (task: TaskType) => {
      console.log({ task });
      console.log({ store });
      console.log({ ...store, userTasks: [...store.userTasks, task] });

      setStore({ ...store, userTasks: [...store.userTasks, task] });
    },
  });

  // Hooks
  const [getUserTasks, postUserTasks] = useStorage('@user_tasks');

  useEffect(() => {
    loadData();
  }, []);

  // Methods
  const loadData = async () => {
    const data = await getUserTasks('');
    setStore({ ...store, userTasks: data });
  };

  return <AppContext.Provider value={{ store, actions }}>{children}</AppContext.Provider>;
};
