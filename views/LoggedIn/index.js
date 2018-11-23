import React from "react";

// premade components
import { View, Text, Button, Platform } from "react-native"; // built-in components
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs"; //https://reactnavigation.org/docs/en/material-bottom-tab-navigator.html
import { Ionicons } from '@expo/vector-icons'; //https://ionicons.com/

// our handmade components
import MapList from "./MapListView";
// import ProfileScreen from "./components/ProfileScreen";
import MoreScreen from "./MoreView";

import AddStack from "./AddView";



// TODO: implement app instructions for user
// https://github.com/okgrow/react-native-copilot

//navbar with 4 different screens
const LoggedInNavigator = createMaterialBottomTabNavigator(
  {
    // emergency, more are labels for each bottom tab in the nav
    Emergencies: { screen: MapList },
    Add: { screen: AddStack },
    More: { screen: MoreScreen }
  },
  {
    // set icon svg & icon style if focused (ios / android specific icons)
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Emergencies") {
          if (Platform.OS === "ios"){
            iconName = `ios-alert${focused ? "" : "-outline"}`;
          }else{
            iconName = `md-alert`
          }
        }
        else if (routeName === "More") {
          if (Platform.OS === "ios"){
            iconName = `ios-more${focused ? "" : "-outline"}`;
          }else{
            iconName = `md-more`;
          }
        }
        else if (routeName === "Add") {
          if (Platform.OS === "ios"){
            iconName = `ios-add-circle${focused ? "" : "-outline"}`;
          }else{
            iconName = `md-add-circle`;
          }
        }
        return <Ionicons name={iconName} size={25} color={"#ffff"} />;
      },
      barStyle: { backgroundColor: "red" },
      animationEnabled: true,
      initialRouteName: "MapList",
      activeTintColor: "white",
      // labeled: false,
      shifting: true,
    }),
  }
);

export default LoggedInNavigator;
