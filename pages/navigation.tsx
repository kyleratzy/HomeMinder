import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Button } from 'react-native-paper';

import Home from './Home';
import Profile from './Profile';
import SearchTasks from './SearchTasks';
import TaskDetails from './TaskDetails';
import Tasks from './Tasks';
import { colors } from '../styles';

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: '#fff',
      }}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

type TasksStackParams = {
  Tasks: undefined;
  SearchTasks: undefined;
  TaskDetails: undefined;
};

const TasksStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: '#fff',
      }}>
      <Stack.Group>
        <Stack.Screen name="Tasks" component={Tasks} options={{ title: 'All Tasks' }} />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen
          name="SearchTasks"
          component={SearchTasks}
          options={{ title: 'Search Tasks' }}
        />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen
          name="TaskDetails"
          component={TaskDetails}
          options={{
            title: 'Task Details',
            headerRight: () => (
              <Button icon="check" textColor="#fff">
                {' '}
              </Button>
            ), // Add a placeholder button without the `onPress` to avoid flicker
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: '#fff',
      }}>
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export { HomeStackNavigator, TasksStackNavigator, TasksStackParams, ProfileStackNavigator };
