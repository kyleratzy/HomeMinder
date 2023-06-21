import { StyleSheet } from 'react-native';

import colors from './colors';

const globalStyles = StyleSheet.create({
  text: {
    color: colors.text,
    fontSize: 16,
  },
  label: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  h1: {
    fontSize: 32,
    fontWeight: '300',
    marginBottom: 8,
  },
  h2: {
    fontSize: 28,
    fontWeight: '300',
    marginBottom: 8,
  },
  h3: {
    fontSize: 24,
    fontWeight: '300',
    marginBottom: 4,
  },
  pageWrapper: {
    paddingVertical: 16,
    flexGrow: 1,
  },
  container: {
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  border: {
    borderWidth: 1,
    borderColor: colors.textLighter,
  },
  sideBySide: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default globalStyles;
