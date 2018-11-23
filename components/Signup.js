import React, { Component } from 'react'
import { StyleSheet, AsyncStorage, Alert } from 'react-native'
import {View, TextInput, Text, Button} from 'react-native-ui-lib';
import {Typography, Colors} from 'react-native-ui-lib';
// import { login } from '../api/auth';
import { createUser } from '../api/auth'
import CheckBox from 'react-native-check-box';
import * as firebase from 'firebase';


Colors.loadColors({
  red: 'red',
});

// https://help.id.me/hc/en-us/articles/202087474-What-documentation-do-I-need-to-verify-my-first-responder-status

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);

    this.state = {
      firstname:"",
      lastname:"",
      email:"",
      password: "",
      passwordCheck: "",
      driverslicense: "",
      admin: false,
      token: this.props.navigation.state.params.token,

    };
  }



  async onLogin() {
    if (this.state.password!=this.state.passwordCheck){
      alert("Passwords do not match");
      return;
    }

    if (this.state.password.length < 6){
      alert("Password needs to be at least 6 characters.");
      return;
    }
    AsyncStorage.setItem('name', this.state.firstname);
    AsyncStorage.setItem('email', this.state.email);
    AsyncStorage.setItem('password', this.state.password);
    AsyncStorage.setItem('driverslicense', this.state.driverslicense);
    AsyncStorage.setItem('admin', this.state.admin+'');

    var loggedIn = createUser(this.state.email, this.state.password, this.state.firstname, this.state.lastname, this.state.driverslicense, this.state.admin, this.state.token)

    if (loggedIn)
      this.props.navigation.navigate('Emergencies');

    // createUser(this.state.email, this.state.password, this.state.name, this.state.name, this.state.driverslicense, this.state.admin);
  }

  render() {
    return (

      <View flex paddingH-25 paddingT-20>
        <Text red50 text20>Sign Up</Text>
        <View paddingT-25></View>
        <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
          <TextInput text50 dark10
            style={{width:'45%'}}
            placeholder="First Name"
            onChangeText={(value) => this.setState({firstname: value})}
            returnKeyType = {"next"}
            onSubmitEditing={() => { this.lastnameTextInput.focus(); }}
            blurOnSubmit={false}
            value={this.state.name}/>
            <TextInput text50 dark10
              returnKeyType = {"next"}
              ref={(input) => { this.lastnameTextInput = input; }}
              style={{width:'45%'}}
              placeholder="Last Name"
              onChangeText={(value) => this.setState({lastname: value})}
              onSubmitEditing={() => { this.emailTextInput.focus(); }}
              value={this.state.name}/>

        </View>

        <TextInput text50 dark10
          placeholder="Email"
          returnKeyType = {"next"}
          ref={(input) => { this.emailTextInput = input; }}
          onChangeText={(value) => this.setState({email: value})}
          onSubmitEditing={() => { this.passwordTextInput.focus(); }}
          value={this.state.email}/>
        <TextInput text50 dark10
          placeholder="Password"
          ref={(input) => { this.passwordTextInput = input; }}
          returnKeyType = {"next"}
          secureTextEntry
          onSubmitEditing={() => { this.password2TextInput.focus(); }}
          onChangeText={(value) => this.setState({password: value})}
          value={this.state.password}/>
        <TextInput text50 dark10
          returnKeyType = {"next"}
          ref={(input) => { this.password2TextInput = input; }}
          placeholder="Verify Password"
          secureTextEntry
          onChangeText={(value) => this.setState({passwordCheck: value})}
          onSubmitEditing={() => { this.dlTextInput.focus(); }}
          value={this.state.passwordCheck}/>
        <TextInput text50 dark10
          returnKeyType={"done"}
          placeholder="Drivers License"
          secureTextEntry
          onChangeText={(value) => this.setState({driverslicense: value})}
          ref={(input) => { this.dlTextInput = input; }}
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
          <Button text70 white background-red label="Login" onPress={this.onLogin}/>
        </View>
      </View>

    );
  }

}
