import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CompositeScreenProps } from '@react-navigation/core';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import { IconButton } from 'react-native-paper';

import EditTask from './EditTask';
import HomeCompleted from './HomeCompleted';
import HomeUpcoming from './HomeUpcoming';
import Profile from './Profile';
import SearchTasks from './SearchTasks';
import Tasks from './Tasks';
import ViewTask from './ViewTask';
import { overdue, mapNextDates } from '../helpers/dates';
import { useUserTasksStore } from '../hooks/useUserTasksStore';
import { colors } from '../styles';
import { TaskType } from '../types/TaskType';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParams {}
  }
}

export type HomeStackParams = {
  HomeUpcoming: undefined;
  HomeCompleted: undefined;
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

const image = {
  uri: 'https://www.bhg.com/thmb/3Vf9GXp3T-adDlU6tKpTbb-AEyE=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg',
};

const HomeStack = createMaterialTopTabNavigator<HomeStackParams>();
const TasksStack = createStackNavigator<TasksStackParams>();
const ProfileStack = createStackNavigator<ProfileStackParams>();
const Tab = createMaterialBottomTabNavigator<RootStackParams>();

const HomeStackNavigator = () => {
  const { userTasks }: { userTasks: TaskType[] } = useUserTasksStore();
  const overdueTasks = userTasks.map(mapNextDates).filter(overdue);

  return (
    <>
      <View style={{ paddingTop: 40, backgroundColor: 'tomato' }}>
        <ImageBackground source={image} resizeMode="cover">
          <View style={styles.banner}>
            {/* <Text style={styles.banner_text}>Welcome Kyle!</Text> */}
          </View>
        </ImageBackground>
      </View>
      <HomeStack.Navigator initialRouteName="HomeUpcoming">
        <HomeStack.Screen
          name="HomeUpcoming"
          component={HomeUpcoming}
          options={{
            title: 'ToDo',
            tabBarBadge: () =>
              overdueTasks.length ? (
                <Text
                  style={{
                    backgroundColor: 'tomato',
                    padding: 2,
                    borderRadius: 20,
                    minWidth: 23,
                    textAlign: 'center',
                    color: '#fff',
                    top: 4,
                  }}>
                  {overdueTasks.length}
                </Text>
              ) : null,
          }}
        />
        <HomeStack.Screen
          name="HomeCompleted"
          component={HomeCompleted}
          options={{ title: 'Completed' }}
        />
      </HomeStack.Navigator>
    </>
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
          title: 'Edit Task',
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
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('HomeMain', { screen: 'Home' });
          },
        })}
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
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('TasksMain', { screen: 'Tasks' });
          },
        })}
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
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('ProfileMain', { screen: 'Profile' });
          },
        })}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  banner: {
    height: 200,
    justifyContent: 'flex-end',
  },
  banner_text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
