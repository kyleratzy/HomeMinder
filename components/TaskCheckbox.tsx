import { useNavigation } from '@react-navigation/native';
import { isWithinInterval, parseISO } from 'date-fns';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Checkbox } from 'react-native-paper';

import { startOfCurrentWeek, endOfCurrentWeek } from '../helpers/dates';
import { useUserTasksStore } from '../hooks/useUserTasksStore';
import { globalStyles } from '../styles';
import { TaskType } from '../types/TaskType';

type TaskProps = {
  task: TaskType;
};

export default function ({ task }: TaskProps) {
  const { completeTask, uncompleteTask } = useUserTasksStore();
  const navigation = useNavigation();

  // Methods
  const isChecked = () => {
    if (!task.checkins) {
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
    <Card style={styles.task}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <View style={{ flexBasis: 40 }}>
          <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={handleCheck} />
        </View>
        <Text
          onPress={() => navigation.navigate('TasksMain', { screen: 'ViewTask', params: { task } })}
          style={{
            ...globalStyles.h3,
            flexGrow: 1,
            textDecorationLine: checked ? 'line-through' : 'none',
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
