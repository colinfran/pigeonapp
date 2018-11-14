import React from "react";
import { TouchableOpacity,TouchableHighlight, TextInput, Image, StyleSheet, Text, View, Dimensions, ListView, FlatList, Platform, StatusBar, ScrollView, Button } from "react-native";
import { SafeAreaView} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import Grid from 'react-native-grid-component';
import { MapView } from "expo";

export default class MoreHelpfulInfo2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  static navigationOptions = {
    title: "Flood informatoin",

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
        <Text  style={{ fontWeight: "bold" }}>Basic Information</Text>
        <Text></Text>
        <View style={{flexDirection: 'row'}}>
          <Text>{'\u2022'+'  '}</Text>
          <Text>If you have time prior to evacuation, secure your home. Bring
          in outdoor furniture. Move essential items to the highest part of the
           upper floor of your home.</Text>
        </View>
        <Text></Text>
        <View style={{flexDirection: 'row'}}>
          <Text>{'\u2022'+'  '}</Text>
          <Text>Turn off utilities at the main switches or valves if instructed
           to do so. Disconnect electrical appliances. Do not touch electrical
           equipment if you are wet or standing in water.</Text>
        </View>
        <Text></Text>
        <View style={{flexDirection: 'row'}}>
          <Text>{'\u2022'+'  '}</Text>
          <Text>Do not walk through moving water. Six inches of moving water can
           sweep you off your feet. If you have to walk in water, walk where the
            water is not moving. Use a stick to check the firmness of the ground
             in front of you.</Text>
        </View>
        <Text></Text>
        <View style={{flexDirection: 'row'}}>
          <Text>{'\u2022'+'  '}</Text>
          <Text>“Turn around, don’t drown!” If you come upon a flowing stream
           where water is above your ankles, stop, turn around and go another way.</Text>
        </View>
        <Text></Text>
        <Text></Text>
        <Text  style={{ fontWeight: "bold" }}>How to Prepare</Text>
        <Text></Text>
        <View style={{flexDirection: 'row'}}>
          <Text>{'\u2022'+'  '}</Text>
          <Text>Check with your local council about local flood plans or records
           which detail problem areas</Text>
        </View>
        <Text></Text>
        <View style={{flexDirection: 'row'}}>
          <Text>{'\u2022'+'  '}</Text>
          <Text>Ask authorities about relocation routes and centres.</Text>
        </View>
        <Text></Text>
        <View style={{flexDirection: 'row'}}>
          <Text>{'\u2022'+'  '}</Text>
          <Text>If your area is flood prone consider alternatives to carpets.</Text>
        </View>
        <Text></Text>
        <View style={{flexDirection: 'row'}}>
          <Text>{'\u2022'+'  '}</Text>
          <Text>Prepare an emergency kit.</Text>
        </View>
        <Text></Text>
        <View style={{flexDirection: 'row'}}>
          <Text>{'\u2022'+'  '}</Text>
          <Text>Prepare a household flood plan.</Text>
        </View>
        <Text></Text>
        <View style={{flexDirection: 'row'}}>
          <Text>{'\u2022'+'  '}</Text>
          <Text>Keep a list of emergency telephone numbers on display.</Text>
        </View>
        <Text></Text>
        <View style={{flexDirection: 'row'}}>
          <Text>{'\u2022'+'  '}</Text>
          <Text>Check your insurance policy to see if you are covered for flood
           damage?</Text>
        </View>
        <Text></Text>

        </View>
        </View>
      </ScrollView>
    );
  }
}
