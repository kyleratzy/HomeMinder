import { format, isSameDay, parseISO } from 'date-fns';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import TaskCheckbox from '../components/TaskCheckbox';
import { upcoming, overdue, sortByNextDate, mapNextDates } from '../helpers/dates';
import { useUserTasksStore } from '../hooks/useUserTasksStore';
import { globalStyles } from '../styles';
import { TaskType } from '../types';

export default function Home() {
  // Hooks
  const { userTasks } = useUserTasksStore();
  const theme = useTheme();

  const image = {
    uri: 'https://www.bhg.com/thmb/3Vf9GXp3T-adDlU6tKpTbb-AEyE=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg',
  };

  const allNextTasks = userTasks.map(mapNextDates).sort(sortByNextDate);
  const overdueTasks = allNextTasks.filter(overdue);
  const upcomingTasks = allNextTasks.filter(upcoming);

  return (
    <View style={styles.wrapper}>
      <ImageBackground source={image} resizeMode="cover">
        <View style={styles.banner}>
          <Text style={styles.banner_text}>Welcome Kyle!</Text>
        </View>
      </ImageBackground>
      <View style={styles.body}>
        <Text style={globalStyles.h1}>Upcoming Tasks</Text>
        {overdueTasks.length > 0 && (
          <Text style={{ ...globalStyles.label, color: theme.colors.error, marginBottom: 6 }}>
            Overdue
          </Text>
        )}
        {overdueTasks.map((task: TaskType, i: number) => (
          <TaskCheckbox task={task} key={task.id} />
        ))}
        {upcomingTasks.map((task: TaskType, i: number) => (
          <View key={task.id}>
            {(i === 0 ||
              !isSameDay(
                parseISO(task?.nextDate as string),
                parseISO(upcomingTasks[i === 0 ? 0 : i - 1].nextDate as string)
              )) && (
              <Text style={{ ...globalStyles.label, marginBottom: 6 }}>
                {format(parseISO(task.nextDate as string), 'M/dd/yy')}
              </Text>
            )}
            <TaskCheckbox task={task} key={task.id} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    backgroundColor: '#F8F8F8',
  },
  body: {
    padding: 16,
  },
  banner: {
    height: 200,
    justifyContent: 'flex-end',
  },
  banner_text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
