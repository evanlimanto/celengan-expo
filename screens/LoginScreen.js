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
import { Button, Icon, Input } from 'react-native-elements';

import getEnvVars from '../environment';
import { TouchableOpacity } from 'react-native-gesture-handler';
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
         <Input 
            label="Email"
            labelStyle={styles.inputLabel}
            containerStyle={styles.inputContainer}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            keyboardType="email-address"
            underlineColorAndroid='transparent'
            onChangeText={(email) => this.setState({email})}/>

          <Input 
            label="Password"
            labelStyle={styles.inputLabel}
            containerStyle={styles.inputContainer}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            onChangeText={(password) => this.setState({password})}/>

        <Button
          buttonStyle={styles.loginButton}
          containerStyle={{ width: '100%' }}
          onPress={this.onLoginPress}
          title="Log in "
          titleStyle={{ fontSize: 14, fontWeight:'bold' }}
          icon={
            <Icon
              name="arrowright"
              size={14}
              color="white"
              type="antdesign"
            />
          }
          iconRight
        />

        <TouchableOpacity style={styles.buttonLink} onPress={() => null}>
          <Text style={styles.forgotPassword}>Forgot your password?</Text>
        </TouchableOpacity>

        <View style={styles.separator} />

        <Button
          buttonStyle={styles.buttonSocial}
          containerStyle={styles.buttonContainerSocial}
          onPress={this.onLoginPress}
          title="Log In With Google"
          titleStyle={styles.buttonTitleSocial}
        />

        <Button
          buttonStyle={styles.buttonSocial}
          containerStyle={styles.buttonContainerSocial}
          onPress={this.onLoginPress}
          title="Log In With Facebook"
          titleStyle={styles.buttonTitleSocial}
        />

        <Button
          buttonStyle={styles.buttonPrivacy}
          titleStyle={styles.buttonTitlePrivacy}
          containerStyle={styles.buttonContainerPrivacy}
          title='Privacy &amp; Security'/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin:16,
  },
  inputContainer: {
    marginBottom:12,
    paddingLeft: 0,
    paddingRight: 0
  },
  inputContainerStyle:{
    height:40,
    borderColor: '#FFFFFF',
    flex:1,
    borderColor: '#CBCEDB',
    backgroundColor: '#E2E4EE',
    borderRadius:4,
    borderWidth: 1,
    width:'100%',
  },
  inputStyle:{
    fontSize: 14,
    paddingLeft: 12,
  },
  inputLabel:{
    fontSize:14,
    textAlign: 'left',
    marginBottom: 4,
    width: '100%',
    fontWeight: '400',
    color: '#07152F'
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  loginButton: {
    backgroundColor: '#08152F',
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    backgroundColor: "#00b5ec",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    width:'100%',
    borderRadius:4,
    backgroundColor: "#07152F",
  },
  buttonLink:{
    marginTop: 20,
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
  buttonTitleSocial: {
    color: "#07152F",
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonSocial: {
    backgroundColor: "#FFFFFF",
    borderColor: "#07152F",
  },
  buttonContainerSocial: {
    borderColor: "#07152F",
    borderWidth: '1px',
    width: '100%',
    height: 40,
    marginTop: 10,
  },
  forgotPassword:{
    textAlign: 'left',
    fontSize: 12,
  },
  separator: {
    marginVertical: 16,
    width: '100%',
    borderBottomColor: '#07152F',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  buttonContainerPrivacy:{
    width:'100%'
  },
  buttonPrivacy:{
    margin: 24,
    backgroundColor:'transparent'
  },
  buttonTitlePrivacy:{
    fontSize: 14,
    opacity:0.5,
    color:'#07152F',
    textDecorationLine: 'underline',
    textAlign: 'center',
  }
});
