import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { FAB, Badge } from 'react-native-paper';

import Task from '../components/Task';
import useStorage from '../hooks/useStorage';
import { TasksStackParams } from '../pages/navigation';
import { colors, globalStyles } from '../styles';
import { TaskType } from '../types';

export default function Tasks({ navigation }: NativeStackScreenProps<TasksStackParams>) {
  const [userTasks, setUserTasks] = useState<TaskType[]>([]);
  const [getUserTasks, postUserTasks] = useStorage('@user_tasks');

  // Hooks
  useEffect(() => {
    loadData();
  }, []);

  // Methods
  const loadData = async () => {
    setUserTasks(await getUserTasks([]));
  };

  const addTask = () => {
    // setUserTasks([...userTasks, task]);
  };

  return (
    <View style={globalStyles.pageWrapper}>
      <ScrollView alwaysBounceVertical fadingEdgeLength={20}>
        <SafeAreaView>
          <View style={globalStyles.container}>
            {userTasks?.map((task: TaskType, index) => (
              <View key={index} style={{ ...styles.taskWrapper }}>
                {task.category !== userTasks[index - 1]?.category && (
                  <Badge>{task.category.toUpperCase()}</Badge>
                )}
                <Task>{task.name}</Task>
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
