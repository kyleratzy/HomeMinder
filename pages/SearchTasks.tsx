import { RouteProp } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Badge, Searchbar, Card } from 'react-native-paper';

import useStorage from '../hooks/useStorage';
import { TasksStackParams } from '../pages/navigation';
import { colors, globalStyles, categories } from '../styles';
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
              {filteredTasks?.filter(filter).map((task: TaskType, index) => (
                <Card
                  key={index}
                  style={styles.task}
                  onPress={() => navigation.navigate('TaskDetails', { id: task.id })}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}>
                    <ImageBackground source={task?.image} resizeMode="cover">
                      <View style={styles.task_image} />
                    </ImageBackground>
                    <View style={styles.task_content}>
                      <Text style={globalStyles.h3}>{task.name}</Text>
                      <Badge
                        size={16}
                        style={{
                          ...styles.task_badge,
                          backgroundColor: categories[task.category].color,
                        }}>
                        {task.category.toUpperCase()}
                      </Badge>
                      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.task_description}>
                        {task.description}
                      </Text>
                    </View>
                  </View>
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
