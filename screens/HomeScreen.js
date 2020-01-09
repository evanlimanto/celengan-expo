import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import { StackActions } from 'react-navigation';

import { MonoText } from '../components/StyledText';
import getEnvVars from '../environment';
const { apiUrl } = getEnvVars();

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null,
    };
    this.navigateHome = this.navigateHome.bind(this);
  }

  componentDidMount() {
    return fetch(`${apiUrl}/user/items`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.setState({ items: responseJson });
      })
      .catch(console.error);
  }

  navigateHome() {
    this.props.navigation.dispatch(StackActions.popToTop());
  }

  render() {
    const items = this.state.items == null ? (
      <ActivityIndicator size="large" color="#0000ff" />
    ) : this.state.items.map(
      (item, i) => (
        <ListItem
          key={i}
          title={`${item.institutionName} ${item.username}`}
          bottomDivider
        />
      )
    );
    return (
      <View style={styles.container}>
        <View style={styles.contents}>
          {items}
        </View>
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contents: {
    alignItems: 'center',
    marginTop: 50,
  },
});
