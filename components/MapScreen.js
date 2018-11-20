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
import { Constants, Location, Permissions } from 'expo';
import * as firebase from 'firebase';


// https://github.com/react-community/react-native-maps
const markerImages = {
  flood: require("../assets/flood/60.png"),
  fire: require("../assets/fire/60.png"),
  landslide: require("../assets/landslide/60.png"),
  other: require("../assets/alert/60.png")
};


var selectedData = [];

// data is located in /Views/LoggedIn/MapListView/index.js


export default class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: this.props.data,
      isModalVisible: false,
      region: this.props.defaultRegion,
      selectedMarker: {
        title: "",
        description: "",
        type: "fire",
        coordinates: {
          latitude: 0,
          longitude: 0
        },
        key: ""
      },
      errorMessage: null,
      userlocation: {
        latitude: 0,
        longitude: 0
      }

    };
    this.itemsRef = firebase.database().ref('/posts');
    this._renderCircles = this._renderCircles.bind(this);

  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    // console.log(JSON.stringify(location));
    this.setState({ region:{ latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.1,
    longitudeDelta: 0.1} });
  };


  componentDidMount() {
    // this.itemsRef.on('value', (snapshot) => {
    //   // get children as an array
    //   var items = [];
    //   for(var key in snapshot.val()){
 		// 		var dataOb = snapshot.val()[key];
    //     console.log(dataOb);
    //      if ((typeof dataOb === 'object'))
    //        items.push( dataOb );
    //  }
    //  console.log(items);
    //   this.setState({
    //     markers: items
    //   });
    //
    // // });

  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }


  _toggleModal = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
    });
  };

  _selectedInfo = (marker) => {
    this.setState({selectedMarker: marker});

    // this._toggleModal();
    console.log(
      "User has selected new marker: --> " + JSON.stringify(this.state.selectedMarker)
    );
  };

  _drawCircle(){
    return(
      <MapView.Circle
      center={data.coordinates}
      radius={20}
      strokeWidth={2}
      strokeColor="#3399ff"
      fillColor="#80bfff"
    />
    );
  }

  _renderCircles(data){
      return(
        <MapView.Circle
        center={data.coordinates}
        radius={20}
        strokeWidth={2}
        strokeColor="#3399ff"
        fillColor="#80bfff"
      />
      );
  }


  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }




  render() {
    let text = 'Waiting..';
    if (this.state.errorMessage) {
      console.log( this.state.errorMessage);
    } else if (this.state.location) {
      console.log( JSON.stringify(this.state.location));
    }
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          region={{
            latitude: this.state.region.latitude,
            longitude: this.state.region.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
          }}
          initialRegion={this.state.userlocation}
          userLocationAnnotationTitle={""}
          showsUserLocation={true}
        >
          {this.state.markers.map(marker => (



            <MapView.Marker
              key={marker.key}
              coordinate={marker.postRegion}
              onCalloutPress={() => {this._selectedInfo(marker);this._toggleModal()}}
              onPress={() => {
                this.setState({selectedMarker: marker, region: marker.postRegion});
              }}
              image={markerImages[marker.type]}
            >

              <MapView.Callout style={{ width: 175}}>
                <View style={{borderBottomWidth: 0.8,borderColor: "lightgrey",padding:10, marginLeft:-15, marginRight:-15}}>
                  <Text style={{ fontSize: 16, textAlign:'center'}}>{marker.title}</Text>
                  <Text style={{ fontSize: 14, textAlign:'center'}}>~{this.capitalize(marker.type)}~</Text>
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
    borderBottomWidth:0.8,
    borderColor: "lightgrey",
    borderTopWidth:0,
    marginLeft:-15,
    marginRight:-15
  }
});
