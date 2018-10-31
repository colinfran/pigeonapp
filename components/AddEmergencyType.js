import React from "react";
import { TouchableOpacity,TouchableHighlight, TextInput, Image, StyleSheet, Text, View, Dimensions, ListView, FlatList, Platform, StatusBar, ScrollView, Button } from "react-native";
import { SafeAreaView } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import Grid from 'react-native-grid-component';

var data=[
  {title:"Fire",description:"description1",type: "fire", icon:require("../assets/fire.png"), colors: "red", status:false},
  {title:"Flood",description:"description2",type: "flood", icon:require("../assets/flood.png"), colors: "green", status:false},
  {title:"Tornado",description:"description3",type: "tornado", icon: require("../assets/tornado.png"), colors: "yellow", status:false},
  {title:"Hurricane",description:"description4",type: "hurricane", icon: require("../assets/alert.png"), colors: "orange", status:false},
  {title:"Earthquake",description:"description5",type: "earthquake", icon: require("../assets/alert.png"), colors: "lightblue", status:false},
  {title:"Other",description:"description6",type: "other", icon: require("../assets/alert.png"), colors: "lightgreen", status:false}
]

export default class AddEmergencyType extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      imageL: 1000000,
      imageT: 1000000,
      fireVisible: true,
      floodVisible: false,
      tornadoVisible: false,
      otherVisible: false,
      dataVar: data,
      selected: "",
      description: ""
    }
  }

  setSelected(type){
    this.setState({ selected: type });
    if (type == "fire"){
      this.setState({ fireVisible: true, floodVisible: false, tornadoVisible: false, otherVisible: false  });
    }
    else if (type == "flood"){
      this.setState({ fireVisible: false, floodVisible: true, tornadoVisible: false, otherVisible: false  });
    }
    else if (type == "tornado"){
      this.setState({ fireVisible: false, floodVisible: false, tornadoVisible: true, otherVisible: false });
    }
    else if (type == "other"){
      this.setState({ fireVisible: false, floodVisible: false, tornadoVisible: false, otherVisible: true });
    }
    console.log("Selected "+ type);
    this.props.navigation.navigate("second", { type: type} );
  }

  _functionTest(type){
    if (this.state.selected=="fire"){
      console.log("Hitting fire");
      return <Image style={{width:35 ,height: 35}} source={require("../assets/selected.png")}/>;
    }
    if (this.state.selected=="flood"){
      console.log("Hitting flood");
      return <Image style={{width:35 ,height: 35}} source={require("../assets/selected.png")}/>;
    }
    if (this.state.selected=="tornado"){
      console.log("Hitting tornado");
      return <Image style={{width:35 ,height: 35}} source={require("../assets/selected.png")}/>;
    }
    if (this.state.selected=="other"){
      console.log("Hitting other");
      return <Image style={{width:35 ,height: 35}} source={require("../assets/selected.png")}/>;
    }
    console.log("Hitting Null");
    return null;
  }
  _renderItem = (data, i) => (
    <TouchableOpacity style={[{ backgroundColor: data.colors, borderRadius:10 }, styles.item]} key={i} onPress={() => this.setSelected(data.type)} dataTest={data.type}>
      <View style={{flex: 0, flexDirection: 'column',alignContent:'center', postion:'absolute',left:10, top:10, width: 100,height: 100}}>
        <View style={{flex: 0, flexDirection: 'row'}}>
          <Image
            style={{width: 35,height: 35}}
            source={data.icon}
            />
            <View style={{flex: 0, flexDirection: 'column'}}>
              <Text style={{alignContent: 'center',fontWeight: 'bold'}}>{data.title}</Text>
              <Text style={{fontSize: 12, alignContent: 'center',}}>{data.description}</Text>
            </View>
            <View style={{flex:1}}>
              {this._functionTest(data.type)}
            </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  _renderPlaceholder = i => <View style={styles.item} key={i} />;

  render() {
    return (
        <View style={{flex:1, flexDirection:'column'}}>
          <Grid
          scrollEnabled={false}
            style={styles.list}
            renderItem={this._renderItem}
            renderPlaceholder={this._renderPlaceholder}
            data={this.state.dataVar}
            itemsPerRow={2}>
          </Grid>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    flex: 1,
    height: 180,
    margin: 10
  },
  list: {
    flex: 1
  }
});
