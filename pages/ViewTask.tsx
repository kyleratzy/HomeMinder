import { useEffect } from 'react';
import { StyleSheet, View, ImageBackground, ScrollView } from 'react-native';
import { Button, IconButton, Card, Badge, Divider, Text } from 'react-native-paper';

import { TasksTabScreenProps } from './navigation';
import { useUserTasksStore } from '../hooks/useUserTasksStore';
import { globalStyles, categories } from '../styles';
import { TaskType } from '../types';

export default function ViewTask({ route, navigation }: TasksTabScreenProps<'ViewTask'>) {
  const { task } = route.params;
  const { completeTask } = useUserTasksStore();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="check"
          iconColor="#fff"
          onPress={() => navigation.navigate('TasksMain', { screen: 'Tasks' })}
        />
      ),
    });
  }, [navigation]);

  // Methods
  const handleCompleteTask = async () => {
    try {
      completeTask(task as TaskType);
      navigation.navigate('HomeMain', { screen: 'HomeUpcoming' });
    } catch (e) {
      alert('error');
    }
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
                <Divider style={{ marginBottom: 16, marginHorizontal: -16 }} />

                <View style={{ ...globalStyles.sideBySide, marginBottom: 16 }}>
                  <Text style={globalStyles.label}>Every:</Text>
                  <View style={{ flexDirection: 'row', flexBasis: 160 }}>
                    <Text>{task.frequency}</Text>
                    <Text>{task.interval}</Text>
                  </View>
                </View>

                <View>
                  <Text>{task.notes}</Text>
                </View>
              </View>
            </Card>

            <Button mode="contained" onPress={handleCompleteTask}>
              Complete
            </Button>
            <Button mode="contained" onPress={() => navigation.navigate('EditTask', { task })}>
              Edit
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
