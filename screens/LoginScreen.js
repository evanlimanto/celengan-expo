import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
} from 'react-native';

import getEnvVars from '../environment';
import { TouchableOpacity } from 'react-native-gesture-handler';
const { apiUrl } = getEnvVars();

export default class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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
    await AsyncStorage.setItem('authorization_token', `${email}:${password}`)
    this.props.navigation.navigate('Home');
  }

  onRegisterPress() {
    this.props.navigation.navigate('Register');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.inputLabel}>Alamat Email</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid='transparent'
            onChangeText={(email) => this.setState({email})}/>
        </View>
        
        <Text style={styles.inputLabel}>Password</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            onChangeText={(password) => this.setState({password})}/>
        </View>

        <TouchableHighlight style={styles.buttonContainer} onPress={this.onLoginPress}>
          <Text style={styles.loginText}>Login -></Text>
        </TouchableHighlight>

        <TouchableOpacity style={styles.buttonLink} onPress={() => null}>
            <Text style={styles.forgotPassword}>Forgot your password?</Text>
        </TouchableOpacity>

        <View style={styles.separator} />

        <TouchableHighlight style={[styles.buttonContainer, styles.buttonOutline]} onPress={this.onLoginPress}>
          <Text style={styles.loginSocial}>Log in With Google</Text>
        </TouchableHighlight>

        <TouchableHighlight style={[styles.buttonContainer, styles.buttonOutline]} onPress={this.onLoginPress}>
          <Text style={styles.loginSocial}>Log in With Facebook</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={this.onRegisterPress}>
          <Text style={styles.loginText}>Register</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    margin:16,
  },
  inputContainer: {
      borderColor: '#CBCEDB',
      backgroundColor: '#E2E4EE',
      borderRadius:4,
      borderWidth: 1,
      width:'100%',
      height:45,
      marginBottom:12,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputLabel:{
      fontSize:14,
      textAlign: 'left',
      marginBottom: 4,
      width: '100%',
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:12,
    width:'100%',
    borderRadius:4,
    backgroundColor: "#07152F",
  },
  buttonLink:{
    paddingTop:4,
  },
  buttonOutline:{
    borderColor: "#07152F",
    backgroundColor: '#ffffff',
    borderRadius:4,
    borderWidth: 1,
  },  
  loginText: {
    color: 'white',
    fontWeight: 'bold'
  },
  loginSocial: {
    color:  "#07152F",
    fontWeight: 'bold'
  },
  forgotPassword:{
    textAlign: 'left',
  },
  separator: {
    marginVertical: 16,
    width: '100%',
    borderBottomColor: '#07152F',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }
});
