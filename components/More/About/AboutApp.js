import React from "react";
import { TouchableOpacity,TouchableHighlight, TextInput, Image, StyleSheet, Text, View, Dimensions, ListView, FlatList, Platform, StatusBar, ScrollView, Button } from "react-native";
import { SafeAreaView} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import Grid from 'react-native-grid-component';
import { MapView } from "expo";

export default class AboutApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  static navigationOptions = {
    title: "About This App",
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
            textAlign: "center",
            alignItems: "center",
            paddingTop: 30,
            padding: 50,
          }}
        >
          <Image
            resizeMethod="resize"
            source={require("../../../assets/pigeon.png")}
            />
          <Text>Pigeon is a crowdsourcing application for emergency notification. We took inspiration
              from the Coffee Park incident during the Tubbs fire of October 2017. People were unaware
              of impending danger until they were well within harm{"'"}s way.
          </Text>
          <Text>To solve this we wanted to create a modern way to let neighbors look out for neighbors,
              thus Pigeon was born. Think of this app as the software equivalent of a fire extinguisher, we'll
              be here when you need us.
          </Text>

        </View>
      </View>
    );
  }
}
