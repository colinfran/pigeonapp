import React from "react";
import { TouchableOpacity,TouchableHighlight, TextInput, Image, StyleSheet, Text, View, Dimensions, ListView, FlatList, Platform, StatusBar, ScrollView, Button } from "react-native";
import { SafeAreaView} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import Grid from 'react-native-grid-component';
import { MapView } from "expo";

export default class MoreHelpfulInfo3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  static navigationOptions = {
    title: "Helpful Landslide Info",
    headerStyle: {
      backgroundColor: "#33ADFF"
    },
    headerTintColor: "#fff"
  };


  render() {
    return (
      <ScrollView>
        <View style={{ flex: 1, flexDirection: "column", padding: 20 }}>
        <View style={{
            flex: 0,
            alignItems: "left",
            paddingTop: 10
          }}
        >
        <Text  style={{ fontWeight: "bold" }}>Warning Signs</Text>
        <Text></Text>
        <View style={{flexDirection: 'row'}}>
          <Text>{'\u2022'+'  '}</Text>
          <Text>During a severe storm, stay alert and awake. Many deaths from
           landslides occur while people are sleeping.</Text>
        </View>
        <Text></Text>
        <View style={{flexDirection: 'row'}}>
          <Text>{'\u2022'+'  '}</Text>
          <Text>Listen to local news stations on a battery-powered radio for
           warnings of heavy rainfall.</Text>
        </View>
        <Text></Text>
        <View style={{flexDirection: 'row'}}>
          <Text>{'\u2022'+'  '}</Text>
          <Text>Listen for unusual sounds that might indicate moving debris,
           such as trees cracking or boulders knocking together.</Text>
        </View>
        <Text></Text>
        <View style={{flexDirection: 'row'}}>
          <Text>{'\u2022'+'  '}</Text>
          <Text>Move away from the path of a landslide or debris flow as quickly
           as possible. The danger from a mudflow increases near stream channels
            and with prolonged heavy rains. Mudflows can move faster than you
             can walk or run. Look upstream before crossing a bridge and do not
              cross the bridge if a mudflow is approaching.</Text>
        </View>
        <Text></Text>
        <Text></Text>
        <Text  style={{ fontWeight: "bold" }}>How to Prepare</Text>
        <Text></Text>
        <View style={{flexDirection: 'row'}}>
          <Text>{'\u2022'+'  '}</Text>
          <Text>To begin preparing, you should build an emergency kit and make
           a family communications plan.</Text>
        </View>
        <Text></Text>
        <View style={{flexDirection: 'row'}}>
          <Text>{'\u2022'+'  '}</Text>
          <Text>Prepare for landslides by following proper land-use procedures
           - avoid building near steep slopes, close to mountain edges, near
            drainage ways or along natural erosion valleys.</Text>
        </View>
        <Text></Text>
        <View style={{flexDirection: 'row'}}>
          <Text>{'\u2022'+'  '}</Text>
          <Text>Become familiar with the land around you. Learn whether debris
           flows have occurred in your area by contacting local officials.
            Slopes where debris flows have occurred in the past are likely to
             experience them in the future.</Text>
        </View>
        <Text></Text>
        <View style={{flexDirection: 'row'}}>
          <Text>{'\u2022'+'  '}</Text>
          <Text>Get a ground assessment of your property.</Text>
        </View>
        <Text></Text>
        <View style={{flexDirection: 'row'}}>
          <Text>{'\u2022'+'  '}</Text>
          <Text>Consult a professional for advice on appropriate preventative
           measures for your home or business, such as flexible pipe fittings,
            which can better resist breakage.</Text>
        </View>
        <Text></Text>
        <View style={{flexDirection: 'row'}}>
          <Text>{'\u2022'+'  '}</Text>
          <Text>Protect your property by planting ground cover on slopes and
           building retaining walls.</Text>
        </View>
        <Text></Text>


        </View>
        </View>
      </ScrollView>
    );
  }
}