import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';

import useStorage from '../hooks/useStorage';
import { TasksStackParams } from '../pages/navigation';
import { globalStyles } from '../styles';

export default function TaskDetails({
  route,
  navigation,
}: NativeStackScreenProps<TasksStackParams, 'TaskDetails'>) {
  const { id } = route.params;
  const [task, setTask] = useState({
    name: 'Na',
    description: '',
  });

  const [getTasks] = useStorage('@tasks');

  // Hooks
  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton icon="check" iconColor="#fff" onPress={() => navigation.navigate('Tasks')} />
      ),
    });
  }, [navigation]);

  // Methods
  const loadData = async () => {
    const task = await getTasks();

    setTask({
      name: task.name,
      description: task.description,
    });
  };

  return (
    <View style={globalStyles.pageWrapper}>
      <View style={{ ...globalStyles.container }}>
        <TextInput
          placeholder="Task Name"
          onChangeText={(text) => setTask({ ...task, name: text })}
          value={task.name}
          style={styles.searchbar}
        />
        <Text>{id}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchbar: {
    marginBottom: 16,
  },
  task: {
    padding: 16,
    marginBottom: 16,
  },
});
