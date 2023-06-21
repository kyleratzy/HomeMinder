import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Checkbox } from 'react-native-paper';

import { globalStyles } from '../styles';
import { TaskType } from '../types/TaskType';

type TaskProps = {
  task: TaskType;
};

export default function ({ task }: TaskProps) {
  const [checked, setChecked] = useState(false);

  return (
    <Card style={styles.task}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <View style={{ flexBasis: 40 }}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => setChecked(!checked)}
          />
        </View>
        <Text
          style={{
            ...globalStyles.h3,
            flexGrow: 1,
            textDecorationLine: checked ? 'line-through' : 'none',
          }}>
          {task.name}
        </Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  task: {
    marginBottom: 16,
    padding: 8,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
});
