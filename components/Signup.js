import React, { Component } from 'react'
import { StyleSheet, AsyncStorage, Alert } from 'react-native'
import {View, TextInput, Text, Button} from 'react-native-ui-lib';
import {Typography, Colors} from 'react-native-ui-lib';
import { login } from '../api/auth'
import CheckBox from 'react-native-check-box';

Colors.loadColors({
  blue: '#33ADFF',
});

// https://help.id.me/hc/en-us/articles/202087474-What-documentation-do-I-need-to-verify-my-first-responder-status

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);

    this.state = {
      name:"",
      email:"",
      password: "",
      passwordCheck: "",
      driverslicense: "",
      admin: false,

    };
  }


  async onLogin() {
    if (this.state.password!=this.state.passwordCheck){
      alert("Passwords do not match");
      return;
    }
    AsyncStorage.setItem('name', this.state.name);
    AsyncStorage.setItem('email', this.state.email);
    AsyncStorage.setItem('password', this.state.password);
    AsyncStorage.setItem('driverslicense', this.state.driverslicense);
    AsyncStorage.setItem('admin', this.state.admin+'');

    await login();
    this.props.navigation.navigate('Emergencies');
  }

  render() {
    return (

      <View flex paddingH-25 paddingT-20>
        <Text blue50 text20>Sign Up</Text>
        <View paddingT-25></View>
        <TextInput text50 dark10
          placeholder="Name"
          onChangeText={(value) => this.setState({name: value})}
          value={this.state.name}/>
        <TextInput text50 dark10
          placeholder="Email"
          onChangeText={(value) => this.setState({email: value})}
          value={this.state.email}/>
        <TextInput text50 dark10
          placeholder="Password"
          secureTextEntry
          onChangeText={(value) => this.setState({password: value})}
          value={this.state.password}/>
        <TextInput text50 dark10
          placeholder="Verify Password"
          secureTextEntry
          onChangeText={(value) => this.setState({passwordCheck: value})}
          value={this.state.passwordCheck}/>
        <TextInput text50 dark10
          placeholder="Drivers License"
          secureTextEntry
          onChangeText={(value) => this.setState({driverslicense: value})}
          value={this.state.driverslicense}/>
        <CheckBox
          style={{padding: 10}}
          onClick={()=>{
            this.setState({
                admin:!this.state.admin
            })
          }}
          isChecked={this.state.admin}
          rightText={"Are you a police officer, firefigher, EMT, or first responder?"}
        />
      <View marginT-10 center>
          <Button text70 white background-blue label="Login" onPress={this.onLogin}/>
        </View>
      </View>

    );
  }

}
