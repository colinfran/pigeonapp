import React from "react";

// premade components
import { View, Text, Button, Platform } from "react-native"; // built-in components
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json

// our handmade components
import AddEmergencyPost from "../../../components/Add/AddEmergencyPost";
import AddEmergencyType from "../../../components/Add/AddEmergencyType";
import AddEmergencyInfo from "../../../components/Add/AddEmergencyInfo";
import AddEmergencySubmit from "../../../components/Add/AddEmergencySubmit";
import AddEmergencyMap from "../../../components/Add/AddEmergencyMap";
import AddEmergencySuccessful from "../../../components/Add/AddEmergencySuccessful";


const AddStack = createStackNavigator(
  {
    first: {
      screen: AddEmergencyPost,
    },
    second: {
      screen: AddEmergencyType,
    },
    third: {
      screen: AddEmergencyInfo,
    },
    fourth: {
      screen: AddEmergencyMap,
    },
    fifth: {
      screen: AddEmergencySubmit,
    },
    sixth: {
      screen: AddEmergencySuccessful,
    },
  },
  {
    initialRouteName: 'first',
  }
);

export default AddStack;
