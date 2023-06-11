import { StyleSheet, Text, View } from 'react-native';

export default function Tasks() {
  return (
    <View style={styles.container}>
      <Text>Tasks</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  items: {},
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 24,
    backgroundColor: 'white',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    height: 60,
    width: 60,
    backgroundColor: 'white',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});
