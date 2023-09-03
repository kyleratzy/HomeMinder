import Ionicons from '@expo/vector-icons/Ionicons';
import { format, parseISO } from 'date-fns';
import { useEffect } from 'react';
import { StyleSheet, View, ImageBackground, ScrollView } from 'react-native';
import { Button, IconButton, Card, Badge, Text } from 'react-native-paper';

import { TasksTabScreenProps } from './navigation';
import { useUserTasksStore } from '../hooks/useUserTasksStore';
import { globalStyles, categories } from '../styles';
import { TaskType } from '../types';

export default function ViewTask({ route, navigation }: TasksTabScreenProps<'ViewTask'>) {
  const { task: taskParam } = route.params;
  const { completeTask, userTasks } = useUserTasksStore();
  const task: TaskType = userTasks.find((t: TaskType) => t.id === taskParam.id) as TaskType;

  // Hooks
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="pencil"
          iconColor="#fff"
          onPress={() => navigation.navigate('EditTask', { task })}
        />
      ),
    });
  }, [navigation]);

  // Methods
  const handleCompleteTask = () => {
    completeTask(task);
  };

  return (
    <ScrollView>
      <View style={globalStyles.pageWrapper}>
        {task && (
          <View style={{ ...globalStyles.container }}>
            <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
              <ImageBackground source={task.image} resizeMode="cover">
                <View style={styles.task_image} />
              </ImageBackground>
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 16 }}>
              <Text style={globalStyles.h1}>{task.name}</Text>
              <Badge
                size={22}
                style={{
                  backgroundColor: categories[task.category].color,
                  alignSelf: 'center',
                  paddingHorizontal: 8,
                }}>
                {task.category.toUpperCase()}
              </Badge>
            </View>

            <Card style={{ ...globalStyles.card, marginBottom: 32 }}>
              <View>
                <View style={{ ...globalStyles.sideBySide, marginBottom: 16 }}>
                  <Text style={{ ...globalStyles.label, flexBasis: 100 }}>Every:</Text>
                  <View style={{ ...globalStyles.sideBySide, justifyContent: 'flex-start' }}>
                    <Text>{task.frequency} </Text>
                    <Text>{task.interval}</Text>
                  </View>
                </View>

                <View style={{ ...globalStyles.sideBySide }}>
                  <Text style={{ ...globalStyles.label, flexBasis: 100 }}>Notes:</Text>
                  <View style={{ flexGrow: 1 }}>
                    <Text style={{ ...globalStyles.text }}>{task.notes || '[none]'}</Text>
                  </View>
                </View>
              </View>
            </Card>

            <Text style={{ ...globalStyles.h4 }}>History</Text>

            <Card style={{ ...globalStyles.card, marginBottom: 32 }}>
              {task.checkins.length === 0 && (
                <Text style={{ ...globalStyles.text }}>No completed checkins...</Text>
              )}
              {task.checkins?.map((checkin: string) => (
                <View
                  key={checkin}
                  style={{
                    ...globalStyles.sideBySide,
                    justifyContent: 'flex-start',
                    marginBottom: 6,
                  }}>
                  <Ionicons name="md-checkmark-circle" size={32} color="green" />
                  <Text style={{ ...globalStyles.label, marginLeft: 16 }}>
                    {format(parseISO(checkin), 'M/dd/yy')} @ {format(parseISO(checkin), 'hh:mm a')}
                  </Text>
                </View>
              ))}
            </Card>

            <Button mode="contained" onPress={handleCompleteTask}>
              Complete Task
            </Button>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  searchbar: {
    marginBottom: 16,
  },
  task_image: {
    height: 80,
    width: 80,
    borderRadius: 16,
    flexBasis: 80,
  },
});
