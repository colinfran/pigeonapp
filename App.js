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
    MapList: { screen: MapList },
    // ListScreen: { screen: ListScreen },
    ProfileScreen: { screen: ProfileScreen },
    MoreScreen: { screen: MoreScreen }
  },
  {
    // set icon svg & icon style if focused
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "MapList") {
          if (Platform.OS === "ios"){
            iconName = `ios-alert${focused ? "" : "-outline"}`;
          }else{
            iconName = `md-alert`;
          }
        } else if (routeName === "ListScreen") {
          if (Platform.OS === "ios"){
            iconName = `ios-list${focused ? "" : "-outline"}`;
          }else{
            iconName = `md-list`;
          }
        } else if (routeName === "ProfileScreen") {
          if (Platform.OS === "ios"){
            iconName = `ios-contact${focused ? "" : "-outline"}`;
          }else{
            iconName = `md-list`;
          }
        } else if (routeName === "MoreScreen") {
          if (Platform.OS === "ios"){
            iconName = `ios-more${focused ? "" : "-outline"}`;
          }else{
            iconName = `md-more`;
          }
        }
        return <Ionicons name={iconName} size={27} color={"#ffff"} />;
      }
    }),
    tabBarOptions: {
      showIcon: true
    },
    barStyle: { backgroundColor: "#33ADFF" },
    animationEnabled: true,
    initialRouteName: "MapList"
  }
);
