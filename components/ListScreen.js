import React from "react";
import {StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, RefreshControl, ListView} from "react-native";
import {RecyclerListView, DataProvider, LayoutProvider} from "recyclerlistview";
import {SafeAreaView} from 'react-native';
import Modal from "react-native-modal";
import InfoModal from "./InfoModal";
import * as firebase from 'firebase';

import Geofence from 'react-native-expo-geofence';


//https://github.com/Flipkart/recyclerlistview#guides

const markerImages = {
    flood: require('../assets/flood/60.png'),
    fire: require('../assets/fire/60.png'),
    landslide: require('../assets/landslide/60.png'),
    other: require('../assets/alert/60.png'),
};


const list = []

export default class ListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

    this.state = {
      dataSource: this.ds.cloneWithRows(list),
      isModalVisible: false,
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
      admin: false,
      userId: null,

    };

    this.itemsRef = firebase.database().ref('/posts');
    this.renderItem = this.renderItem.bind(this)
  }

  setItemsFromFirebase(itemsRef) {
   itemsRef.on('value', (snapshot) => {

     // get children as an array
     var items = [];
     for(var key in snapshot.val()){
				var dataOb = snapshot.val()[key];
        if ((typeof dataOb === 'object'))
          items.push( dataOb );
    }


     this.setState({
       dataSource: this.ds.cloneWithRows(items)
     });

   });
 }

 componentDidMount() {
   this.setItemsFromFirebase(this.itemsRef);
 }

 capitalize(str) {
   return str.charAt(0).toUpperCase() + str.slice(1);
 }

 renderItem(item) {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this._selectedInfo(item)}
        key={item.id}
        >
          <View style={{flexDirection: "row"}}>
            <View style={{width: 100, height: 100,justifyContent: 'center', alignItems: 'center', paddingLeft:20}}>
              <Image source={markerImages[item.type]}/>
            </View>
            <View style={{flex: 1, justifyContent: 'center', paddingLeft:20, }}>
              <Text style={{fontSize:16,width:'98%'}}>{item.title}</Text>
              <Text>Type: {this.capitalize(item.type)}</Text>

              <Text>Lat: {item.postRegion.latitude}</Text>
              <Text>Long: {item.postRegion.longitude}</Text>



            </View>
            <View style={{right: 25, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={require('../assets/more.png')}
                style={{width: 35, height: 35}}
              />
            </View>
          </View>
    </TouchableOpacity>
    // <TouchableOpacity  delayLongPress={900}>
    //   <View style={styles.container}>
    //     <Text style={styles.listItem}>{item.title}</Text>
    //   </View>
    // </TouchableOpacity>
    )
  }

  render() {
    return(

      <View style={{flex:1}}>
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
        <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderItem} />
      </View>
      )
  }



  _toggleModal = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
    });
    console.log("Toggle: " + this.state.isModalVisible);
  };

  _selectedInfo = (data) => {
    this.setState({
      selectedMarker: data
    });
    this._toggleModal();
  };

  //Given type and data return the view component



}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    flex: 1,
    backgroundColor: "white",
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da'
  }
});
