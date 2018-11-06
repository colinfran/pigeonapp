import React from "react";

// premade components
import { View, Text, Button, Platform } from "react-native"; // built-in components
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json

// our handmade components
import MoreScreen from "../../../components/MoreScreen";


const AddStack = createStackNavigator(
  {
    initial: {
      screen: MoreScreen,
    },
  },
  {
    initialRouteName: 'initial',
  }
);

export default AddStack;
