import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import {View, TextInput, Text, Button} from 'react-native-ui-lib';
import {Typography, Colors} from 'react-native-ui-lib';
import { login } from '../api/auth'

Colors.loadColors({
  blue: '#33ADFF',
});


export default class SignupLogin extends React.Component {
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
    this.onSignup = this.onSignup.bind(this);

  }

  async onLogin() {
    await login();
    this.props.navigation.navigate('Emergencies');
  }

  async onSignup() {
    await login();
    this.props.navigation.navigate('Signup');
  }

  render() {
    const { navigate } = this.props.navigation;
    return (

      <View flex blue paddingH-25 paddingT-40>
      <Text blue text10>Welcome</Text>

        <Text blue text50>Sign In</Text>
        <View style={[{padding: 16}]}></View>

        <TextInput text50 placeholder="Email" dark10/>
        <TextInput text50 placeholder="Password" secureTextEntry dark10/>
        <View marginT-100 center>
          <Button text70 white background-blue label="Login" onPress={this.onLogin}/>
          <Button link text70 blue label="Sign Up" marginT-20 onPress={this.onSignup}/>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
