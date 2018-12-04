import React from "react";
import { TouchableOpacity,TouchableHighlight, TextInput, Image, StyleSheet, Text, View, Dimensions, ListView, FlatList, Platform, StatusBar, ScrollView, Button } from "react-native";
import { SafeAreaView } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import Grid from 'react-native-grid-component';
import { Constants, Location, Permissions } from 'expo';


var data=[
  {title:"Fire",description:"Small fire, house fire, forest fire, etc.",type: "fire", icon:require("../../assets/fire/72.png"), colors: "lightsalmon"},
  {title:"Flood",description:"Flash floods, intense rainfall, flooded areas, etc.",type: "flood", icon:require("../../assets/flood/72.png"), colors: "salmon"},
  {title:"Landslide",description:"Landslide, mudslide, avalanche, rockslide, etc.",type: "landslide", icon: require("../../assets/landslide/72.png"), colors: "salmon"},
  {title:"Other",description:"Any emergency that is not a selectable option.",type: "other", icon: require("../../assets/alert/72.png"), colors: "lightsalmon"}
]

export default class AddEmergencyType extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      dataVar: data,
      selected: "",
    }
  }

  static navigationOptions = {
    title: 'Select an Emergency',
    headerStyle: {
      backgroundColor: 'red',
    },
    headerTintColor: 'red',

  };


  setSelected(type){
    this.setState({ selected: type });
    this.props.navigation.navigate("third", { type: type} );
  }

  _renderItem = (data, i) => (
    <TouchableOpacity style={[{ backgroundColor: data.colors, borderRadius:10 }, styles.item]} key={i} onPress={() => this.setSelected(data.type)} dataTest={data.type}>
      <View style={{flex: 0, flexDirection: 'column',alignContent:'center', alignSelf:'center'}}>
        <View style={{flex: 0, flexDirection: 'column', paddingTop: 10}}>
          <Image
            style={{alignSelf:'center'}}
            source={data.icon}
            />
          <View style={{padding:10, flex: 0, flexDirection: 'column'}}>
              <Text style={{alignContent: 'center',fontWeight: 'bold'}}>{data.title}</Text>
              <Text style={{fontSize: 12, alignContent: 'center',}}>{data.description}</Text>
            </View>

        </View>
      </View>
    </TouchableOpacity>
  );

  render() {
    return (
        <View style={{flex:1, flexDirection:'column'}}>
          <View style={{flex:1, flexDirection:'row', paddingTop:25}}>
            <Grid
            scrollEnabled={false}
              style={{}}
              renderItem={this._renderItem}
              data={this.state.dataVar}
              itemsPerRow={2}>
            </Grid>
            </View>
            <View style={{padding: 20, paddingBottom:130}}>
              <Text style={{textAlign:'center'}}>Please choose one of the above buttons that represents the emergency you are posting about.</Text>
            </View>

        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    flex: 1,
    height: 150,
    margin: 10
  },
  list: {
    flex: 1
  }
});
