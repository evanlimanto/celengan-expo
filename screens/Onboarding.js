import React, { Component } from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Swiper from 'react-native-swiper'
import { Button, Icon, Input } from 'react-native-elements';

import getEnvVars from '../environment';
import { TouchableHighlight } from 'react-native-gesture-handler';
const { apiUrl } = getEnvVars();
  
  export default class SwiperComponent extends Component {
    constructor(props){
        super(props)
        this.onSkipPress = this.onSkipPress.bind(this)
    }

    onSkipPress(){
        console.log('Skip')
    }

    render() {
      return (
        <View style={styles.container}>
            <Swiper
            activeDotColor={'white'}
            dotStyle={styles.dotStyle}
            dotColor={'transparent'}
            showsButtons={true}
            scrollEnabled={false}
            paginationStyle={styles.paginationStyle}
            nextButton={<TouchableHighlight style={styles.nextButton}><Text>Next</Text></TouchableHighlight>}
            prevButton={<Text></Text>}
            loop={false}
            buttonWrapperStyle={styles.buttonWrapperStyle}
            >
            <View style={styles.slides}>
                <Image
                style={styles.slideImage}
                resizeMode={'contain'}
                source={require('../assets/images/MultipleAcct.png')}
                />
                <Text style={styles.text}>Connect Multiple Bank Accounts</Text>
            </View>
            <View style={styles.slides}>
                <Image
                style={styles.slideImage}
                resizeMode={'contain'}
                source={require('../assets/images/AllTransactions.png')}
                />
                <Text style={styles.text}>See All Your Transactions</Text>
            </View>
            <View style={styles.slides}>
                <Image
                style={styles.slideImage}
                resizeMode={'contain'}
                source={require('../assets/images/Security.png')}
                />
                <Text style={styles.text}>Secured by SSL &amp; 256-bit Encryption</Text>
            </View>
            <View style={styles.slides}>
                <Image
                style={styles.slideImage}
                resizeMode={'contain'}
                source={require('../assets/images/Support.png')}
                />
                <Text style={styles.text}>In-app Support</Text>
            </View>
            </Swiper>
            <Button
                buttonStyle={styles.buttonPrivacy}
                titleStyle={styles.buttonTitlePrivacy}
                containerStyle={styles.buttonContainerPrivacy}
                onPress={this.onSkipPress}
                title='Skip'/>
        </View>
      )
    }
  }


const styles = StyleSheet.create({
    container: {
        backgroundImage:'linear-gradient(139deg, #0094ff, #206fff)',
        height:'100%'
    },
    slides: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding:24
    },
    text: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign:'center'
    },
    slideImage:{
        width:'100%',
        height:'70%',
    },
    paginationStyle:{
        bottom:64,
    },
    dotStyle:{
        borderColor:'white',
        borderWidth:1,
    },
    nextButton:{
        flex: 1,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
        padding:12,
        borderRadius:4,
        width:'calc(100vw - 24px)',
    },
    buttonContainerPrivacy:{
        width:'100%',
        backgroundColor:'transparent'
      },
      buttonPrivacy:{
        margin: 24,
        backgroundColor:'transparent'
      },
      buttonTitlePrivacy:{
        fontSize: 14,
        opacity:0.5,
        color:'white',
        textDecorationLine: 'underline',
        textAlign: 'center'
      },
      buttonWrapperStyle:{
          backgroundColor: 'transparent', 
          flexDirection: 'row-reverse', 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          flex: 1,
          paddingHorizontal: 10, 
          paddingVertical: 10, 
          alignItems: 'flex-end'
      }
  })
  