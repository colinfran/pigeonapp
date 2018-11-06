import React from "react";
import { TouchableOpacity,TouchableHighlight, TextInput, Image, StyleSheet, Text, View, Dimensions, ListView, FlatList, Platform, StatusBar, ScrollView, Button } from "react-native";
import { SafeAreaView } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import Grid from 'react-native-grid-component';
import { Constants, Location, Permissions } from 'expo';


var data=[
  {title:"Fire",description:"Description of types of fires or something.",type: "fire", icon:require("../../assets/fire/72.png"), colors: "red"},
  {title:"Flood",description:"Description of flood or something.",type: "flood", icon:require("../../assets/flood/72.png"), colors: "green"},
  {title:"Tornado",description:"Description of Tornado or something.",type: "tornado", icon: require("../../assets/tornado/72.png"), colors: "yellow"},
  {title:"Other",description:"Any emergency that is not a selectable option.",type: "other", icon: require("../../assets/alert/72.png"), colors: "lightgreen"}
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
      backgroundColor: '#33ADFF',
    },
    headerTintColor: '#fff',

  };


  setSelected(type){
    this.setState({ selected: type });
    this.props.navigation.navigate("third", { type: type} );
  }

  _renderItem = (data, i) => (
    <TouchableOpacity style={[{ backgroundColor: data.colors, borderRadius:10 }, styles.item]} key={i} onPress={() => this.setSelected(data.type)} dataTest={data.type}>
      <View style={{flex: 0, flexDirection: 'column',alignContent:'center', postion:'absolute',left:10, top:10, width: 100,height: 100}}>
        <View style={{flex: 0, flexDirection: 'row'}}>
          <Image
            source={data.icon}
            />
          <View style={{flex: 0, flexDirection: 'column', width:80}}>
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
            <View style={{padding: 20, paddingBottom:175}}>
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
    height: 125,
    margin: 10
  },
  list: {
    flex: 1
  }
});
