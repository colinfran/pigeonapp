import React from "react";
import {StyleSheet, Text, View, Dimensions, TouchableOpacity, Image} from "react-native";
import {RecyclerListView, DataProvider, LayoutProvider} from "recyclerlistview";
import {SafeAreaView} from 'react-native';

//https://github.com/Flipkart/recyclerlistview#guides

const markerImages = {
    flood: require('../assets/flood.png'),
    fire: require('../assets/fire.png'),
};

// RECYCLERVIEW CODE
const ViewTypes = {
  FULL: 0
};

var dataVar=[{title:"hello1",description:"description1",type: "fire", coordinates:{latitude:38.364239,longitude:-122.72249},key:"1ab"},
          {title:"hello2",description:"description2",type: "flood", coordinates:{latitude:38.346909,longitude:-122.675305},key:"2ab"},
          {title:"hello3",description:"description3",type: "fire", coordinates:{latitude:37.798319,longitude:-122.417713},key:"3as"},
          {title:"hello4",description:"description4",type: "flood",coordinates:{latitude:37.792986,longitude:-122.421484},key:"4b"},
          {title:"hello5",description:"description5",type: "fire", coordinates:{latitude:37.765151,longitude:-122.429141},key:"5ab"},
          {title:"hello6",description:"description6",type: "flood", coordinates:{latitude:37.774211,longitude:-122.401443},key:"6a23"}];



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
      dim.height = 140;
    });
    this._rowRenderer = this._rowRenderer.bind(this);
    this.state = {
      dataProvider: dataProvider.cloneWithRows(dataVar)
    };
  }

  //Given type and data return the view component
  _rowRenderer(type, data) {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          console.log(data);
          alert(JSON.stringify(data));
        }}>
          <View style={{flexDirection: "row"}}>
            <View style={{width: 100, height: 100,justifyContent: 'center', alignItems: 'center'}}>
              <Image source={markerImages[data.type]}/>
            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text>Type: {data.type}</Text>
              <Text>Title: {data.title}</Text>
              <Text>Description: {data.description}</Text>
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
      <RecyclerListView
        style={{flex: 1}}
        layoutProvider={this._layoutProvider}
        dataProvider={this.state.dataProvider}
        rowRenderer={this._rowRenderer}

      />);
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
