import type { TextStyle } from 'react-native';

type Typography = {
  h1: TextStyle;
  h2: TextStyle;
  body: TextStyle;
  bodyMedium: TextStyle;
  caption: TextStyle;
  button: TextStyle;
  label: TextStyle;
};

export const typography: Typography = {
  h1: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
  },
  h2: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
  },
  body: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '400',
  },
  bodyMedium: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
  button: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '600',
  },
  label: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '500',
  },
};
