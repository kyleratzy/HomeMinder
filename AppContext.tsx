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
    tasks: [{}],
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
  const [getTasks, postTasks] = useStorage('@tasks');

  useEffect(() => {
    loadData();
  }, []);

  // Methods
  const loadData = async () => {
    Promise.all([getTasks(''), getUserTasks('')]).then((values) => {
      setStore({ ...store, tasks: values[0], userTasks: values[1] });
      console.log({ ...store, tasks: values[0], userTasks: values[1] });
    });
    setTimeout(() => {
      console.log({ store });
    }, 1000);
  };

  return <AppContext.Provider value={{ store, actions }}>{children}</AppContext.Provider>;
};
