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
  KeyboardAvoidingView,
  Picker,
  Constants,
  Alert
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
import { Dropdown } from 'react-native-material-dropdown';


export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      e => reject(e)
    );
  });
};

export default class AddEmergencyMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      direction: '',
      units: '',
      distance: 0,
      region: {
        latitude: 37.809489,
        longitude: -122.476551,
        latitudeDelta: 0.3,
        longitudeDelta: 0.3
      },
      type: this.props.navigation.state.params.type,
      description: this.props.navigation.state.params.description,
      title: this.props.navigation.state.params.title,
      maxLength: 500,


      pressCoordinates: {
        latitude: 37.809489,
        longitude: -122.476551,
        latitudeDelta: 0.3,
        longitudeDelta: 0.3
      },

    };
    this.setDirection = this.setDirection.bind(this);
    this.setDistance = this.setDistance.bind(this);
    this.setUnits = this.setUnits.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  setDirection(text) {
    this.setState({direction: text});
  }

  setDistance(text) {
    this.setState({distance: text});
  }

  setUnits(text) {
    this.setState({units: text});
  }

  onSubmit(){
    Alert.alert(
     'Are you sure this is the correct location of the emergency?',
     'Please pick an option',
     [
       {text: 'No', onPress: () => console.warn('NO Pressed'), style: 'cancel'},
       {text: 'Yes', onPress: () => this.props.navigation.navigate("fifth" ,{ type: this.state.type, title: this.state.title, description: this.state.description, pressCoordinates: this.state.pressCoordinates })},
     ]
   );
    // console.log(JSON.stringify(this.state.pressCoordinates));



  }

  static navigationOptions = {
    title: "Add Location Info",
    headerStyle: {
      backgroundColor: "#33ADFF"
    },
    headerTintColor: "#fff"
  };

  componentDidMount() {
    return getCurrentLocation().then(position => {
      this.setState({
        region: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.3,
          longitudeDelta: 0.3
        },
        pressCoordinates:  {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
      });
    });
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // onPoiClick(e) {
  //   const poi = e.nativeEvent;
  //   this.setState({poi});
  // }

  render() {
    let direction = [{ value: 'North', }, { value: 'South', }, { value: 'East', }, { value: 'West', }, { value: 'North-West', }, { value: 'North-East', }, { value: 'South-West', }, { value: 'South-East', }];
    let units = [{ value: 'Feet', }, { value: 'Yard(s)', }, { value: 'Meter(s)', }, { value: 'Mile(s)', }];
    let numbers = [{ value: 1, }, { value: 5, }, { value: 10, }, { value: 20, }, { value: 30, }, { value: 40, }, { value: 50, }, { value: 100, }];

    return (
      <KeyboardAvoidingView
        style={{flex:1}}
        behavior="padding"
        >
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
              {this.capitalize(this.props.navigation.state.params.type)}
            </Text>
          </View>
          <View style={{ flex: 1, flexDirection: "column", padding: 15 }}>
            <Text style={{ textAlign: "center", paddingTop: 10 }}>
              Using your location to
            </Text>
            <Text style={{ textAlign: "center", paddingBottom:10}}>
              determine the emergencies location:
            </Text>
            <View style={{ flex: 1, paddingBottom: 25 }}>
              <MapView
                showsUserLocation={true}
                style={{flex:1, height: 250 }}
                region={{
                  latitude: this.state.region.latitude,
                  longitude: this.state.region.longitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005
                }}
                userLocationAnnotationTitle={""}
                showsUserLocation={true}
                pitchEnabled={false}
                rotateEnabled={false}
                scrollEnabled={false}
                zoomEnabled={false}
                onPress={(e) => this.setState({ pressCoordinates: e.nativeEvent.coordinate})}
                >

                <MapView.Marker coordinate={this.state.pressCoordinates} />
              </MapView>
            </View>

            <Text>Press anywhere on the map to set the exact location of this emergency.</Text>
            <Button
              style={{ paddingTop: 10 }}
              title="Continue"
              onPress={this.onSubmit}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    );
  }
}


AddEmergencyMap.propTypes = {
  provider: MapView.ProviderPropType,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },

});
