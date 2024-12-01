import 'react-native-gesture-handler';
import React from 'react';
import { Text, View, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import {
  Avatar,
  Paragraph,
  Card,
  Button,
  IconButton,
} from 'react-native-paper';
import * as Device from 'expo-device';
import AsyncStorage from '@react-native-community/async-storage';
import AppIntroSlider from 'react-native-app-intro-slider';

import { NavigationContainer } from '@react-navigation/native';
import { HomeStackNavigator } from './screens/StackNavigator';
import GLOBAL from './Global';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      walkthroughed: false,
    };
  }

  onDone = () => {
    AsyncStorage.setItem('walkthroughed', 'true');
    this.setState({
      walkthroughed: true,
    });
  };
  onSkip = () => {
    AsyncStorage.setItem('walkthroughed', 'true');
    this.setState({
      walkthroughed: true,
    });
  };

  componentDidMount() {
    this.getGlobalInfo();
  }

  async getGlobalInfo() {
    global.deviceid = Expo.Constants.deviceId;
    global.email = await AsyncStorage.getItem('email');
    if (global.email == null){
      global.email = ""
    }
    var walkthroughed = await AsyncStorage.getItem('walkthroughed');
    this.setState({
      walkthroughed: walkthroughed == 'true',
    });
  }

  RenderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: 100,
        }}>
        <Avatar.Icon
          style={styles.image}
          size={400}
          backgroundColor={item.backgroundColor}
          icon={item.icon}
        />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  render() {
    return (
      <>
        {this.state.walkthroughed == true ? (
          <NavigationContainer>
            <HomeStackNavigator />
          </NavigationContainer>
        ) : (
          <AppIntroSlider
            data={slides}
            renderItem={this.RenderItem}
            onDone={this.onDone}
            showSkipButton={true}
            onSkip={this.onSkip}
          />
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  text: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 0,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 0,
    paddingHorizontal: 30,
    fontWeight: 'bold',
  },
});

const slides = [
  {
    key: 's1',
    title: 'Personalized Learning',
    text: 'Practice problems recommended only for you and maximize learning outcome',
    image: require('./assets/logo.png'),
    icon: 'lead-pencil',
    backgroundColor: '#00b0ff',
  },
  {
    key: 's2',
    title: 'Score Higher',
    text: 'Heal your weak spots and strengthen what you already know',
    image: require('./assets/logo.png'),
    icon: 'chevron-triple-up',
    backgroundColor: '#7c4dff',
  },
  {
    key: 's3',
    title: 'Earn Rewards',
    text: 'Set yourself a goal to reach Diamond!',
    image: require('./assets/logo.png'),
    icon: 'medal',
    backgroundColor: '#b388ff',
  },
  {
    key: 's4',
    title: 'Welcome Aboard',
    text: 'Start your learning journey',
    image: require('./assets/logo.png'),
    icon: 'human-greeting',
    backgroundColor: '#304ffe',
  },
];
