import React from "react";

// premade components
import { View, Text, Button, Platform } from "react-native"; // built-in components
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json

// our handmade components

import AddEmergencyType from "../../../components/AddEmergencyType";
import AddEmergencyDescription from "../../../components/AddEmergencyDescription";

const AddStack = createStackNavigator(
  {
    first: {
      screen: AddEmergencyType,
    },
    second: {
      screen: AddEmergencyDescription,
    },
  },
  {
    initialRouteName: 'first',
  }
);

export default AddStack;
