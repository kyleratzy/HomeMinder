import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';

import Task from '../components/Task';
import useStorage from '../hooks/useStorage';
import { TasksStackParams } from '../pages/navigation';
import { colors, globalStyles } from '../styles';
import { TaskType } from '../types';

export default function SearchTasks({
  navigation,
  route,
}: NativeStackScreenProps<TasksStackParams>) {
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

  const filter = (task: TaskType) => {
    return (
      task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <View style={{ ...globalStyles.pageWrapper, paddingTop: 32 }}>
      <View style={{ ...globalStyles.container }}>
        <Searchbar
          placeholder="e.g. clean gutters..."
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={{ backgroundColor: '#fff' }}
          elevation={2}
        />
      </View>

      <ScrollView alwaysBounceVertical fadingEdgeLength={200} style={styles.list}>
        <SafeAreaView>
          <View style={globalStyles.container}>
            <View>
              {filteredTasks?.filter(filter).map((task: TaskType) => (
                <Task task={task} key={task.id} />
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
    paddingVertical: 32,
    flexGrow: 1,
  },
  task: {
    marginBottom: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  task_image: {
    height: 80,
    width: 80,
    borderRadius: 16,
  },
  task_content: {
    flexGrow: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexBasis: 0,
  },
  task_badge: {
    paddingHorizontal: 6,
    letterSpacing: 2,
    alignSelf: 'flex-start',
  },
  task_description: {
    color: colors.textLighter,
  },
});