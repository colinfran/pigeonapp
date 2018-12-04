import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
  Platform
} from "react-native";
import { MapView } from "expo";
import Modal from "react-native-modal";
import InfoModal from "./InfoModal";
import Icon from "@expo/vector-icons";
import { Constants, Location, Permissions } from 'expo';
import * as firebase from 'firebase';
import renderIf from "../assets/renderIf";
import getPostsInUserLocation from "../assets/geofence";
import SplashScreen from "./SplashScreen";
import { Ionicons } from '@expo/vector-icons';

import Geofence from 'react-native-expo-geofence';


// https://github.com/react-community/react-native-maps
const markerImages = {
  flood: require("../assets/flood/60.png"),
  fire: require("../assets/fire/60.png"),
  landslide: require("../assets/landslide/60.png"),
  other: require("../assets/alert/60.png")
};


var selectedData = [];

// data is located in /Views/LoggedIn/MapListView/index.js
var location;

export default class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forceRefresh: false,
      loaded:false,
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
    this.renderBtn = this.renderBtn.bind(this);

    this.forceRefreshFunc = this.forceRefreshFunc.bind(this);


  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    location = await Location.getCurrentPositionAsync({});

    // console.log(JSON.stringify(location));
    this.setState({ region:{ latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.1,
    longitudeDelta: 0.1} });

    // var newMarker = Geofence.filterByProximity(location.coords, this.state.markers, 10000);
    // this.setState({marker:newMarker});


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

    var that = this;
    var dataObjectParent = [];
    var postsRef = firebase.database().ref('/posts');
    postsRef.on('value', function(snapshot) {
      var val = (snapshot.val());
      var i = 0;
      // snapshot.val() is the dictionary with all your keys/values from the '/store' path
      for(var key in snapshot.val()){
        // var item = childSnapshot.val();
        // item.key = childSnapshot.key;

          var dataOb = snapshot.val()[key];
          dataObjectParent.push( dataOb);
          console.log(JSON.stringify(dataOb));
          // console.log(JSON.stringify(dataOb));

      }
      // console.log(JSON.stringify(dataObjectParent));
      that.setState(
        {
            markers: dataObjectParent
        },
        function() {
          // console.log(this.state.markers);
          // this.addGeocoding(this.state.markers);
        }
       )
    })

  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }

    var that = this;
    var dataObjectParent = [];
    var postsRef = firebase.database().ref('/posts');
    postsRef.on('value', function(snapshot) {
      var val = (snapshot.val());
      var i = 0;
      // snapshot.val() is the dictionary with all your keys/values from the '/store' path
      for(var key in snapshot.val()){
        // var item = childSnapshot.val();
        // item.key = childSnapshot.key;

          var dataOb = snapshot.val()[key];
          dataObjectParent.push( dataOb);
          // console.log(JSON.stringify(dataOb));

      }
      // console.log(JSON.stringify(dataObjectParent));
      that.setState(
        {
            markers: dataObjectParent
        },
        function() {
          // console.log(this.state.markers);
          // this.addGeocoding(this.state.markers);
        }
       )
    })
    setTimeout(function() { //Start the timer
      this.setState({loaded: true});
    }.bind(this), 2000)
  }



  _toggleModal = () => {
    if (this.state.isModalVisible){

      this.setState({selectedMarker: null});
    }
      // this.forceRefreshFunc();
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


  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  onMapReady = (e) => {
  if(!this.state.loaded) {
    this.setState({loaded: true});
    }
  };


  forceRefreshFunc (){
    console.log("Force refresh")
    var that = this;
    var dataObjectParent = [];
    var postsRef = firebase.database().ref('/posts');
    postsRef.on('value', function(snapshot) {
      var val = (snapshot.val() && snapshot.val());
      var i = 0;
      // snapshot.val() is the dictionary with all your keys/values from the '/store' path
      for(var key in snapshot.val()){
        // var item = childSnapshot.val();
        // item.key = childSnapshot.key;

          var dataOb = snapshot.val()[key];
          dataObjectParent.push( dataOb);
          // console.log(JSON.stringify(dataOb));

      }
      // console.log(JSON.stringify(dataObjectParent));
      that.setState(
        {
            markers: dataObjectParent
        },
        function() {
          // console.log(this.state.markers);
          // this.addGeocoding(this.state.markers);
        }
       )
    })
    this.setState({
      forceRefresh: !this.state.forceRefresh,
    });
  }


  renderBtn(){

    return (
      <TouchableOpacity style={{}}
        onPress={() => this.setState({ region:{ latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.1,
            longitudeDelta: 0.1} })}
        >
        <Image
          style={{position: 'absolute', right: 10, top: 10}}
          resizeMethod="resize"
          source={require("../assets/locate.png")}
          />
      </TouchableOpacity>
    );
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
        {renderIf(!this.state.loaded,
          <SplashScreen/>
        )}
      {renderIf(this.state.loaded,
        <View style={{ flex: 1 }}>
        <MapView
          key={this.state.forceRefresh}
          style={{ flex: 1 }}
          region={{
            latitude: this.state.region.latitude,
            longitude: this.state.region.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
          }}
          initialRegion={this.state.userlocation}
          userLocationAnnotationTitle={""}
          showsMyLocationButton={true}
          showsUserLocation={true}
          onMapReady={this.onMapReady}
        >

          {this.state.markers.map(marker => (



            <MapView.Marker
              key={marker.key}
              coordinate={marker.postRegion}
              onPress={() => {this._selectedInfo(marker);
                this.setState({selectedMarker: marker, region: marker.postRegion});
                this._toggleModal()
              }}
              image={markerImages[marker.type]}
            >

            </MapView.Marker>
          ))}

        </MapView>

        </View>

      )}
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
  },

});
