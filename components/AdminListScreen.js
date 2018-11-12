import React from "react";
import {StyleSheet, Text, View, Dimensions, TouchableOpacity, Image} from "react-native";
import {RecyclerListView, DataProvider, LayoutProvider} from "recyclerlistview";
import {SafeAreaView} from 'react-native';
import Modal from "react-native-modal";
import InfoModal from "./InfoModal";

//https://github.com/Flipkart/recyclerlistview#guides

const markerImages = {
    flood: require('../assets/flood/60.png'),
    fire: require('../assets/fire/60.png'),
};

// RECYCLERVIEW CODE
const ViewTypes = {
  FULL: 0
};

export default class ListScreen extends React.Component {
  constructor(args) {
    super(args);

    // If you do not understand how the module 'recyclerlistview' works,
    // please do not touch the layoutProvider, rowRenderer, or dataProvider
    let {width} = Dimensions.get("window");
    let dataProvider = new DataProvider((r1, r2) => {
      return r1 !== r2;
    });
    this._layoutProvider = new LayoutProvider(index => {
      return ViewTypes.FULL;
    }, (type, dim) => {
      dim.width = width;
      dim.height = 100;
    });
    this._rowRenderer = this._rowRenderer.bind(this);
    this.state = {
      dataProvider: dataProvider.cloneWithRows(this.props.data),
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
      admin: false
    };
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

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  //Given type and data return the view component
  _rowRenderer(type, data) {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this._selectedInfo(data)}
        >
          <View style={{flexDirection: "row"}}>
            <View style={{width: 100, height: 100,justifyContent: 'center', alignItems: 'center', paddingLeft:20}}>
              <Image source={markerImages[data.type]}/>
            </View>
            <View style={{flex: 1, justifyContent: 'center', paddingLeft:30}}>
              <Text style={{fontSize:16}}>{data.title}</Text>
              <Text>Type: {this.capitalize(data.type)}</Text>
              <Text>Lat: {data.coordinates.latitude}</Text>
              <Text>Long: {data.coordinates.longitude}</Text>
            </View>
            <View style={{right: 25, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={require('../assets/more.png')}
                style={{width: 35, height: 35}}
              />
            </View>
          </View>
    </TouchableOpacity>)
  }

  render() {
    return (
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
        <RecyclerListView
          style={{flex: 1}}
          layoutProvider={this._layoutProvider}
          dataProvider={this.state.dataProvider}
          rowRenderer={this._rowRenderer}
        />
      </View>
    );
  }
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
