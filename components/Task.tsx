import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-paper';

interface Props {
  children: any;
}

const Task = ({ children }: Props) => {
  return (
    <Card style={styles.card}>
      <View style={styles.container}>
        <View style={styles.checkbox} />
        <Text style={styles.text}>{children}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginBottom: 10,
    marginHorizontal: 10,
  },
  container: {
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#55BCF6',
    opacity: 0.5,
  },
  text: {
    fontSize: 20,
    marginLeft: 10,
  },
});

export default Task;
