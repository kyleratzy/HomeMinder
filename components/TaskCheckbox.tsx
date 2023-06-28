import { useNavigation } from '@react-navigation/native';
import { isWithinInterval, parseISO } from 'date-fns';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Checkbox, useTheme } from 'react-native-paper';

import { startOfCurrentWeek, endOfCurrentWeek, overdue } from '../helpers/dates';
import { useUserTasksStore } from '../hooks/useUserTasksStore';
import { globalStyles } from '../styles';
import { TaskType } from '../types/TaskType';

type TaskProps = {
  task: TaskType;
};

export default function ({ task }: TaskProps) {
  const { completeTask, uncompleteTask } = useUserTasksStore();
  const navigation = useNavigation();
  const theme = useTheme();

  // Methods
  const isChecked = () => {
    if (!task.checkins.length) {
      return false;
    }
    const lastCheckin = task.checkins[task.checkins.length - 1];
    return isWithinInterval(parseISO(lastCheckin), {
      start: startOfCurrentWeek,
      end: endOfCurrentWeek,
    });
  };

  const checked = isChecked();

  const handleCheck = () => {
    if (checked) {
      uncompleteTask(task);
    } else {
      completeTask(task);
    }
  };

  return (
    <Card
      style={{
        ...styles.task,
        borderLeftColor: theme.colors.error,
        borderLeftWidth: overdue(task) ? 6 : 0,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}>
        <View style={{ flexBasis: 40 }}>
          <Checkbox status="unchecked" onPress={handleCheck} />
        </View>
        <Text
          onPress={() => navigation.navigate('TasksMain', { screen: 'ViewTask', params: { task } })}
          style={{
            ...globalStyles.h4,
            flexGrow: 1,
          }}>
          {task.name}
        </Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  task: {
    marginBottom: 16,
    padding: 8,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
});
