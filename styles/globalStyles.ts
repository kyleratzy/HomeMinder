import { StyleSheet } from 'react-native';

import colors from './colors';

const globalStyles = StyleSheet.create({
  text: {
    color: colors.text,
    fontSize: 16,
  },
  label: {
    color: colors.textLighter,
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  h1: {
    fontSize: 32,
    fontWeight: '300',
    marginBottom: 8,
    color: colors.textLighter,
  },
  h2: {
    fontSize: 28,
    fontWeight: '300',
    marginBottom: 8,
    color: colors.textLighter,
  },
  h3: {
    fontSize: 24,
    fontWeight: '300',
    marginBottom: 4,
    color: colors.textLighter,
  },
  h4: {
    fontSize: 20,
    fontWeight: '300',
    marginBottom: 4,
    color: colors.textLighter,
  },
  h5: {
    fontSize: 18,
    fontWeight: '300',
    marginBottom: 4,
    color: colors.textLighter,
  },
  pageWrapper: {
    paddingVertical: 16,
    flexGrow: 1,
  },
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    // paddingHorizontal: 16,
  },
  border: {
    borderWidth: 1,
    borderColor: colors.textLighter,
  },
  sideBySide: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default globalStyles;
