import React, { Component } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'

import * as firebase from 'firebase';

import { getRootNavigator } from './views'
import { isLoggedIn } from './api/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDiFNSIiZO0EUh0jMiYwiDSYJ2wRRl7j4s',
  authDomain: 'project-pigeon-28cbf.firebaseapp.com',
  databaseURL: 'https://project-pigeon-28cbf.firebaseio.com',
  storageBucket: 'project-pigeon-28cbf.appspot.com'
};

firebase.initializeApp(firebaseConfig);

firebase.database().ref('/test_users/RNl4bSjqLLjTm1BWwX9l').set({
  'phone_number': '123-123-1234'
});



export default class Root extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;

    this.state = {
      loading: true,
      loggedIn: false
    };
  }

  async componentDidMount() {
    const loggedIn = await isLoggedIn();
    this.setState({ loggedIn, loading: false });
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.base}>
          <ActivityIndicator size='small' />
        </View>
      )
    }

    const RootNavigator = getRootNavigator(this.state.loggedIn);
    return <RootNavigator />
  }
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
