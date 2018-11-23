import React from "react";
import { TouchableOpacity,TouchableHighlight, TextInput, Image, StyleSheet, Text, View, Dimensions, ListView, FlatList, Platform, StatusBar, ScrollView, Button } from "react-native";
import { SafeAreaView} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import Grid from 'react-native-grid-component';
import { MapView } from "expo";

export default class AddEmergencySuccessful extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  static navigationOptions = {
    title: "Submitted",
    headerLeft: null,
    gesturesEnabled: false,

    headerStyle: {
      backgroundColor: "red"
    },
    headerTintColor: "#fff"
  };


  render() {
    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <View
          style={{
            flex: 0,
            textAlign:'center',
            paddingTop: 50,
            padding: 30,
          }}
        >
        <Text style={{fontSize:20, textAlign:'center'}}>Your post has been submitted successfully</Text>
        </View>
      </View>
    );
  }
}
