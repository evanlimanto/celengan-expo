import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Button, Icon, Input, Image} from 'react-native-elements';

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
      security: ''
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.imageStyle}
            resizeMode="contain"
            source={require(`../assets/images/bca.png`)}
            />
        </View>
        <Input 
            label="User ID"
            labelStyle={styles.inputLabel}
            containerStyle={styles.inputContainer}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            onChangeText={(username) => this.setState({username})}/>

        <Input 
            label="Password"
            labelStyle={styles.inputLabel}
            containerStyle={styles.inputContainer}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            onChangeText={(password) => this.setState({password})}/>

        <View style={styles.captchaArea}>
            
        </View>

        <Input 
            label="Security Code"
            labelStyle={styles.inputLabel}
            containerStyle={styles.inputContainer}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            underlineColorAndroid='transparent'
            onChangeText={(security) => this.setState({security})}/>

        <Button
          buttonStyle={styles.loginButton}
          containerStyle={styles.buttonContainerSocial}
          onPress={this.onLoginPress}
          title="Continue "
          titleStyle={{ fontSize: 14, fontWeight:'bold', color:'#07152F' }}
          icon={
            <Icon
              name="arrowright"
              size={14}
              color="#07152F"
              type="antdesign"
            />
          }
          iconRight
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding:16,
    backgroundImage:'linear-gradient(139deg, #0094ff, #206fff)',
  },
  inputContainer: {
    marginBottom:12,
    paddingLeft: 0,
    paddingRight: 0
  },
  inputContainerStyle:{
    height:40,
    flex:1,
    borderColor: '#FFFFFF',
    backgroundColor: 'rgba(255,255,255,0.25)',
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
    color: '#fff'
  },
  loginButton: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    height: 40,
  },
  buttonContainerSocial: {
    borderColor: "#fff",
    backgroundColor: '#fff',
    borderWidth: '1px',
    width: '100%',
    height: 40,
    marginTop: 10,
  },
  captchaArea:{
    width: '100%',
    height:56,
    backgroundColor:'white',
    marginBottom:12
  },
  imageStyle: {
    height:56,
  },
  imageContainer:{
    minWidth: 160,
    height:56,
    backgroundColor: 'white',
    borderRadius:4,
    marginBottom:16
  }
});

