import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import useStorage from '../hooks/useStorage';
import { TasksStackParams } from '../pages/navigation';
import { globalStyles } from '../styles';

export default function TaskDetails({ navigation }: NativeStackScreenProps<TasksStackParams>) {
  const [task, setTask] = useState({
    name: 'Na',
    description: '',
  });

  // hooks
  useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerRight: () => (
        <Button icon="check" textColor="#fff" onPress={() => navigation.navigate('Tasks')}>
          {' '}
        </Button>
      ),
    });
  }, [navigation]);

  return (
    <View style={globalStyles.pageWrapper}>
      <View style={{ ...globalStyles.container }}>
        <TextInput
          placeholder="Task Name"
          onChangeText={(text) => setTask({ ...task, name: text })}
          value={task.name}
          style={styles.searchbar}
        />
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
