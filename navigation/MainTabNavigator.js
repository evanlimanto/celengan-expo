import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import SelectInstitutionScreen from '../screens/SelectInstitutionScreen';
import HomeScreen from '../screens/HomeScreen';
import InputCredentialsScreen from '../screens/InputCredentialsScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const config = {
  ...Platform.select({
    web: { headerMode: 'screen' },
    default: {},
  }),
  initialRouteName: 'InputCredentials',
};

const HomeStack = createStackNavigator(
  {
    SelectInstitution: SelectInstitutionScreen,
    InputCredentials: InputCredentialsScreen,
    Login: LoginScreen,
    Home: HomeScreen,
    Register: RegisterScreen,
  },
  config
);

HomeStack.navigationOptions = {
};

HomeStack.path = '';

export default HomeStack;
