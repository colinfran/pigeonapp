import React from "react";
import { View, Text, Platform, Image, AsyncStorage } from "react-native"; // built-in components
import {  Button } from 'react-native-elements';
import CheckBox from 'react-native-check-box';

import { submitEmergencyInfo } from '../../api/auth'
import Geocoder from 'react-native-geocoding';


//---------------------------------------------------------------------------
Geocoder.init('AIzaSyDX-kRrpL4QR1x4L_NwpoV8HxK0ITx0wSQ'); // use a valid API key


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
      town: "",
      county: "",

    };
    console.log("type: " + this.state.type);
    console.log("title: " + this.state.title);
    console.log("description: " + this.state.description);
    console.log("pressCoordinates: " + JSON.stringify(this.state.pressCoordinates));

    this.geocode = this.geocode.bind(this);

  }

  static navigationOptions = {
    title: "Submit",
    headerStyle: {
      backgroundColor: "red"
    },
    headerTintColor: "#fff"
  };

  geocode(){
    Geocoder.from(this.state.pressCoordinates.latitude, this.state.pressCoordinates.longitude)
          .then(json => {
            var townComponent = json.results[0].address_components[2].long_name;
            var countyComponent = json.results[0].address_components[3].long_name;
            this.setState({town: townComponent, county: countyComponent})
            // console.log(townComponent + " " + countyComponent);

          })
          .catch(error => console.warn(error));
  }

  componentDidMount(){
    this.geocode();
    console.log(this.state.town + " " + this.state.county);
  }


  async verify(){
    var posterUserID = await AsyncStorage.getItem('userID');
    console.log(posterUserID);


    if (this.state.checkedAgreement && this.state.checkedInformation){
      var submitted = submitEmergencyInfo(this.state.title, this.state.description, this.state.type, 0, posterUserID, this.state.pressCoordinates, "", this.state.town, this.state.county);

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
          <View style={{flex:0, padding:20, paddingTop: 15, flexDirection:'column'}}>
              <Text>
                Pigeon built this mobile app as to be a free. This SERVICE is provided by Pigeon
                at no cost and is intended for use as is. You must agree to not spam, falsly post, or decieve
                any users in this app. We reserve the right to remove your post at our descretion.
                Posts must be truthful and must not contain false information.
              </Text>
              <Text style={{paddingTop:8, paddingBottom: 8}}>
                (To see more information about our legal policy, please go to the "More Screen", scroll down, and select "Legal".)
              </Text>
              <Text style={{flexDirection:'row', }}>
                <Text>
                  You agree that by posting to this app, you have{" "}
                </Text>
                <Text style={{textDecorationLine:'underline'}}>
                   read, understood, and agree
                </Text>
                <Text>
                  {" "}to be bound by all of the Terms and Conditions. IF YOU DO NOT AGREE WITH ALL
                  OF THESE TERMS and CONDITIONS, THEN YOU ARE{" "}
                </Text>
                <Text style={{textDecorationLine:'underline'}}>
                   EXPRESSLY PROHIBITED
                </Text>
                <Text>
                  {" "}FROM POSTING ON THIS APP.
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
