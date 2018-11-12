import React from "react";
import { StyleSheet, Text, View, Dimensions, ListView, FlatList, Platform, StatusBar, ScrollView, Button, Image, Alert, AsyncStorage} from "react-native";
import { SafeAreaView } from 'react-native';
import { Badge } from 'react-native-elements';
import { logout } from '../api/auth'
import SettingsList from 'react-native-settings-list';
import DialogInput from 'react-native-dialog-input';



export default class MoreScreen extends React.Component {
  constructor(props){
    super(props);
    this.onLogout = this.onLogout.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.verifyLogout = this.verifyLogout.bind(this);
    this.showDialog = this.showDialog.bind(this);

    this.state = {
      email:"email@email.com",
      displayName: "Bob",
      numPosts: 0,
      notificationsValue: false,
      isDialogVisible: false,
      admin: false,

      newPosts:0,
    };
    this.renderAdminSection = this.renderAdminSection.bind(this);

  }

  static navigationOptions = {
    title: 'More',
    headerStyle: {
      backgroundColor: '#33ADFF',
    },
    headerTintColor: '#fff',

  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('admin');
      if (value !== null) {
        // We have data!!
        console.log("Admin: " + value);
        var result = (value == "true");
        this.setState({admin: result})
      }
     }
     catch (error) {
       // Error retrieving data
     }
}


  componentDidMount() {
    this._retrieveData();
  }

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

   showDialog(show){
     this.setState({isDialogVisible: show});
     this.props.navigation.navigate('screen1')
   }

   renderAdminSection(){
     if (this.state.admin == false)
      return;
     else{
       return([
         <SettingsList.Header headerText='Admin Stuff' headerStyle={{marginTop:25}}/>

         ,

         <SettingsList.Item
           title='New Posts Based On Your Location'
           onPress={() => this.props.navigation.navigate('Admin1') }
           arrowIcon={
             <View style={{flexDirection:'row', marginRight:15,alignSelf:'center'}}>
                 <Badge
                   value={this.state.newPosts}
                   containerStyle={{ backgroundColor: 'lightgrey', marginRight:10 }}
                   textStyle={{ color: 'black' }}
                 />
               <Image style={{height: 20, width:20, alignSelf:'center'}} source={require('../assets/more.png')}/>

             </View>
           }
         />
       ]);
     }
   }

  render() {
    return (
      <View style={{flex:1}}>
        <DialogInput isDialogVisible={this.state.isDialogVisible}
          title={"Display Name"}
          message={"Please pick a name to be displayed when you post"}
          hintInput ={"Bob"}
          submitInput={ (inputText) => {alert(inputText)} }
          closeDialog={ () => {this.showDialog(false)}}
          modalStyle={{backgroundColor:'#33ADFF'}}>
        </DialogInput>

        <View style={{flex:1, marginTop:25}}>
          <SettingsList>
            <SettingsList.Header headerText='Helpful Info' headerStyle={{}}/>
            <SettingsList.Item
              title='Fire Information'
              onPress={() => this.props.navigation.navigate('Helpful1') }

              arrowIcon={
                <View style={{marginRight:15,alignSelf:'center'}}>
                  <Image style={{height: 20, width:20, alignSelf:'center'}} source={require('../assets/more.png')}/>
                </View>
              }
              />
            <SettingsList.Item
              title='Flood Information'
              onPress={() => this.props.navigation.navigate('Helpful2') }

              arrowIcon={
                <View style={{marginRight:15,alignSelf:'center'}}>
                  <Image style={{height: 20, width:20, alignSelf:'center'}} source={require('../assets/more.png')}/>
                </View>
              }
              />

              <SettingsList.Item
                    title='Tornado Information'
                    onPress={() => this.props.navigation.navigate('Helpful3') }

                    arrowIcon={
                      <View style={{marginRight:15,alignSelf:'center'}}>
                        <Image style={{height: 20, width:20, alignSelf:'center'}} source={require('../assets/more.png')}/>
                      </View>
                    }
                    />

            {this.renderAdminSection()}

          	<SettingsList.Header
              headerText=' '
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
              onPress={() => {this.showDialog(true)}}
              arrowIcon={
                <View style={{marginRight:15,alignSelf:'center'}}>
                  <Image style={{height: 20, width:20, alignSelf:'center'}} source={require('../assets/more.png')}/>
                </View>
              }
            />

            <SettingsList.Item
              title='Emergencies you posted'
              onPress={() => this.props.navigation.navigate('Information2') }
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
          <SettingsList.Header headerText=' ' headerStyle={{marginTop:25}}/>
            <SettingsList.Item title='Settings'
              onPress={() => this.props.navigation.navigate('Settings2') }
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

            <SettingsList.Header headerText=' ' headerStyle={{marginTop:25}}/>
              <SettingsList.Item
                title='About this app'
                onPress={() => this.props.navigation.navigate('About1') }
                arrowIcon={
                  <View style={{marginRight:15,alignSelf:'center'}}>
                    <Image style={{height: 20, width:20, alignSelf:'center'}} source={require('../assets/more.png')}/>
                  </View>
                }
                />
              <SettingsList.Item
                title='About the creators'
                onPress={() => this.props.navigation.navigate('About2') }
                arrowIcon={
                  <View style={{marginRight:15,alignSelf:'center'}}>
                    <Image style={{height: 20, width:20, alignSelf:'center'}} source={require('../assets/more.png')}/>
                  </View>
                }
                />
                <SettingsList.Item
                  title='Legal'
                  onPress={() => this.props.navigation.navigate('About3') }
                  arrowIcon={
                    <View style={{marginRight:15,alignSelf:'center'}}>
                      <Image style={{height: 20, width:20, alignSelf:'center'}} source={require('../assets/more.png')}/>
                    </View>
                  }
                  />

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
          <SettingsList.Item title='' backgroundColor="transparent" hasNavArrow={false}/>

          </SettingsList>


        </View>
      </View>
    );
  }
}
