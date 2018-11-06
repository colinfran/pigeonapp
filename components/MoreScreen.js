import React from "react";
import { StyleSheet, Text, View, Dimensions, ListView, FlatList, Platform, StatusBar, ScrollView, Button, Image, Alert} from "react-native";
import { SafeAreaView } from 'react-native';
import { Badge } from 'react-native-elements';
import { logout } from '../api/auth'
import SettingsList from 'react-native-settings-list';



export default class MoreScreen extends React.Component {
  constructor(props){
    super(props);
    this.onLogout = this.onLogout.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.verifyLogout = this.verifyLogout.bind(this);

    this.state = {
      email:"email@email.com",
      displayName: "Bob",
      numPosts: 0,
      numRanked: 0,
      notificationsValue: false
    };
  }

  static navigationOptions = {
    title: 'More',
    headerStyle: {
      backgroundColor: '#33ADFF',
    },
    headerTintColor: '#fff',

  };

  verifyLogout(){
    Alert.alert(
     'Are you sure you want to log out of this app?',
     'Please pick an option',
     [
       {text: 'Cancel', onPress: () => console.warn('NO Pressed'), style: 'cancel'},
       {text: 'Logout', onPress: this.onLogout},
     ]
   );
  }

  async onLogout() {
     await logout();
     this.props.navigation.navigate('Login');
   }

   onValueChange(value){
     console.log('allow push notifications:', value);
     this.setState({notificationsValue: value});
   }

  render() {
    return (
      <View style={{flex:1}}>
        <View style={{flex:1, marginTop:25}}>
          <SettingsList>
            <SettingsList.Header headerText='Helpful Info' headerStyle={{}}/>
            <SettingsList.Item
              title='What to do if theres an Emergency?'
              arrowIcon={
                <View style={{marginRight:15,alignSelf:'center'}}>
                  <Image style={{height: 20, width:20, alignSelf:'center'}} source={require('../assets/more.png')}/>
                </View>
              }
              />
            <SettingsList.Item
              title='What to do if theres an Emergency?'
              arrowIcon={
                <View style={{marginRight:15,alignSelf:'center'}}>
                  <Image style={{height: 20, width:20, alignSelf:'center'}} source={require('../assets/more.png')}/>
                </View>
              }
              />


          	<SettingsList.Header
              headerText='User Information'
              headerStyle={{marginTop:25}}
              arrowIcon={
                <View style={{marginRight:15,alignSelf:'center'}}>
                  <Image style={{height: 20, width:20, alignSelf:'center'}} source={require('../assets/more.png')}/>
                </View>
              }/>
            <SettingsList.Item
              titleInfo={this.state.email}
              hasNavArrow={false}
              title='Email'/>
            <SettingsList.Item
              titleInfo={this.state.displayName}
              itemWidth={50}
              title='Display Name'
              onPress={() => Alert.alert('Icon Example Pressed')}
              arrowIcon={
                <View style={{marginRight:15,alignSelf:'center'}}>
                  <Image style={{height: 20, width:20, alignSelf:'center'}} source={require('../assets/more.png')}/>
                </View>
              }
            />

            <SettingsList.Item
              title='Emergencies you posted'
              onPress={() => Alert.alert('Posted Emergencies')}
              arrowIcon={
                <View style={{flexDirection:'row', marginRight:15,alignSelf:'center'}}>
                    <Badge
                      value={this.state.numPosts}
                      containerStyle={{ backgroundColor: 'lightgrey', marginRight:10 }}
                      textStyle={{ color: 'black' }}
                    />
                  <Image style={{height: 20, width:20, alignSelf:'center'}} source={require('../assets/more.png')}/>

                </View>
              }
            />
            <SettingsList.Item
              title='Emergencies you ranked'
              onPress={() => Alert.alert('Ranked Emergencies')}
              arrowIcon={
                <View style={{flexDirection:'row', marginRight:15,alignSelf:'center'}}>
                    <Badge
                      value={this.state.numRanked}
                      containerStyle={{ backgroundColor: 'lightgrey', marginRight:10 }}
                      textStyle={{ color: 'black' }}
                    />
                  <Image style={{height: 20, width:20, alignSelf:'center'}} source={require('../assets/more.png')}/>

                </View>
              }
            />
          <SettingsList.Header headerText='User Settings' headerStyle={{marginTop:25}}/>
            <SettingsList.Item
              titleInfo='Some stuff'
              title='Stuff about the stuff'
              arrowIcon={
                <View style={{marginRight:15,alignSelf:'center'}}>
                  <Image style={{height: 20, width:20, alignSelf:'center'}} source={require('../assets/more.png')}/>
                </View>
              }/>
            <SettingsList.Item title='Settings 1'
              arrowIcon={
                <View style={{marginRight:15,alignSelf:'center'}}>
                  <Image style={{height: 20, width:20, alignSelf:'center'}} source={require('../assets/more.png')}/>
                </View>
              }
              />
            <SettingsList.Item
              hasNavArrow={false}
              switchState={this.state.notificationsValue}
              switchOnValueChange={this.onValueChange}
              hasSwitch={true}
              title='Allow Push Notifications'/>
            <SettingsList.Header headerText='' headerStyle={{marginTop:25}}/>
            <SettingsList.Item
              style={{}}
              title='Logout'
              onPress={this.verifyLogout}
              titleStyle={{fontSize:18, fontWeight: 'bold', textDecorationLine:'underline'}}
              arrowIcon={
                <View style={{marginRight:15,alignSelf:'center'}}>
                  <Image style={{alignSelf:'center'}} source={require('../assets/logout.png')}/>
                </View>
              }
            />

          </SettingsList>
          <View></View>

        </View>
      </View>
    );
  }
}
