import { format, parseISO } from 'date-fns';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import TaskCheckbox from '../components/TaskCheckbox';
import { useUserTasksStore } from '../hooks/useUserTasksStore';
import { globalStyles } from '../styles';
import { TaskType } from '../types';

export default function HomeCompleted() {
  // Hooks
  const { userTasks }: { userTasks: TaskType[] } = useUserTasksStore();

  const completeTasks = [...userTasks].reduce((acc, task) => {
    return [...acc, ...task.checkins.map((t) => ({ ...task, checkins: [t] }))];
  }, [] as TaskType[]);

  return (
    <View style={globalStyles.container}>
      {completeTasks.map((task: TaskType, i: number) => (
        <View key={task.id}>
          <Text style={{ ...globalStyles.label, marginBottom: 6 }}>
            {format(parseISO(task.checkins[0]), 'M/dd/yy')}
          </Text>

          <TaskCheckbox task={task} key={task.id} />
        </View>
      ))}
    </View>
  );
}


