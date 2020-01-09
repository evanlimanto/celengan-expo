import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Card, Image } from 'react-native-elements';

import getEnvVars from '../environment';
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
        {institutions.map((institution, i) => (
          <Card onPress={() => this.onInstitutionPress(institution)} key={i}>
            <Image source={require(`../assets/images/${institution}.png`)} />
            <Text>{institution}</Text>
          </Card>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
