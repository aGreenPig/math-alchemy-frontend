import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './Home';
import Do from './Do';
import UserInfo from './UserInfo';
import SignIn from './SignIn';
import UserPage from './UserPage';
import LearnPage from './LearnPage';
import SimpleCalculator from '../calculator/driver';
import Analysis from './Analysis';

import TabNavigator from './TabNavigator';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: '#1976d2',
  },
  headerTintColor: 'white',
  headerBackTitle: 'Back',
};

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Math Alchemy" component={TabNavigator} />
      <Stack.Screen
        name="Do"
        options={({ route }) => ({ title: route.params.name })}
        component={Do}
      />
      <Stack.Screen name="Learning Analysis" component={Analysis} />
      <Stack.Screen name="Calculator" component={SimpleCalculator} />
      <Stack.Screen name="My Grade" component={UserInfo} />
      <Stack.Screen
        name="Sign In"
        options={() => ({ title: "Welcome" })}
        component={SignIn} />
    </Stack.Navigator>
  );
};

export { HomeStackNavigator };
