import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MapView } from "expo";

// https://github.com/react-community/react-native-maps
export default class MapScreen extends React.Component {

  render() {
    return (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        />
    );
  }
}
