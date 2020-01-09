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
        <Text style={styles.inputLabel}>Alamat Email</Text>
        <View style={styles.inputContainer}>
          <Input style={styles.inputs}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid='transparent'
            onChangeText={(email) => this.setState({email})}/>
        </View>
        
        <Text style={styles.inputLabel}>Password</Text>
        <View style={styles.inputContainer}>
          <Input style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            onChangeText={(password) => this.setState({password})}/>
        </View>

        <Button
          buttonStyle={styles.loginButton}
          containerStyle={{ width: '100%' }}
          onPress={this.onLoginPress}
          title="Log in "
          titleStyle={{ fontSize: 16 }}
          icon={
            <Icon
              name="arrowright"
              size={15}
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
          title="Log in With Google"
          titleStyle={styles.buttonTitleSocial}
        />

        <Button
          buttonStyle={styles.buttonSocial}
          containerStyle={styles.buttonContainerSocial}
          onPress={this.onLoginPress}
          title="Log in With Facebook"
          titleStyle={styles.buttonTitleSocial}
        />

        <Text style={styles.privacyLink}>Privacy &amp; Security</Text>
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
    marginBottom:12,
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
    height: 45,
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
  privacyLink:{
    fontSize: 12,
    opacity:0.5,
    textDecorationLine: 'underline',
    width: '100%',
    textAlign: 'center',
    marginTop: 24
  }
});
