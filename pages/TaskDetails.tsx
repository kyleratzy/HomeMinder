import DateTimePicker from '@react-native-community/datetimepicker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import {
  DefaultTheme,
  Button,
  IconButton,
  Card,
  Badge,
  Switch,
  Divider,
  TextInput,
} from 'react-native-paper';

import useStorage from '../hooks/useStorage';
import { TasksStackParams } from '../pages/navigation';
import { globalStyles, categories, FREQUENCIES } from '../styles';
import { TaskType } from '../types';

export default function TaskDetails({
  route,
  navigation,
}: NativeStackScreenProps<TasksStackParams, 'TaskDetails'>) {
  const { id } = route.params;
  const [task, setTask] = useState<TaskType>();
  const [remindersOn, setRemindersOn] = useState(true);
  const [showStartDate, setShowStartDate] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [frequency, setFrequency] = useState('2');
  const [interval, setInterval] = useState('weeks');

  const [getTasks] = useStorage('@tasks');
  const [getUserTasks, postUserTasks] = useStorage('@user_tasks');

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
    const allTasks = await getTasks();
    const selectedTask: TaskType = allTasks.find((t: TaskType) => t.id === id);

    setTask({
      id: selectedTask.id,
      name: selectedTask.name,
      description: selectedTask.description,
      image: selectedTask.image,
      category: selectedTask.category,
    });
  };

  const onChangeDate = (event, selectedDate) => {
    setShowStartDate(false);
    setStartDate(selectedDate);
  };

  const handleSaveTask = async () => {
    const userTasks = await getUserTasks();
    try {
      const newUserTasks = [...userTasks, task];
      postUserTasks(newUserTasks);
      navigation.navigate('Tasks');
    } catch (e) {
      alert(userTasks);
    }
  };

  return (
    <View style={globalStyles.pageWrapper}>
      {task && (
        <View style={{ ...globalStyles.container }}>
          <View style={{ justifyContent: 'center', flexDirection: 'row', padding: 16 }}>
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
            <View style={globalStyles.sideBySide}>
              <Text style={{ ...globalStyles.h3, marginBottom: 0 }}>Reminders</Text>
              <Switch value={remindersOn} onValueChange={() => setRemindersOn(!remindersOn)} />
            </View>
            <Divider style={{ marginBottom: 16, marginHorizontal: -16 }} />

            <View style={{ ...globalStyles.sideBySide, marginBottom: 16 }}>
              <Text style={globalStyles.text}>Every:</Text>
              <View style={{ flexDirection: 'row', flexBasis: 160 }}>
                <TextInput
                  keyboardType="numeric"
                  value={frequency}
                  onChangeText={(value) => setFrequency(value)}
                  style={{
                    backgroundColor: '#fff',
                    marginRight: 8,
                  }}
                  underlineColor={DefaultTheme.colors.primary}
                />
                <Dropdown
                  style={{
                    flex: 1,
                    borderBottomColor: DefaultTheme.colors.primary,
                    borderBottomWidth: 0.5,
                  }}
                  data={FREQUENCIES}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  searchPlaceholder="Search..."
                  value={interval}
                  onChange={(item) => {
                    setFrequency(item.value);
                  }}
                />
              </View>
            </View>

            <View style={{ ...globalStyles.sideBySide, marginBottom: 16 }}>
              <Text style={globalStyles.text}>Start On:</Text>
              <Text
                style={{
                  paddingVertical: 16,
                  borderBottomColor: DefaultTheme.colors.primary,
                  borderBottomWidth: 0.5,
                  textAlign: 'center',
                  flexBasis: 100,
                }}
                onPress={() => setShowStartDate(true)}>
                {format(startDate, 'MM/dd/yyyy')}
              </Text>

              {showStartDate && (
                <DateTimePicker value={startDate} mode="date" onChange={onChangeDate} />
              )}
            </View>
          </Card>

          <Button mode="contained" onPress={handleSaveTask}>
            Save
          </Button>
        </View>
      )}
    </View>
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
