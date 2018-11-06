import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button
} from "react-native";
import { MapView } from "expo";
import Modal from "react-native-modal";
import InfoModal from "./InfoModal";
import Icon from "@expo/vector-icons";
import Geocoder from 'react-native-geocoding';


Geocoder.init('AIzaSyDX-kRrpL4QR1x4L_NwpoV8HxK0ITx0wSQ'); // use a valid API key


// https://github.com/react-community/react-native-maps
const markerImages = {
  flood: require("../assets/flood/20.png"),
  fire: require("../assets/fire/20.png")
};

var data = [
  {
    title: "hello1",
    description: "description1",
    type: "fire",
    coordinates: { latitude: 38.364239, longitude: -122.72249 },
    key: "1ab",
    town: "",
    county: ""
  },
  {
    title: "hello2",
    description: "description2",
    type: "flood",
    coordinates: { latitude: 38.346909, longitude: -122.675305 },
    key: "2ab",
    town: "",
    county: ""
  },
  {
    title: "hello3",
    description: "description3",
    type: "fire",
    coordinates: { latitude: 37.798319, longitude: -122.417713 },
    key: "3as",
    town: "",
    county: ""
  },
  {
    title: "hello4",
    description: "description4",
    type: "flood",
    coordinates: { latitude: 37.792986, longitude: -122.421484 },
    key: "4b",
    town: "",
    county: ""
  },
  {
    title: "hello5",
    description: "description5",
    type: "fire",
    coordinates: { latitude: 37.765151, longitude: -122.429141 },
    key: "5ab",
    town: "",
    county: ""
  },
  {
    title: "hello6",
    description: "description6",
    type: "flood",
    coordinates: { latitude: 37.774211, longitude: -122.401443 },
    key: "6a23",
    town: "",
    county: ""
  }
];

var selectedData = [];

const defaultRegion = {
  latitude: 37.809489,
  longitude: -122.476551,
  latitudeDelta: 0.003,
  longitudeDelta: 0.003
};

export var geocode = (data) => {
  Geocoder.from(data.coordinates.latitude, data.coordinates.longitude)
        .then(json => {
          var townComponent = json.results[0].address_components[2].long_name;
          var countyComponent = json.results[0].address_components[3].long_name;
          data.town = townComponent;
          data.county = countyComponent;

        })
        .catch(error => console.warn(error));
};


export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      e => reject(e)
    );
  });
};

export default class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: data,
      isModalVisible: false,
      region: defaultRegion,
      selectedMarker: {
        title: "",
        description: "",
        type: "fire",
        coordinates: {
          latitude: 0,
          longitude: 0
        },
        key: ""
      }
    };
  }

  addGeocoding(data){
    for (var i = 0; i < data.length; i++){
      geocode(data[i]);
    }
  }

  componentDidMount() {
    this.addGeocoding(this.state.markers);
    return getCurrentLocation().then(position => {
      if (position) {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }
        });
      }
    });
  }


  _toggleModal = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
      selectedMarker: selectedData
    });
  };

  _selectedInfo = () => {
    this._toggleModal();
    console.log(
      "User has selected new marker: --> " + JSON.stringify(selectedData)
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          region={{
            latitude: this.state.region.latitude,
            longitude: this.state.region.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          showsUserLocation={true}
        >
          {this.state.markers.map(marker => (
            <MapView.Marker
              key={marker.key}
              coordinate={marker.coordinates}
              onCalloutPress={this._selectedInfo}
              onPress={() => {
                selectedData = marker;
              }}
            >
              <Image source={markerImages[marker.type]} />
              <MapView.Callout style={{ width: 175 }}>
                <View style={{marginBottom:5, borderWidth: 0.5,borderColor: "black", paddingBottom:3}}>
                  <Text style={{ fontSize: 20, textAlign:'center'}}>{marker.title}</Text>
                  <Text style={{ fontSize: 16, textAlign:'center'}}>{marker.type}</Text>
                  <Text style={{ fontSize: 12, textAlign:'center' }}>{marker.town}, {marker.county}</Text>
                </View>
                <View style={styles.opencloseContainer}>
                  <Button title="View" />
                </View>
              </MapView.Callout>
            </MapView.Marker>
          ))}
        </MapView>
        <Modal
          isVisible={this.state.isModalVisible}
          onBackdropPress={() =>
            this.setState({ isModalVisible: !this.state.isModalVisible })
          }
          style={{ alignItems: "center" }}
          hideModalContentWhileAnimating={true}
        >
          <InfoModal
            toggle={this._toggleModal}
            dataClick={this.state.selectedMarker}
          />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  opencloseContainer: {
    borderWidth: 0.5,
    borderColor: "black"
  }
});
