import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { format, parseISO } from 'date-fns';
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

import { TasksTabScreenProps } from './navigation';
import { useUserTasksStore } from '../hooks/useUserTasksStore';
import { globalStyles, categories, FREQUENCIES } from '../styles';
import { TaskType } from '../types';

export default function EditTask({ route, navigation }: TasksTabScreenProps<'EditTask'>) {
  const taskInit = route.params.task;
  const [task, setTask] = useState<TaskType>({ ...taskInit });
  const [showStartDate, setShowStartDate] = useState(false);
  const { addUserTask, deleteUserTask } = useUserTasksStore();

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
  const onChangeDate = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    setShowStartDate(false);
    if (selectedDate) {
      setTask({ ...(task as TaskType), startDate: selectedDate.toISOString() });
    }
  };

  // TODO: Validation for frequency change
  const handleSetInterval = (value: string) => {
    if (value === 'days' && Number(task?.frequency) < 7) {
      setTask({ ...(task as TaskType), interval: value, frequency: '7' });
    } else {
      setTask({ ...(task as TaskType), interval: value });
    }
  };

  const handleSaveTask = async () => {
    try {
      addUserTask(task as TaskType);
      navigation.navigate('TasksMain', { screen: 'Tasks' });
    } catch (e) {
      alert('error');
    }
  };

  const handleDeleteTask = async () => {
    try {
      deleteUserTask(task as TaskType);
      navigation.navigate('TasksMain', { screen: 'Tasks' });
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
                  <View style={{ flexDirection: 'row', flexBasis: 170 }}>
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
                      onChange={({ value }) => handleSetInterval(value)}
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
                    {format(parseISO(task.startDate), 'MM/dd/yyyy')}
                  </Text>

                  {showStartDate && (
                    <DateTimePicker
                      value={parseISO(task.startDate)}
                      mode="date"
                      onChange={onChangeDate}
                    />
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

            <Button mode="contained" onPress={handleSaveTask} style={{ marginBottom: 20 }}>
              Save
            </Button>
            <Button mode="outlined" onPress={handleDeleteTask}>
              Delete
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
