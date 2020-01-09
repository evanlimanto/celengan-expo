import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Button } from 'react-native-elements';

import getEnvVars from '../environment';
const { apiUrl } = getEnvVars();

const institutions = [
  'bca',
  'bni',
  'bri',
  'cimb',
  'mandiri',
];

export default class InputCredentialsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Input style={styles.inputs}
            placeholder="Username"
            keyboardType="username"
            underlineColorAndroid='transparent'
            onChangeText={(username) => this.setState({username})}/>
        </View>
        
        <View style={styles.inputContainer}>
          <Input style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            onChangeText={(password) => this.setState({password})}/>
        </View>

        <Button title="Login" onPress={this.onLoginPress} buttonStyle={styles.button} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    width:250,
    height:45,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center'
  },
  inputs:{
    height:45,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },
});

