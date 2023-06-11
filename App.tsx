import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Tasks from './pages/Tasks';

const myNavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    notification: 'rgba(255, 255, 255, 0.5)',
    secondaryContainer: 'transparent',
  },
};
const Tab = createMaterialBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="red"
      inactiveColor="#f0edf6"
      barStyle={{ backgroundColor: 'tomato' }}>
      <Tab.Screen
        name="Tasks"
        component={Tasks}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="format-list-checkbox" color={color} size={26} />
          ),
          tabBarColor: 'red',
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" color={color} size={26} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-cog" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider theme={myNavigationTheme}>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </PaperProvider>
  );
}
