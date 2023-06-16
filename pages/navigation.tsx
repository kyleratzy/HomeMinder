import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { IconButton } from 'react-native-paper';

import Home from './Home';
import Profile from './Profile';
import SearchTasks from './SearchTasks';
import TaskDetails from './TaskDetails';
import Tasks from './Tasks';
import { colors } from '../styles';

type TasksStackParams = {
  Tasks: undefined;
  SearchTasks: undefined;
  TaskDetails: { id?: number };
};

const HomeStack = createStackNavigator();
const TasksStack = createStackNavigator<TasksStackParams>();
const ProfileStack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: '#fff',
      }}>
      <HomeStack.Screen name="Home" component={Home} />
    </HomeStack.Navigator>
  );
};

const TasksStackNavigator = () => {
  return (
    <TasksStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: '#fff',
      }}>
      <TasksStack.Group>
        <TasksStack.Screen name="Tasks" component={Tasks} options={{ title: 'All Tasks' }} />
      </TasksStack.Group>
      <TasksStack.Group>
        <TasksStack.Screen
          name="SearchTasks"
          component={SearchTasks}
          options={{ title: 'Search Tasks' }}
        />
      </TasksStack.Group>
      <TasksStack.Group>
        <TasksStack.Screen
          name="TaskDetails"
          component={TaskDetails}
          options={{
            title: 'Task Details',
            headerRight: () => <IconButton icon="check" iconColor="#fff" />, // Add a placeholder button without the `onPress` to avoid flicker
          }}
        />
      </TasksStack.Group>
    </TasksStack.Navigator>
  );
};

const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: '#fff',
      }}>
      <ProfileStack.Screen name="Profile" component={Profile} />
    </ProfileStack.Navigator>
  );
};

export { HomeStackNavigator, TasksStackNavigator, TasksStackParams, ProfileStackNavigator };
