import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import LoginScreen from '../screens/LoginScreen';
import SettingsScreen from '../screens/SettingsScreen';

const config = {
  ...Platform.select({
    web: { headerMode: 'screen' },
    default: {},
  }),
  initialRouteName: 'Login',
};

const HomeStack = createStackNavigator(
  {
    Login: LoginScreen,
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
};

HomeStack.path = '';

export default HomeStack;
