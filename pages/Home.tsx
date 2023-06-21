import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { Text } from 'react-native-paper';

import TaskCheckbox from '../components/TaskCheckbox';
import useStorage from '../hooks/useStorage';
import { globalStyles } from '../styles';

export default function Home() {
  const [userTasks, setUserTasks] = useState([]);
  const [getUserTasks, postUserTasks] = useStorage('@user_tasks');

  // Hooks
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  // Methods
  const loadData = async () => {
    setUserTasks(await getUserTasks([]));
  };

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
        {userTasks.map((task) => (
          <TaskCheckbox task={task} />
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
