import React from "react";
import { StyleSheet, Text, View, Dimensions, ListView, FlatList, Platform, StatusBar, ScrollView, Button, Image, Alert, AsyncStorage} from "react-native";
import { SafeAreaView } from 'react-native';
import { Badge } from 'react-native-elements';
import SettingsList from 'react-native-settings-list';
import DialogInput from 'react-native-dialog-input';
import * as firebase from 'firebase';


var list = [];
export default class Password extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: null,
      userId: null,

    };



  }

  static navigationOptions = {
    title: 'Change Password',
    headerStyle: {
      backgroundColor: '#33ADFF',
    },
    headerTintColor: '#fff',

  };

  _retrieveData = async () => {
    try {
      const value2 = await AsyncStorage.getItem('userID');
      const value4 = await AsyncStorage.getItem('email');

      if (value2!== null && value4!== null) {
        // We have data!!

        this.setState({userId: value2, email: value4})
        // console.log(value2)
      }
     }
     catch (error) {
       // Error retrieving data
     }
   }


  componentDidMount() {
    this._retrieveData();
  }

  resetPassword(email){
    firebase.auth().sendPasswordResetEmail(email);
    this.props.navigation.navigate('Settings');
    alert("An email has been sent to you to reset your password.");
  }


  render() {
    return (
      <View style={{flex:1}}>
        <View style={{flex:1, marginTop:25}}>
          <SettingsList>
            <SettingsList.Item
              title='Reset Password'
              onPress={() => this.resetPassword(this.state.email) }

              arrowIcon={
                <View style={{marginRight:15,alignSelf:'center'}}>
                  <Image style={{height: 20, width:20, alignSelf:'center'}} source={require('../../../assets/more.png')}/>
                </View>
              }
              />
          </SettingsList>
        </View>
      </View>
    );
  }
}
