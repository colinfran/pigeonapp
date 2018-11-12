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
    title: "Helpful Tornado Info",
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
          <Text>Figure out a safe place to ride out the storm.Do you live in a
           mobile home? Get out. Driving in a car? Get home as quickly as you
            can, and if that{"'"}s not possible, get to a sturdy building.</Text>
        </View>
        <Text></Text>
        <View style={{flexDirection: 'row'}}>
          <Text>{'\u2022'+'  '}</Text>
          <Text>Get away from windows and get underground. Regardless of where
           you{"''"}re hunkering down, it should be as far away from windows as
            possible. Even if a tornado doesn{"''"}t hit, wind or hail could shatter
             windows, and if you{"''"}re nearby, you could get hurt.</Text>
        </View>
        <Text></Text>
        <View style={{flexDirection: 'row'}}>
          <Text>{'\u2022'+'  '}</Text>
          <Text>Keep your pets on a leash or in a carrier, and bring them with you</Text>
        </View>
        <Text></Text>
        <View style={{flexDirection: 'row'}}>
          <Text>{'\u2022'+'  '}</Text>
          <Text>Don{"''"}t leave your home and try to drive away from a tornado.
          If you made it home, stay there. Tornadoes can shift their path, and
          even if you think you{"''"}re directly in the line of the storm, being
           inside shelter is safer than being inside a car. </Text>
        </View>
        <Text></Text>
        <Text></Text>
        <Text  style={{ fontWeight: "bold" }}>How to Prepare</Text>
        <View style={{flexDirection: 'row'}}>
          <Text>{'\u2022'+'  '}</Text>
          <Text>Create a plan for where you and your family will go in the event
           of a tornado — at home, at work and at relatives’ or friends’ homes
            that you visit frequently. Always be alert to changing weather conditions.</Text>
        </View>
        <Text></Text>
        <View style={{flexDirection: 'row'}}>
          <Text>{'\u2022'+'  '}</Text>
          <Text>Pick a safe room in your home where household members and pets
           may gather during a tornado. This should be a basement, storm cellar
           or an interior room on the lowest floor with no windows.</Text>
        </View>
        <Text></Text>
        <View style={{flexDirection: 'row'}}>
          <Text>{'\u2022'+'  '}</Text>
          <Text>Listen to NOAA Weather Radio or to commercial radio or television
           newscasts for the latest information.</Text>
        </View>
        <Text></Text>
        <View style={{flexDirection: 'row'}}>
          <Text>{'\u2022'+'  '}</Text>
          <Text>Check with your work and your children’s school and day care
          center regarding tornado emergency plans. Every building has different
           safe places. It is important to know where they are and how to get
           there in an emergency.</Text>
        </View>
        <Text></Text>
        <View style={{flexDirection: 'row'}}>
          <Text>{'\u2022'+'  '}</Text>
          <Text>Make sure everyone understands how tornado siren warning systems
           work and if a warning system is installed in your area.</Text>
        </View>
        <Text></Text>
        <View style={{flexDirection: 'row'}}>
          <Text>{'\u2022'+'  '}</Text>
          <Text>Mark clearly where your first-aid kit and fire extinguishers are
           located. Make sure the first-aid kit is properly stocked with medical
           supplies.</Text>
        </View>
        <Text></Text>


        </View>
        </View>
      </ScrollView>
    );
  }
}
