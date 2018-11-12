import React from "react";
import { View, Text, Platform, Image, AsyncStorage } from "react-native"; // built-in components
import {  Button } from 'react-native-elements';
import CheckBox from 'react-native-check-box';

import { submitEmergencyInfo } from '../../api/auth'


export default class AddEmergencySubmit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.navigation.state.params.type,
      title: this.props.navigation.state.params.title,
      description: this.props.navigation.state.params.description,
      pressCoordinates: this.props.navigation.state.params.pressCoordinates,

      checkedAgreement: false,
      checkedInformation: false,

    };
    console.log("type: " + this.state.type);
    console.log("title: " + this.state.title);
    console.log("description: " + this.state.description);
    console.log("pressCoordinates: " + JSON.stringify(this.state.pressCoordinates));


  }

  static navigationOptions = {
    title: "Submit",
    headerStyle: {
      backgroundColor: "#33ADFF"
    },
    headerTintColor: "#fff"
  };


  async verify(){
    var posterUserID = await AsyncStorage.getItem('userID');
    console.log(posterUserID);

    if (this.state.checkedAgreement && this.state.checkedInformation){
      console.log("Going into function");
      var submitted = submitEmergencyInfo(this.state.title, this.state.description, this.state.type, 0, posterUserID, this.state.pressCoordinates, "");

      if (submitted)
        this.props.navigation.navigate('sixth', );
    }


    else{
      alert("You did not accept our user agreement and/or the posting agrrement. You cannot continue if you don't accept.")
    }
  }

  render() {
    return (
        <View style={{flex:1, flexDirection:'column'}}>
          <View style={{flex:0, textAlign:'center', alignItems:'center', padding:20, paddingTop: 50}}>
            <Text>
              <Text>
                Pigeon built the Disaster Broadcaster app as a Free app. This SERVICE is provided by Pigeon
                at no cost and is intended for use as is. You must agree to not spam, falsly post, or decieve
                any users in this app. We reserve the right to remove your post at our descretion.
                [***this is just an example user agreement, will be updated***][stuff about location data too]
                You agree that by posting to this app, you have{" "}
              </Text>
              <Text style={{textDecorationLine:'underline'}}>
                 read, understood, and agree{" "}
              </Text>
              <Text>
                to be bound by all of these Terms and Conditions Use. IF YOU DO NOT AGREE WITH ALL
                OF THESE TERMS and CONDITIONS, THEN YOU ARE{" "}
              </Text>
              <Text style={{textDecorationLine:'underline'}}>
                 EXPRESSLY PROHIBITED{" "}
              </Text>
              <Text>
                FROM POSTING ON THIS APP.
              </Text>
            </Text>
          </View>
          <View style={{paddingLeft: 15}}>
            <CheckBox
                style={{padding: 10}}
                onClick={()=>{
                  this.setState({
                      checkedAgreement:!this.state.checkedAgreement
                  })
                }}
                isChecked={this.state.checkedAgreement}
                rightText={"By clicking here and continuing, you are accepting the above user agreement."}
            />
            <CheckBox
                style={{padding: 10}}
                onClick={()=>{
                  this.setState({
                      checkedInformation:!this.state.checkedInformation
                  })
                }}
                isChecked={this.state.checkedInformation}
                rightText={"By clicking here and continuing, you are agreeing that the information you just posted about an emergency is valid, truthful, and currently occuring."}
            />
          </View>
          <Button
            style={{paddingTop:10}}
            title="Click here to post the emergency"
            onPress={() => this.verify()}
          />
        </View>
    );
  }

}
