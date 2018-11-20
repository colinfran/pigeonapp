import React from "react";

// premade components
import { View, Text, Button, Platform } from "react-native"; // built-in components
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json

// our handmade components
import MoreScreen from "../../../components/MoreScreen";
import MoreHelpfulInfo1 from "../../../components/More/HelpfulInfo/MoreHelpfulInfo1";
import MoreHelpfulInfo2 from "../../../components/More/HelpfulInfo/MoreHelpfulInfo2";
import MoreHelpfulInfo3 from "../../../components/More/HelpfulInfo/MoreHelpfulInfo3";

import DisplayName from "../../../components/More/UserInformation/DisplayName";
import PostedEmergencies from "../../../components/More/UserInformation/PostedEmergencies";

import UserSettings from "../../../components/More/UserSettings/UserSettings";
import Password from "../../../components/More/UserSettings/Password";


import AboutApp from "../../../components/More/About/AboutApp";
import AboutCreators from "../../../components/More/About/AboutCreators";
import AboutLegal from "../../../components/More/About/AboutLegal";

import NewPosts from "../../../components/More/Admin/NewPosts";

import VerifyAccount from "../../../components/More/VerifyAccount";

const AddStack = createStackNavigator(
  {
    initial: {
      screen: MoreScreen,
    },
    Helpful1: {
      screen: MoreHelpfulInfo1,
    },
    Helpful2: {
      screen: MoreHelpfulInfo2,
    },
    Helpful3: {
      screen: MoreHelpfulInfo3,
    },
    Information1: {
      screen: DisplayName,
    },
    Information2: {
      screen: PostedEmergencies,
    },
    Settings: {
      screen: UserSettings,
    },
    Password: {
      screen: Password,
    },
    About1: {
      screen: AboutApp,
    },
    About2: {
      screen: AboutCreators,
    },
    About3: {
      screen: AboutLegal,
    },
    Admin1: {
      screen: NewPosts,
    },
    Verify: {
      screen: VerifyAccount,
    }
  },
  {
    initialRouteName: 'initial',
  }
);

export default AddStack;
