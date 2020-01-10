import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import { Card, Image } from 'react-native-elements';

import getEnvVars from '../environment';
import { TouchableOpacity } from 'react-native-gesture-handler';
const { apiUrl } = getEnvVars();

const institutions = [
  'bca',
  'bni',
  'bri',
  'cimb',
  'mandiri',
];

export default class SelectInstitutionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.onInstitutionPress = this.onInstitutionPress.bind(this);
  }

  onInstitutionPress(institution) {
    this.props.navigation.navigate('InputCredentials', {
      institution,
    });
  }

  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.institutionTitle}>Select a bank to connect to Celengan</Text>
      <Text style={styles.institutionSubtitle}>Select one to continue</Text>
      <View style={styles.cardContainer}>
        {institutions.map((institution, i) => (
          /*<Card
            containerStyle={styles.cardStyle}
            onPress={() => this.onInstitutionPress(institution)} key={i}
            >
            <Image
            style={styles.imageStyle}
            resizeMode="contain"
            source={require(`../assets/images/${institution}.png`)}
            />
          </Card>*/
          <TouchableOpacity style={styles.cardStyle} onPress={() => this.onInstitutionPress(institution)} key={i}>
            <Image
            style={styles.imageStyle}
            resizeMode="contain"
            source={require(`../assets/images/${institution}.png`)}
            />
          </TouchableOpacity>
        ))}
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    backgroundImage:'linear-gradient(139deg, #0094ff, #206fff)',
    flexDirection:'column',
    alignItems:'center',
  },
  cardContainer:{
    width:'100%', 
    flex: 1,
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-between',
    alignItems:'flex-start',
    alignContent:'flex-start',
    padding:16
  },
  cardStyle: {
    padding:10,
    borderRadius: 4,
    marginBottom:16,
    padding:0,
    width: '48%',
    backgroundColor:'#fff',
  },
  imageStyle: {
    height:56,
  },
  institutionTitle:{
    fontSize:16,
    fontWeight:'bold',
    color:'white',
    marginBottom:32,
    marginTop:24
  },
  institutionSubtitle:{
    fontSize:14,
    color:'rgba(255,255,255,0.75)',
    marginBottom:8,
  }
});
