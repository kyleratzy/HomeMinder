import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  children: any;
}

const Task = ({ children }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.checkbox} />
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
