import { useContext } from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { Text } from 'react-native-paper';

import { AppContext } from '../AppContext';
import TaskCheckbox from '../components/TaskCheckbox';
import { startOfCurrentWeek, endOfCurrentWeek } from '../helpers/dates';
import { globalStyles } from '../styles';
import { TaskType } from '../types';

export default function Home() {
  // Hooks
  const { store, actions } = useContext(AppContext);

  const image = {
    uri: 'https://www.bhg.com/thmb/3Vf9GXp3T-adDlU6tKpTbb-AEyE=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg',
  };

  return (
    <View style={styles.wrapper}>
      <ImageBackground source={image} resizeMode="cover">
        <View style={styles.banner}>
          <Text style={styles.banner_text}>Welcome Kyle!</Text>
        </View>
      </ImageBackground>
      <View style={styles.body}>
        <Text style={globalStyles.h1}>This Week's Tasks</Text>
        {store.userTasks.map((task: TaskType) => (
          <TaskCheckbox task={task} key={task.id} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    backgroundColor: '#F8F8F8',
  },
  body: {
    padding: 16,
  },
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
