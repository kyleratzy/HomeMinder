import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { StyleSheet, View, ImageBackground, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import {
  DefaultTheme,
  Button,
  IconButton,
  Card,
  Badge,
  Divider,
  TextInput,
  Text,
} from 'react-native-paper';

import useStorage from '../hooks/useStorage';
import { useUserTasksStore } from '../hooks/useUserTasksStore';
import { TasksStackParams } from '../pages/navigation';
import { globalStyles, categories, FREQUENCIES } from '../styles';
import { TaskType } from '../types';

export default function TaskDetails({
  route,
  navigation,
}: NativeStackScreenProps<TasksStackParams, 'TaskDetails'>) {
  const { id } = route.params;
  const [task, setTask] = useState<TaskType>();
  const [showStartDate, setShowStartDate] = useState(false);

  const [getTasks] = useStorage('@tasks');

  // Hooks
  const { userTasks, addUserTask } = useUserTasksStore();

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
    const allTasks = await getTasks([]);
    const selectedTask: TaskType = allTasks.find((t: TaskType) => t.id === id);

    setTask({
      id: selectedTask.id,
      name: selectedTask.name,
      notes: '',
      image: selectedTask.image,
      category: selectedTask.category,
      startDate: new Date(),
      frequency: '1',
      interval: 'days',
    });
  };

  const onChangeDate = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    setShowStartDate(false);
    if (selectedDate) {
      setTask({ ...(task as TaskType), startDate: selectedDate });
    }
  };

  const handleSaveTask = async () => {
    try {
      addUserTask(task as TaskType);
      navigation.navigate('Tasks');
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
                    <TextInput
                      keyboardType="numeric"
                      value={task.frequency}
                      onChangeText={(value) => setTask({ ...task, frequency: value })}
                      style={{
                        marginRight: 8,
                      }}
                      underlineColor={DefaultTheme.colors.primary}
                    />
                    <Dropdown
                      style={{
                        flex: 1,
                        borderBottomColor: DefaultTheme.colors.primary,
                        borderBottomWidth: 0.5,
                        backgroundColor: DefaultTheme.colors.surfaceVariant,
                        paddingHorizontal: 8,
                      }}
                      data={FREQUENCIES}
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      value={task.interval}
                      onChange={({ value }) => setTask({ ...task, interval: value })}
                    />
                  </View>
                </View>

                <View style={{ ...globalStyles.sideBySide, marginBottom: 24 }}>
                  <Text style={globalStyles.label}>Start On:</Text>
                  <Text
                    style={{
                      paddingVertical: 16,
                      borderBottomColor: DefaultTheme.colors.primary,
                      borderBottomWidth: 0.5,
                      textAlign: 'center',
                      flexBasis: 100,
                      backgroundColor: DefaultTheme.colors.surfaceVariant,
                    }}
                    onPress={() => setShowStartDate(true)}>
                    {format(task.startDate, 'MM/dd/yyyy')}
                  </Text>

                  {showStartDate && (
                    <DateTimePicker value={task.startDate} mode="date" onChange={onChangeDate} />
                  )}
                </View>

                <View>
                  <TextInput
                    label="Notes"
                    value={task.notes || ''}
                    onChangeText={(value) => setTask({ ...task, notes: value })}
                    numberOfLines={5}
                    placeholder="..."
                    multiline
                    style={{
                      marginBottom: 16,
                    }}
                  />
                </View>
              </View>
            </Card>

            <Button mode="contained" onPress={handleSaveTask}>
              Save
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
