import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Searchbar, Card } from 'react-native-paper';

import useStorage from '../hooks/useStorage';
import { TasksStackParams } from '../pages/navigation';
import { globalStyles } from '../styles';
import { TaskType } from '../types';

export default function SearchTasks({ navigation }: NativeStackScreenProps<TasksStackParams>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [getTasks] = useStorage('@tasks');

  // Hooks
  useEffect(() => {
    loadData();
  }, []);

  // Methods
  const loadData = async () => {
    setFilteredTasks(await getTasks([]));
  };

  const onChangeSearch = (query: string) => setSearchQuery(query);

  return (
    <View style={globalStyles.pageWrapper}>
      <View style={{ ...globalStyles.container }}>
        <Searchbar
          placeholder="e.g. clean gutters..."
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </View>

      <ScrollView alwaysBounceVertical fadingEdgeLength={200} style={styles.list}>
        <SafeAreaView>
          <View style={globalStyles.container}>
            <View>
              {filteredTasks
                ?.filter((task: TaskType) => task.name.includes(searchQuery))
                .map((task: TaskType, index) => (
                  <Card
                    key={index}
                    style={styles.task}
                    onPress={() => navigation.navigate('TaskDetails')}>
                    <Text style={globalStyles.h3}>{task.name}</Text>
                    <Text style={globalStyles.text}>{task.description}</Text>
                  </Card>
                ))}
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexGrow: 1,
  },
  task: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
});
