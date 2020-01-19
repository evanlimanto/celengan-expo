import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image
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
      transactionItems:[
        { date : "27-02-20",
          data :
          [
            {
              name: 'Salary',
              amount: '4000000',
              bank: 'BCA',
              type: 'incoming'
            },
            {
              name: 'Gym',
              amount: '150000',
              bank: 'BCA',
              type: 'outgoing'
            },
          ]
        },
        { date : "27-02-20",
          data :
          [
            {
              name: 'Salary',
              amount: '4000000',
              bank: 'BCA',
              type: 'outgoing'
            },
            {
              name: 'Gym',
              amount: '150000',
              bank: 'BCA',
              type: 'outgoing'
            },
          ]
        },  
          { date : "27-02-20",
            data :
            [
              {
                name: 'Spotify',
                amount: '4000000',
                bank: 'BCA',
                type: 'outgoing'
              },
              {
                name: 'Gym',
                amount: '150000',
                bank: 'BCA',
                type: 'outgoing'
              },
            ]
          },      
      ]
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

    console.log(this.state.transactionItems[0].data[0])
    let transactions = this.state.transactionItems.map((items, i) => (
      <View key={i}>
        <View style={styles.date}>
          <Text style={styles.itemsDate}>{items.date}</Text>
        </View>
        <View>
          {items.data.map(items => (
            <View style={styles.daily}>
              <View style={styles.dailyName}>
                <Text style={styles.itemsName}>{items.name}</Text>
              </View>
              <View style={styles.dailyAmount}>
                <Text
                  style={{
                    color: items.type == "incoming" ? "#10C944" : "#07152F"
                  }}
                >
                  {items.amount}
                </Text>
                <Text style={styles.itemsBank}>Bank {items.bank}</Text>
              </View>
              <View>
                <Image
                  source={
                    items.type == "incoming"
                      ? require("../assets/images/Incoming.svg")
                      : require("../assets/images/Outgoing.svg")
                  }
                  style={styles.dailyIcon}
                />
              </View>
            </View>
          ))}
        </View>
      </View>
    ));
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
        <ScrollView style={styles.transactionList}>
          <Button 
            icon = {{
              name: "search",
              size: 24,
              color: "white"
            }}
            buttonStyle={styles.iconButton}
            iconContainerStyle={styles.searchContainer}
            containerStyle={styles.searchButton}
          />
          <View style={styles.monthly}>
            {transactions}
          </View>
        </ScrollView>
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
  dailyIcon: {
    width:32,
    height:32
  },
  transactionList:{
    flex: 1,
    zIndex:9,
    flexDirection: 'column',
    marginTop: '-24px',
  },
  date:{
    paddingVertical: 4,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor:'#E2E4EE',
  },
  daily:{
    marginHorizontal: 16,
    paddingVertical: 16,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0, 0, 0, 0.25)'
  },
  dailyName:{
    width:'50%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:'flex-start'
  },
  itemsName:{
    fontWeight: '700',
  },
  dailyAmount:{
    width:'50%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:'flex-end'
  },
  itemsBank:{
    marginTop:2,
    fontSize: 10,
    color:'#5C91AE',
    fontWeight: '500'
  },
  iconButton:{
    backgroundColor: 'black',
    borderRadius: 24,
    marginBottom: '-50%',
  },
  searchContainer:{
    height: 32,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:'center',
  },
  searchButton:{
    width: 48,
    zIndex:9,
    position: 'relative',
    alignSelf:'flex-end',
  }
});
