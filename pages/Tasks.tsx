import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { FAB } from 'react-native-paper';

import { TasksStackParams } from './navigation';
import Task from '../components/Task';
import { useUserTasksStore } from '../hooks/useUserTasksStore';
import { colors, globalStyles } from '../styles';
import { TaskType } from '../types';

export default function Tasks({ navigation }: NativeStackScreenProps<TasksStackParams>) {
  // Hooks
  const { userTasks } = useUserTasksStore();

  // Methods
  const addTask = () => {
    // setUserTasks([...userTasks, task]);
  };

  return (
    <View style={globalStyles.pageWrapper}>
      <ScrollView alwaysBounceVertical fadingEdgeLength={20}>
        <SafeAreaView>
          <View style={globalStyles.container}>
            {userTasks.map((task: TaskType) => (
              <View key={task.id} style={{ ...styles.taskWrapper }}>
                <Task task={task} />
              </View>
            ))}
          </View>
        </SafeAreaView>
      </ScrollView>

      <FAB icon="plus" style={styles.fab} onPress={() => navigation.navigate('SearchTasks')} />
    </View>
  );
}

const styles = StyleSheet.create({
  taskWrapper: {},
  fab: {
    position: 'absolute',
    backgroundColor: colors.primaryLight,
    right: 30,
    bottom: 30,
  },
});
