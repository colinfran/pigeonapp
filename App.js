import React from "react";

// premade components
import { View, Text, Button } from "react-native"; // built-in components
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs"; //https://reactnavigation.org/docs/en/material-bottom-tab-navigator.html
import Ionicons from "react-native-vector-icons/Ionicons"; //https://ionicons.com/

// our handmade components
import MapScreen from "./components/MapScreen";
import ListScreen from "./components/ListScreen";
import ProfileScreen from "./components/ProfileScreen";
import MoreScreen from "./components/MoreScreen";

//navbar with 4 different screens
export default createMaterialBottomTabNavigator(
  {
    MapScreen: { screen: MapScreen },
    ListScreen: { screen: ListScreen },
    ProfileScreen: { screen: ProfileScreen },
    MoreScreen: { screen: MoreScreen }
  },
  {
    // set icon svg & icon style if focused
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "MapScreen") {
          iconName = `ios-map${focused ? "" : "-outline"}`;
        } else if (routeName === "ListScreen") {
          iconName = `ios-list${focused ? "" : "-outline"}`;
        } else if (routeName === "ProfileScreen") {
          iconName = `ios-contact${focused ? "" : "-outline"}`;
        } else if (routeName === "MoreScreen") {
          iconName = `ios-more${focused ? "" : "-outline"}`;
        }
        return <Ionicons name={iconName} size={27} color={"#ffff"} />;
      }
    }),
    tabBarOptions: {
      showIcon: true
    },
    barStyle: { backgroundColor: "#33ADFF" },
    animationEnabled: true,
    initialRouteName: "MapScreen"
  }
);
