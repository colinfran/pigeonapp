import React from "react";

// premade components
import { View, Text, Button, Platform } from "react-native"; // built-in components
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs"; //https://reactnavigation.org/docs/en/material-bottom-tab-navigator.html
import { Ionicons } from '@expo/vector-icons'; //https://ionicons.com/

// our handmade components
import MapList from "./components/MapList";
import ProfileScreen from "./components/ProfileScreen";
import MoreScreen from "./components/MoreScreen";

//navbar with 4 different screens
export default createMaterialBottomTabNavigator(
  {
    // emergency, profile, more are labels for each bottom tab in the nav
    Emergencies: { screen: MapList },
    Profile: { screen: ProfileScreen },
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
            iconName = `md-alert`;
          }
        } else if (routeName === "Profile") {
          if (Platform.OS === "ios"){
            iconName = `ios-contact${focused ? "" : "-outline"}`;
          }else{
            iconName = `md-contact`;
          }
        } else if (routeName === "More") {
          if (Platform.OS === "ios"){
            iconName = `ios-more${focused ? "" : "-outline"}`;
          }else{
            iconName = `md-more`;
          }
        }
        return <Ionicons name={iconName} size={27} color={"#ffff"} />;
      },


      barStyle: { backgroundColor: "#33ADFF" },
      animationEnabled: true,
      initialRouteName: "MapList",
      activeTintColor: "white",
      // labeled: false,
      shifting: true,
    }),



  }
);
