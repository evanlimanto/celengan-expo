import React, { Component } from 'react';
import {
  Alert,
  AsyncStorage,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { Button, Input } from 'react-native-elements';

import getEnvVars from '../environment';
const { apiUrl } = getEnvVars();

export default class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: '',
    };
    this.onLoginPress = this.onLoginPress.bind(this);
    this.onRegisterPress = this.onRegisterPress.bind(this);
  }

  async onLoginPress() {
    const { email, password } = this.state;
    const rawResponse = await fetch(`${apiUrl}/user/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const status = rawResponse.status;
    if (status !== 200) {
      this.setState({ errorMessage: 'Failed to login!' });
      return;
    }
    await AsyncStorage.setItem('authorization_token', `${email}:${password}`)
    this.setState({ errorMessage: '' });
    this.props.navigation.navigate('Home');
  }

  onRegisterPress() {
    this.props.navigation.navigate('Register');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Input style={styles.inputs}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid='transparent'
            onChangeText={(email) => this.setState({email})}/>
        </View>
        
        <View style={styles.inputContainer}>
          <Input style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            onChangeText={(password) => this.setState({password})}/>
        </View>

        <Button title="Login" onPress={this.onLoginPress} buttonStyle={styles.button} />
        <Button title="Register" onPress={this.onRegisterPress} buttonStyle={styles.button} />

        <Text>{this.state.errorMessage}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  button: {
    backgroundColor: "#00b5ec",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width:250,
    margin: 10,
  },
});
