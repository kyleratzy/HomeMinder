import { format, isSameDay, parseISO } from 'date-fns';
import { View, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, useTheme } from 'react-native-paper';

import Task from '../components/Task';
import TaskCheckbox from '../components/TaskCheckbox';
import {
  dueThisWeek,
  overdue,
  dueInTheFuture,
  sortByNextDate,
  mapNextDates,
} from '../helpers/dates';
import { useUserTasksStore } from '../hooks/useUserTasksStore';
import { globalStyles } from '../styles';
import { TaskType } from '../types';

export default function HomeUpcoming() {
  // Hooks
  const { userTasks }: { userTasks: TaskType[] } = useUserTasksStore();
  const theme = useTheme();

  const allNextTasks = userTasks.map(mapNextDates).sort(sortByNextDate);
  const dueThisWeekTasks = allNextTasks.filter(dueThisWeek);
  const overdueTasks = allNextTasks.filter(overdue);
  const dueInTheFutureTasks = allNextTasks.filter(dueInTheFuture);

  return (
    <View>
      <ScrollView alwaysBounceVertical fadingEdgeLength={200} style={styles.list}>
        <SafeAreaView style={globalStyles.container}>
          <View style={{ paddingBottom: 32 }}>
            <Text
              style={{
                ...globalStyles.h5,
                letterSpacing: 2,
                marginBottom: 16,
                textAlign: 'center',
                width: '100%',
                textTransform: 'uppercase',
              }}>
              This Week
            </Text>
            {overdueTasks.length === 0 && dueThisWeekTasks.length === 0 && (
              <Card style={{ ...globalStyles.card, padding: 16, alignItems: 'center' }}>
                <Text style={globalStyles.label}>no tasks due</Text>
              </Card>
            )}
            {overdueTasks.length > 0 && (
              <Text style={{ ...globalStyles.label, color: theme.colors.error, marginBottom: 6 }}>
                Overdue
              </Text>
            )}
            {overdueTasks.map((task: TaskType, i: number) => (
              <TaskCheckbox task={task} key={task.id} />
            ))}
            {dueThisWeekTasks.map((task: TaskType, i: number) => (
              <View key={task.id}>
                {(i === 0 ||
                  !isSameDay(
                    parseISO(task?.nextDate as string),
                    parseISO(dueThisWeekTasks[i === 0 ? 0 : i - 1].nextDate as string)
                  )) && (
                  <Text style={{ ...globalStyles.label, marginBottom: 6 }}>
                    {format(parseISO(task.nextDate as string), 'EEEE')}
                  </Text>
                )}
                <TaskCheckbox task={task} key={task.id} />
              </View>
            ))}
          </View>

          <View>
            <Text
              style={{
                ...globalStyles.h5,
                letterSpacing: 2,
                marginBottom: 16,
                textAlign: 'center',
                width: '100%',
                textTransform: 'uppercase',
              }}>
              Upcoming
            </Text>
            {dueInTheFutureTasks.map((task: TaskType, i: number) => (
              <View key={task.id}>
                {(i === 0 ||
                  !isSameDay(
                    parseISO(task?.nextDate as string),
                    parseISO(dueInTheFutureTasks[i === 0 ? 0 : i - 1].nextDate as string)
                  )) && (
                  <Text style={{ ...globalStyles.label, marginBottom: 8 }}>
                    {format(parseISO(task.nextDate as string), 'MMM d, yyyy')}
                  </Text>
                )}
                <View style={{ paddingHorizontal: 16 }}>
                  <Task task={task} compact />
                </View>
              </View>
            ))}
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    flexGrow: 1,
  },
});
