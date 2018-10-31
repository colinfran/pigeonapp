import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button, Dimensions } from "react-native";
import Modal from "react-native-modal";

var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

export default class InfoModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return(
      <View style={{width: deviceWidth-(deviceWidth/4), height: deviceHeight-(deviceHeight/4), backgroundColor: '#FFF'}}>
        <View style={{flex:1}}>
           <Text>{this.props.dataClick.title}</Text>
           <Text>{this.props.dataClick.description}</Text>
           <Text>Lat: {this.props.dataClick.coordinates.latitude}</Text>
           <Text>Long: {this.props.dataClick.coordinates.longitude}</Text>

           <Button onPress={this.props.toggle}
             title="Close"
             >
           </Button>
       </View>
      </View>
    )
  }
}
