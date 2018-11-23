import React from "react";
import { TouchableOpacity,TouchableHighlight, TextInput, Image, StyleSheet, Text, View, Dimensions, ListView, FlatList, Platform, StatusBar, ScrollView, Button } from "react-native";
import { SafeAreaView} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import Grid from 'react-native-grid-component';
import { MapView } from "expo";

export default class MoreHelpfulInfo1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  static navigationOptions = {
    title: "Fire Infomation",
    headerStyle: {
      backgroundColor: "red"
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
          <Text>Remember to GET OUT, STAY OUT and CALL 9-1-1 or your local
            emergency phone number. </Text>
        </View>
        <Text></Text>
        <View style={{flexDirection: 'row'}}>
          <Text>{'\u2022'+'  '}</Text>
          <Text>Yell "Fire!" several times and go outside right away. If you
          live in a building with elevators, use the stairs. Leave all your things
           where they are and save yourself.</Text>
        </View>
        <Text></Text>
        <View style={{flexDirection: 'row'}}>
          <Text>{'\u2022'+'  '}</Text>
          <Text>If closed doors or handles are warm or smoke blocks your primary
           escape route, use your second way out. Never open doors that are warm
           to the touch. </Text>
        </View>
        <Text></Text>
        <View style={{flexDirection: 'row'}}>
          <Text>{'\u2022'+'  '}</Text>
          <Text>If you must escape through smoke, get low and go under the
          smoke to your exit. Close doors behind you.</Text>
        </View>
        <Text></Text>
        <View style={{flexDirection: 'row'}}>
          <Text>{'\u2022'+'  '}</Text>
          <Text>If smoke, heat or flames block your exit routes, stay in the
           room with doors closed. Place a wet towel under the door and call the
           fire department or 9-1-1. Open a window and wave a brightly colored
           cloth or flashlight to signal for help.</Text>
        </View>
        <Text></Text>
        <View style={{flexDirection: 'row'}}>
          <Text>{'\u2022'+'  '}</Text>
          <Text>Once you are outside, go to your meeting place and then send
          one person to call the fire department. If you cannot get to your meeting
           place, follow your family emergency communication plan.</Text>
        </View>
        <Text></Text>
        <Text></Text>
        <Text  style={{ fontWeight: "bold" }}>How to Prepare</Text>
        <View style={{flexDirection: 'row'}}>
          <Text>{'\u2022'+'  '}</Text>
          <Text>Install smoke alarms on every level of your home, inside bedrooms
           and outside sleeping areas.</Text>
        </View>
        <Text></Text>
        <View style={{flexDirection: 'row'}}>
          <Text>{'\u2022'+'  '}</Text>
          <Text>Test smoke alarms every month. If they’re not working, change the
           batteries.</Text>
        </View>
        <Text></Text>
        <View style={{flexDirection: 'row'}}>
          <Text>{'\u2022'+'  '}</Text>
          <Text>Talk with all family members about a fire escape plan and
           practice the plan twice a year.</Text>
        </View>
        <Text></Text>


        </View>
        </View>
      </ScrollView>
    );
  }
}
