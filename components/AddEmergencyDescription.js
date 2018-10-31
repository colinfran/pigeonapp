import React from "react";
import { TouchableOpacity,TouchableHighlight, TextInput, Image, StyleSheet, Text, View, Dimensions, ListView, FlatList, Platform, StatusBar, ScrollView, Button } from "react-native";
import { SafeAreaView } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import Grid from 'react-native-grid-component';

var data=[
  {title:"Fire",description:"description1",type: "fire", icon:require("../assets/fire.png"), colors: "red", status:false},
  {title:"Flood",description:"description2",type: "flood", icon:require("../assets/flood.png"), colors: "green", status:false},
  {title:"Tornado",description:"description3",type: "tornado", icon: require("../assets/tornado.png"), colors: "yellow", status:false},
  {title:"Other",description:"description4",type: "other", icon: require("../assets/alert.png"), colors: "orange", status:false},
  {title:"Other",description:"description4",type: "other", icon: require("../assets/alert.png"), colors: "lightblue", status:false},
  {title:"Other",description:"description4",type: "other", icon: require("../assets/alert.png"), colors: "lightred", status:false}
]

export default class AddEmergencyDescription extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      imageL: 1000000,
      imageT: 1000000,
      fireVisible: true,
      floodVisible: false,
      tornadoVisible: false,
      otherVisible: false,
      dataVar: data,
      selected: "",
      description: ""
    }
  }

  capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  render() {
    return (
        <View style={{flex:1, flexDirection:'column'}}>
          <View style={{flex:0, textAlign:'center', alignItems:'center', paddingTop: 50}}>
            <Text style={{fontSize:30}}>{this.capitalize(this.props.navigation.state.params.type)}</Text>
          </View>
          <View style={{flex:1, flexDirection:'column'}}>
            <FormLabel>Description of {this.capitalize(this.props.navigation.state.params.type)}</FormLabel>
            <FormInput multiline inputStyle={{width: undefined}}/>
          </View>
        </View>
    );
  }

}

const styles = StyleSheet.create({

});
