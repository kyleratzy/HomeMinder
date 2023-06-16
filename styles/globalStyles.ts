import { StyleSheet } from 'react-native';

import colors from './colors';

const globalStyles = StyleSheet.create({
  text: {
    color: colors.text,
    fontSize: 16,
  },
  h1: {
    fontSize: 26,
    fontWeight: '300',
    marginBottom: 8,
  },
  h2: {
    fontSize: 20,
    fontWeight: '300',
    marginBottom: 8,
  },
  h3: {
    fontSize: 18,
    fontWeight: '400',
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
