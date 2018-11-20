import React from "react";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableHighlight,
  TextInput,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ListView,
  FlatList,
  Platform,
  StatusBar,
  ScrollView
} from "react-native";
import { SafeAreaView, Keyboard } from "react-native";
import {
  FormLabel,
  FormInput,
  FormValidationMessage
} from "react-native-elements";
import Grid from "react-native-grid-component";
import { MapView } from "expo";
import { Button } from "react-native-elements";

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      e => reject(e)
    );
  });
};

export default class AddEmergencyInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.navigation.state.params.type,
      description: "",
      title: "",

      titleTextLength: 50,
      titleMaxLength: 50,

      descriptionTextLength: 500,
      descriptionMaxLength: 500
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.checkIfOther = this.checkIfOther.bind(this);

  }

  static navigationOptions = {
    title: "Add More Info",
    headerStyle: {
      backgroundColor: "#33ADFF"
    },
    headerTintColor: "#fff"
  };

  componentDidMount() {
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  onChangeDescriptionText(text) {
    this.setState({
      description: text,
      descriptionTextLength: this.state.descriptionMaxLength - text.length
    });
  }

  onChangeTitleText(text) {
    this.setState({
      title: text,
      titleTextLength: this.state.titleMaxLength - text.length
    });
  }


  onSubmit(){
    var titleFilledOut = (/\S/.test(this.state.title));
    var descriptionFilledOut = (/\S/.test(this.state.description));
    if (titleFilledOut && descriptionFilledOut){
      this.props.navigation.navigate("fourth", { type: this.props.navigation.state.params.type, description: this.state.description, title: this.state.title});
    }
    if (!titleFilledOut && !descriptionFilledOut)
      alert("Please give the post a title and description.")
    else{
      if (!titleFilledOut)
        alert("Please give the post a title.")
      if (!descriptionFilledOut)
        alert("Please give the post a description.")
      }
  }

  checkIfOther(){
    if (this.state.type == "other"){
        return (
          <Text style={{ textAlign: "center" }}>
            Please enter a description of the non-listed emergency:
          </Text>
        );
    }
    else{
      return(
        <Text style={{ textAlign: "center" }}>
          Please enter a description of the{" "}

          {this.state.type}
          :
        </Text>
      );
    }
  }


  render() {
    return (
      <TouchableWithoutFeedback
        style={{ flex: 1, flexDirection: "column" }}
        onPress={() => Keyboard.dismiss()}
      >
      <View style={{
        flex: 1}}>
        <View
          style={{
            flex: 0,
            textAlign: "center",
            alignItems: "center",
            paddingTop: 10
          }}
        >
          <Text style={{ fontSize: 30 }}>
            {this.capitalize(this.state.type)}
          </Text>
        </View>
        <View style={{ flex: 1, flexDirection: "column", padding: 15 }}>
          <View style={{ paddingBottom: 30 }}>
            <Text style={{ textAlign: "center" }}>
              Please enter a title for this post{" "}
              :
            </Text>
            <TextInput
              editable={true}
              descriptionMaxLength={50}
              style={styles.titleInput}
              onChangeText={this.onChangeTitleText.bind(this)}
              onSubmitEditing={() => { this.descriptionTextInput.focus(); }}

            />
            <Text style={{ fontSize: 10, color: "black", textAlign: "right" }}>
              {this.state.titleTextLength}/50
            </Text>
          </View>
          <View>
            {this.checkIfOther()}
            <TextInput
              editable={true}
              descriptionMaxLength={500}
              ref={(input) => { this.descriptionTextInput = input; }}
              style={styles.descriptionInput}
              onChangeText={this.onChangeDescriptionText.bind(this)}
              multiline={true}
            />
            <Text style={{ fontSize: 10, color: "black", textAlign: "right" }}>
              {this.state.descriptionTextLength}/500
            </Text>
          </View>

          <Button
            style={{ paddingTop: 10 }}
            title="Continue"
            onPress={this.onSubmit}
          />
        </View>
      </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  titleInput: {
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "white",
    height: 30,
    padding:5
  },
  descriptionInput: {
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "white",
    height: 100,
    padding:5
  }
});
