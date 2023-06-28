import { format, isSameDay, parseISO } from 'date-fns';
import { useState } from 'react';
import { View } from 'react-native';
import { Text, Card, Switch, useTheme } from 'react-native-paper';

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
  const [showMore, setShowMore] = useState(false);

  // Hooks
  const { userTasks }: { userTasks: TaskType[] } = useUserTasksStore();
  const theme = useTheme();

  const allNextTasks = userTasks.map(mapNextDates).sort(sortByNextDate);
  const dueThisWeekTasks = allNextTasks.filter(dueThisWeek);
  const overdueTasks = allNextTasks.filter(overdue);
  const dueInTheFutureTasks = allNextTasks.filter(dueInTheFuture);

  return (
    <View style={globalStyles.container}>
      <View style={{ ...globalStyles.sideBySide, paddingTop: 16, paddingBottom: 24 }}>
        <Text style={{ ...globalStyles.h2, letterSpacing: 3 }}>THIS WEEK</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ ...globalStyles.label, marginRight: 4 }}>Show All</Text>
          <Switch value={showMore} onValueChange={() => setShowMore(!showMore)} />
        </View>
      </View>

      {overdueTasks.length === 0 && dueThisWeekTasks.length === 0 && !showMore && (
        <Card style={{ ...globalStyles.card, padding: 16, alignItems: 'center' }}>
          <Text style={globalStyles.label}>No Tasks due</Text>
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
        <View key={task.id} style={{ paddingBottom: 16 }}>
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

      {showMore && (
        <View>
          <Text style={{ ...globalStyles.label, textAlign: 'center' }}>...</Text>
          {dueInTheFutureTasks.map((task: TaskType, i: number) => (
            <View key={task.id}>
              {(i === 0 ||
                !isSameDay(
                  parseISO(task?.nextDate as string),
                  parseISO(dueInTheFutureTasks[i === 0 ? 0 : i - 1].nextDate as string)
                )) && (
                <Text style={{ ...globalStyles.label, marginBottom: 6 }}>
                  {format(parseISO(task.nextDate as string), 'M/dd/yy')}
                </Text>
              )}
              <TaskCheckbox task={task} key={task.id} />
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
