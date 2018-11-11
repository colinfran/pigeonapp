import React from "react";
import { TouchableOpacity,TouchableHighlight, TextInput, Image, StyleSheet, Text, View, Dimensions, ListView, FlatList, Platform, StatusBar, ScrollView, Button } from "react-native";
import { SafeAreaView} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import Grid from 'react-native-grid-component';
import { MapView } from "expo";

export default class UserSettings1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  static navigationOptions = {
    title: "Settings1",
    headerStyle: {
      backgroundColor: "#33ADFF"
    },
    headerTintColor: "#fff"
  };


  render() {
    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <View
          style={{
            flex: 0,
            textAlign: "center",
            alignItems: "center",
            paddingTop: 10
          }}
        >
        <Text>Settings1</Text>
        </View>
      </View>
    );
  }
}
