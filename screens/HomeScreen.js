import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Button, Icon, ListItem } from 'react-native-elements';
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
    this.logout = this.logout.bind(this);
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

  async logout() {
    await AsyncStorage.clearItem('authorization_token');
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
        <Text onPress={this.logout}>Logout</Text>
        <View style={styles.contents}>
          <Text>Items</Text>
          {items}
        </View>
        <Button
          icon={<Icon name='plus' size={15} color='white' type='foundation' />}
          title="Add"
          onPress={() => this.props.navigation.navigate('SelectInstitution')}
        />
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
    marginBottom: 50,
  },
});
