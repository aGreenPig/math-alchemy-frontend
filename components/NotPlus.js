import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import {
  Avatar,
  Paragraph,
  Card,
  Button,
  IconButton,
  useTheme,
  Title,
} from 'react-native-paper';

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '46%',
    marginTop: 20,
  },
  text: {
    textAlign: 'center',
  },
  container: {
    padding: 16,
    flex: 1,
  },
});

export const NotPlus = ({ message, onPress = () => {} }) => (
  <View style={styles.container}>
    <Title style={styles.text}>{message}</Title>
    <Text></Text>
    <Paragraph style={styles.text}>
      Already a member? Sign in!
    </Paragraph>
    <Paragraph style={styles.text}>
      Not yet? Visit Match Alchemy website and register!
    </Paragraph>
  </View>
);



