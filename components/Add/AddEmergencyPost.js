import React, { Component } from 'react';
import { View, Text, Platform, Image } from "react-native"; // built-in components
import {  Button } from 'react-native-elements'
import CheckBox from 'react-native-check-box'


export default class AddEmergencyPost extends Component {
  constructor(props) {
    super(props);
    this.state={
    }
  }

  static navigationOptions = {
    title: 'Posting An Emegency',
    headerStyle: {
      backgroundColor: 'red',
    },
    headerTintColor: '#fff',
  };

  onButtonPress(){
    this.props.navigation.navigate('second', );
  }

  render() {
    return (
        <View style={{flex:1, flexDirection:'column'}}>
          <View style={{flex:0, paddingTop: 50}}>
            <View style={{textAlign:'center', alignItems:'center'}}>
              <Text style={{fontSize:20, paddingBottom: 30}}>
                Submit an Emergncy
              </Text>
            </View>
            <View style={{padding:20}}>
              <Text style={{paddingBottom: 15}}>
                If there is an emergency{" "}
                <Text style={{textDecorationLine:'underline'}}>
                  please call 911 first
                </Text>
                {" "}and alert the proper authorites.
              </Text>
              <Text>
              Please do not use this as your primary way of alerting people. This app uses data posted by other people and is intended to be a secondary way of notifying people of emergencies.
              </Text>
            </View>
          </View>

          <Button
            style={{paddingTop:10}}
            title="Click here to continue to the posting screen"
            onPress={() => this.onButtonPress()}
          />
        </View>
    );
  }

}
