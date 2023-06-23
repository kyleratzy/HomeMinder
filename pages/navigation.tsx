import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CompositeScreenProps } from '@react-navigation/core';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import { IconButton } from 'react-native-paper';

import EditTask from './EditTask';
import Home from './Home';
import Profile from './Profile';
import SearchTasks from './SearchTasks';
import Tasks from './Tasks';
import ViewTask from './ViewTask';
import { colors } from '../styles';
import { TaskType } from '../types/TaskType';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParams {}
  }
}

export type HomeStackParams = {
  Home: undefined;
};

export type TasksStackParams = {
  Tasks: undefined;
  SearchTasks: undefined;
  EditTask: { task: TaskType };
  ViewTask: { task: TaskType };
};

export type ProfileStackParams = {
  Profile: undefined;
};

export type RootStackParams = {
  HomeMain: NavigatorScreenParams<HomeStackParams>;
  TasksMain: NavigatorScreenParams<TasksStackParams>;
  ProfileMain: NavigatorScreenParams<ProfileStackParams>;
};

export type RootStackScreenProps<T extends keyof RootStackParams> = StackScreenProps<
  RootStackParams,
  T
>;

export type HomeTabScreenProps<T extends keyof HomeStackParams> = CompositeScreenProps<
  StackScreenProps<HomeStackParams, T>,
  RootStackScreenProps<keyof RootStackParams>
>;

export type TasksTabScreenProps<T extends keyof TasksStackParams> = CompositeScreenProps<
  StackScreenProps<TasksStackParams, T>,
  RootStackScreenProps<keyof RootStackParams>
>;

export type ProfileTabScreenProps<T extends keyof ProfileStackParams> = CompositeScreenProps<
  StackScreenProps<ProfileStackParams, T>,
  RootStackScreenProps<keyof RootStackParams>
>;

const HomeStack = createStackNavigator<HomeStackParams>();
const TasksStack = createStackNavigator<TasksStackParams>();
const ProfileStack = createStackNavigator<ProfileStackParams>();
const Tab = createMaterialBottomTabNavigator<RootStackParams>();

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
      initialRouteName="Tasks"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: '#fff',
      }}>
      <TasksStack.Screen name="Tasks" component={Tasks} options={{ title: 'All Tasks' }} />
      <TasksStack.Screen
        name="SearchTasks"
        component={SearchTasks}
        options={{ title: 'Search Tasks' }}
      />
      <TasksStack.Screen
        name="EditTask"
        component={EditTask}
        options={{
          title: 'Task Details',
          headerRight: () => <IconButton icon="check" iconColor="#fff" />, // Add a placeholder button without the `onPress` to avoid flicker
        }}
      />
      <TasksStack.Screen
        name="ViewTask"
        component={ViewTask}
        options={{
          title: 'View Task',
          headerRight: () => <IconButton icon="check" iconColor="#fff" />, // Add a placeholder button without the `onPress` to avoid flicker
        }}
      />
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

export function Tabs() {
  return (
    <Tab.Navigator initialRouteName="HomeMain" activeColor={colors.primary} inactiveColor="#999">
      <Tab.Screen
        name="HomeMain"
        component={HomeStackNavigator}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" color={color} size={30} />,
        }}
      />
      <Tab.Screen
        name="TasksMain"
        component={TasksStackNavigator}
        options={{
          title: 'Tasks',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="format-list-checkbox" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileMain"
        component={ProfileStackNavigator}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-cog" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
