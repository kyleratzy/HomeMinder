import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import { TASKS, USER_TASKS } from './fixtures';
import { HomeStackNavigator, TasksStackNavigator, ProfileStackNavigator } from './pages/navigation';
import colors from './styles/colors';

const myNavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    secondaryContainer: 'transparent',
  },
};
const Tab = createMaterialBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator initialRouteName="Home" activeColor={colors.primary} inactiveColor="#999">
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" color={color} size={30} />,
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={TasksStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="format-list-checkbox" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-cog" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  seedDB();

  return (
    <PaperProvider theme={myNavigationTheme}>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </PaperProvider>
  );
}

const seedDB = async () => {
  AsyncStorage.clear();
  try {
    await AsyncStorage.setItem('@tasks', JSON.stringify(TASKS));
    await AsyncStorage.setItem('@user_tasks', JSON.stringify(USER_TASKS));
  } catch (e) {
    // saving error
  }
};
