import React from "react";
import { StyleSheet, Text, View, Dimensions, ListView, FlatList, Platform, StatusBar, ScrollView, Button, Image, Alert, AsyncStorage} from "react-native";
import { SafeAreaView } from 'react-native';
import { Badge } from 'react-native-elements';
import SettingsList from 'react-native-settings-list';
import DialogInput from 'react-native-dialog-input';
import {updateUserPushSettings } from '../../../api/auth'
import * as firebase from 'firebase';


var list = [];
export default class UserSettings extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dataSource: this.props.navigation.state.params.data,
      myPosts: this.props.navigation.state.params.myPosts,
      notificationsValue: this.props.navigation.state.params.notificationsValue,
      userId: this.props.navigation.state.params.userId,
    };
    this.onValueChange = this.onValueChange.bind(this);

    this.onPressMyPosts = this.onPressMyPosts.bind(this);
    this.registerForPushNotificationsAsync = this.registerForPushNotificationsAsync.bind(this);


  }

  static navigationOptions = {
    title: 'User Settings',
    headerStyle: {
      backgroundColor: '#33ADFF',
    },
    headerTintColor: '#fff',

  };

  async registerForPushNotificationsAsync () {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    // Get the token that uniquely identifies this device
    let tokenVar = await Notifications.getExpoPushTokenAsync();
    console.log('PushNotificationToken:'+ tokenVar);
    this.setState({token: tokenVar})
    firebase.database().ref('/users/' + userId).update({
      'token': tokenVar,
    });
  }

  onValueChange(value){
    console.log('allow push notifications:', value);
    this.setState({notificationsValue: value});
    this.registerForPushNotificationsAsync();
    // console.log(this.state.data);
    updateUserPushSettings(this.state.userId, value);
  }

  onPressMyPosts(){
    if (this.state.myPosts != 0){
      this.props.navigation.navigate("Information2" ,{ data: this.state.dataSource})
    }
  }

  render() {
    return (
      <View style={{flex:1}}>
        <View style={{flex:1, marginTop:25}}>
          <SettingsList>
            <SettingsList.Header headerText='User Posts' headerStyle={{}}/>
              <SettingsList.Item
                title='Emergencies you posted'
                onPress={this.onPressMyPosts}
                arrowIcon={
                  <View style={{flexDirection:'row', marginRight:15,alignSelf:'center'}}>
                      <Badge
                        value={this.state.myPosts}
                        containerStyle={{ backgroundColor: 'lightgrey', marginRight:10 }}
                        textStyle={{ color: 'black' }}
                      />
                    <Image style={{height: 20, width:20, alignSelf:'center'}} source={require('../../../assets/more.png')}/>

                  </View>
                }
              />
              <SettingsList.Header headerText='User Settings' headerStyle={{paddingTop:30}}/>
              <SettingsList.Item
                hasNavArrow={false}
                switchState={this.state.notificationsValue}
                switchOnValueChange={this.onValueChange}
                hasSwitch={true}
                title='Allow Push Notifications'/>
              <SettingsList.Item
                title='Change Password'
                onPress={() => this.props.navigation.navigate('Password') }

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
