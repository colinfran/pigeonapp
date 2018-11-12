import React from "react";
import {StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, RefreshControl} from "react-native";
import {RecyclerListView, DataProvider, LayoutProvider} from "recyclerlistview";
import {SafeAreaView} from 'react-native';
import Modal from "react-native-modal";
import AdminInfoModal from "../../AdminInfoModal";

//https://github.com/Flipkart/recyclerlistview#guides


var data = [
  {
    title: "Rediculously Huge Fire in Rohnert Park",
    description: "description1",
    type: "fire",
    coordinates: { latitude: 38.364239, longitude: -122.72249 },
    key: "1ab",
    town: "",
    county: "",
    upVotes: 5,
    downVotes: 3,
    voteSelected: "",
		numComments: 4,
		commentData:[
			{id:1, name:"Frank", comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", time:"9:58 am"},
			{id:2, name:"John", comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", time:"9:58 am" },
			{id:3, name:"Bob", comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", time:"9:58 am" },
			{id:4, name:"Joe", comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", time:"9:58 am" },
		],
  },
  {
    title: "Flooding in Rohnert Park Waterways",
    description: "description2",
    type: "flood",
    coordinates: { latitude: 38.346909, longitude: -122.675305 },
    key: "2ab",
    town: "",
    county: "",
    upVotes: 3,
    downVotes: 1,
    voteSelected: "up",
		numComments: 2,
		commentData:[
			{id:1, name:"Billy",    comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", time:"9:58 am"},
			{id:2, name:"Carl",     comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", time:"9:58 am"},
		],
  },
  {
    title: "House Fire in San Francisco",
    description: "description3",
    type: "fire",
    coordinates: { latitude: 37.798319, longitude: -122.417713 },
    key: "3as",
    town: "",
    county: "",
    upVotes: 4,
    downVotes: 2,
    voteSelected: "down",
		numComments: 0,
		commentData:[
		],
  },
  {
    title: "Physically Impossible Flood in San Francisco",
    description: "description4",
    type: "flood",
    coordinates: { latitude: 37.792986, longitude: -122.421484 },
    key: "4b",
    town: "",
    county: "",
    upVotes: 1,
    downVotes: 5,
    voteSelected: "",
		numComments: 3,
		commentData:[
			{id:1, name:"Kevin",    comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", time:"9:58 am"},
			{id:2, name:"Jaycob",     comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", time:"9:58 am"},
			{id:3, name:"Bill", comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", time:"9:58 am"},
		],
  },
  {
    title: "Apartment Fire in San Francisco",
    description: "description5",
    type: "fire",
    coordinates: { latitude: 37.765151, longitude: -122.429141 },
    key: "5ab",
    town: "",
    county: "",
    upVotes: 1,
    downVotes: 3,
    voteSelected: "down",
		numComments: 5,
		commentData:[
			{id:1, name:"Edward",    comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", time:"9:58 am"},
			{id:2, name:"Joe",     comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", time:"9:58 am"},
			{id:3, name:"Pete", comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", time:"9:58 am"},
			{id:4, name:"Steve", comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", time:"9:58 am" },
			{id:5, name:"Jill", comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", time:"9:58 am" },

		],
  },
  {
    title: "Small Flood in San Francisco",
    description: "description6",
    type: "flood",
    coordinates: { latitude: 37.774211, longitude: -122.401443 },
    key: "6a23",
    town: "",
    county: "",
    upVotes: 2,
    downVotes: 1,
    voteSelected: "up",
		numComments: 6,
		commentData:[
			{id:1, name:"Frank",    comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", time:"9:58 am"},
			{id:2, name:"John",     comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", time:"9:58 am"},
			{id:3, name:"Bob", comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", time:"9:58 am"},
			{id:4, name:"Bob", comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", time:"9:58 am" },
			{id:5, name:"Bob", comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", time:"9:58 am" },
			{id:6, name:"Bob", comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", time:"9:58 am" },

		],

  }
];


const markerImages = {
    flood: require('../../../assets/flood/60.png'),
    fire: require('../../../assets/fire/60.png'),
};

// RECYCLERVIEW CODE
const ViewTypes = {
  FULL: 0
};

export default class NewPosts extends React.Component {

  static navigationOptions = {
    title: "New Posts",
    headerStyle: {
      backgroundColor: "#33ADFF"
    },
    headerTintColor: "#fff"
  };


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
      dataProvider: dataProvider.cloneWithRows(data),
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

      refreshing: false,

    };
    this._onRefresh = this._onRefresh.bind(this)


  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    setTimeout(function () {
      this.setState({ refreshing: false });
    }.bind(this), 3000);

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
                source={require('../../../assets/more.png')}
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
          <AdminInfoModal
            toggle={this._toggleModal}
            dataClick={this.state.selectedMarker}
          />
        </Modal>
        <RecyclerListView
          style={{flex: 1}}
          layoutProvider={this._layoutProvider}
          dataProvider={this.state.dataProvider}
          rowRenderer={this._rowRenderer}
          refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />}
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
