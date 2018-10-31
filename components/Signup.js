import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import {View, TextInput, Text, Button} from 'react-native-ui-lib';
import {Typography, Colors} from 'react-native-ui-lib';
import { login } from '../api/auth'

Colors.loadColors({
  blue: '#33ADFF',
});


export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
  }

  async onLogin() {
    await login();
    this.props.navigation.navigate('Emergencies');
  }

  render() {
    return (

      <View flex paddingH-25 paddingT-20>
        <Text blue50 text20>Sign Up</Text>
        <View paddingT-25></View>
        <TextInput text50 placeholder="First Name" dark10/>
        <TextInput text50 placeholder="Last Name" dark10/>
        <TextInput text50 placeholder="Email" dark10/>
        <TextInput text50 placeholder="Password" secureTextEntry dark10/>
        <TextInput text50 placeholder="Verify Password" secureTextEntry dark10/>

        <View marginT-100 center>
          <Button text70 white background-blue label="Login" onPress={this.onLogin}/>
        </View>
      </View>

    );
  }

}
