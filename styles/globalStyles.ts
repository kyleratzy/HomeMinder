import { StyleSheet } from 'react-native';

import colors from './colors';

const globalStyles = StyleSheet.create({
  text: {
    color: colors.text,
    fontSize: 16,
  },
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  h2: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  h3: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tag: {
    color: '#666',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 3,
    marginBottom: 4,
  },
  pageWrapper: {
    paddingTop: 16,
    flexGrow: 1,
  },
  container: {
    paddingHorizontal: 16,
  },
});

export default globalStyles;
