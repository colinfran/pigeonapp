import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button, Image } from "react-native";
import { MapView } from "expo";
import Modal from "react-native-modal";
import InfoModal from "./InfoModal";

// https://github.com/react-community/react-native-maps
const markerImages = {
    flood: require('../assets/flood.png'),
    fire: require('../assets/fire.png'),
};

var data=[{title:"hello1",description:"description1",type: "fire", coordinates:{latitude:38.364239,longitude:-122.72249},key:"1ab"},
          {title:"hello2",description:"description2",type: "flood", coordinates:{latitude:38.346909,longitude:-122.675305},key:"2ab"},
          {title:"hello3",description:"description3",type: "fire", coordinates:{latitude:37.798319,longitude:-122.417713},key:"3as"},
          {title:"hello4",description:"description4",type: "flood",coordinates:{latitude:37.792986,longitude:-122.421484},key:"4b"},
          {title:"hello5",description:"description5",type: "fire", coordinates:{latitude:37.765151,longitude:-122.429141},key:"5ab"},
          {title:"hello6",description:"description6",type: "flood", coordinates:{latitude:37.774211,longitude:-122.401443},key:"6a23"}];

var selectedData = [];

const defaultRegion = {
  latitude: 37.809489,
  longitude: -122.476551,
  latitudeDelta: 0.003,
  longitudeDelta: 0.003,
}

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(position => resolve(position), e => reject(e));
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
        title:"",
        description:"",
        type: "fire",
        coordinates:{
          latitude:0,
          longitude:0
        },
        key:""
      }
    }

  }
  componentDidMount() {
    return getCurrentLocation().then(position => {
      if (position) {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          },
        });
      }
    });
  }

  _toggleModal = () =>{
    this.setState({
      isModalVisible: !this.state.isModalVisible ,
      selectedMarker: selectedData
    });
  }

  _selectedInfo = () =>{
    this._toggleModal();
    console.log("User has selected new marker: --> " + JSON.stringify(selectedData));
  }


  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
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
            onPress= {
              () => {
                selectedData = marker;
              }
            }
          >
          <Image source={markerImages[marker.type]}/>
            <MapView.Callout style={{width:100}}>
                <Text>Type: {marker.type}</Text>
                <Text>Title: {marker.title}</Text>
            </MapView.Callout>
        </MapView.Marker>
        ))}
      </MapView>
      <Modal
        isVisible={this.state.isModalVisible}
        onBackdropPress={() => this.setState({ isModalVisible: !this.state.isModalVisible })}
        style={{alignItems:'center' }}
        hideModalContentWhileAnimating={true}
        >
        <InfoModal toggle={this._toggleModal} dataClick={this.state.selectedMarker}></InfoModal>

       </Modal>

    </View>
    );
  }
}
