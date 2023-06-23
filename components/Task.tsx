import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Badge, Card } from 'react-native-paper';

import { colors, globalStyles, categories } from '../styles';
import { TaskType } from '../types/TaskType';

type TaskProps = {
  task: TaskType;
};

export default function ({ task }: TaskProps) {
  const navigation = useNavigation();

  return (
    <Card
      style={styles.task}
      onPress={() => navigation.navigate('TasksMain', { screen: 'EditTask', params: { task } })}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <ImageBackground source={task?.image} resizeMode="cover">
          <View style={styles.task_image} />
        </ImageBackground>
        <View style={styles.task_content}>
          <Text style={globalStyles.h3}>{task.name}</Text>
          <Badge
            size={16}
            style={{
              ...styles.task_badge,
              backgroundColor: categories[task.category].color,
            }}>
            {task.category.toUpperCase()}
          </Badge>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.task_description}>
            {task.notes}
          </Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingVertical: 32,
    flexGrow: 1,
  },
  task: {
    marginBottom: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  task_image: {
    height: 80,
    width: 80,
    borderRadius: 16,
  },
  task_content: {
    flexGrow: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexBasis: 0,
  },
  task_badge: {
    paddingHorizontal: 6,
    letterSpacing: 2,
    alignSelf: 'flex-start',
  },
  task_description: {
    color: colors.textLighter,
  },
});
