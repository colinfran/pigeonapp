import React from "react";
import { StyleSheet, Text, View, Dimensions, ListView, FlatList, Platform, StatusBar, ScrollView, Button, Image, Alert, AsyncStorage} from "react-native";
import { SafeAreaView } from 'react-native';
import { Badge } from 'react-native-elements';
import { logout } from '../api/auth'
import SettingsList from 'react-native-settings-list';
import DialogInput from 'react-native-dialog-input';
import { getNumPosts, getMyPosts, changeName, updateUserPushSettings } from '../api/auth'
import * as firebase from 'firebase';
import { Permissions, Notifications } from 'expo';


var list = [];
export default class MoreScreen extends React.Component {
  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

    this.onLogout = this.onLogout.bind(this);

    this.verifyLogout = this.verifyLogout.bind(this);
    this.showDialog = this.showDialog.bind(this);

    this.state = {
      email:"",
      displayName: "",
      numPosts: 0,
      notificationsValue: false,
      isDialogVisible: false,
      admin: false,
      myPosts: null,
      newPosts:0,
      userId: null,
      data: null,
      keys: null,
      dataSource: this.ds.cloneWithRows(list),
      verifiedAccount: false,

    };
    this.renderAdminSection = this.renderAdminSection.bind(this);
    this.renderPleaseVerify = this.renderPleaseVerify.bind(this);
    this.onPressNewPosts = this.onPressNewPosts.bind(this);


  }

  static navigationOptions = {
    title: 'More',
    headerStyle: {
      backgroundColor: 'red',
    },
    headerTintColor: '#fff',

  };

  _retrieveData = async () => {
    try {
      const value1 = await AsyncStorage.getItem('admin');
      const value2 = await AsyncStorage.getItem('userID');
      const value3 = await AsyncStorage.getItem('name');
      const value4 = await AsyncStorage.getItem('email');

      if (value1 !== null && value2!== null && value3!== null && value4!== null) {
        // We have data!!
        console.log("Admin: " + value1);
        var result = (value1 == "true");
        this.setState({admin: result, userId: value2, displayName: value3, email: value4})
        // console.log(value2)
        var items = {};
        var keysArray = [];
        var arr = [];
        var count = 0;
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/users/' + value2).on('value', (snapshot) => {
          var push = (snapshot.val() && snapshot.val().pushNotifications);
          this.setState({notificationsValue: push})
          console.log("got push: " + push);
        });

        firebase.database().ref('/posts/').on('value', (snapshot) => {
          snapshot.forEach(function(childSnapshot) {
            var dataOb = childSnapshot.val();
              var dataKey = childSnapshot.key;
            if ((typeof dataOb === 'object')){
               const posterUserID = dataOb.posterUserID;
               if (posterUserID == value2){
                 arr.push(dataOb);
                 items[dataKey] = dataOb;
                 count++;
               }
            }
            console.log("Posts: "+count)
          })
          // console.log(arr);
          this.setState({numPosts: getNumPosts(), myPosts: count, data: arr, dataSource: this.ds.cloneWithRows(items)});
        })

        if (firebase.auth().currentUser.emailVerified === false) {
          console.log("EmailVerified: false");
          this.setState({verifiedAccount: false});
        }
        else{
          this.setState({verifiedAccount: true});
          console.log("EmailVerified: true");
        }


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



   showDialog(show){
     this.setState({isDialogVisible: show});
     this.props.navigation.navigate('screen1')
   }

   renderAdminSection(){
     // console.log(this.state.data)
     if (this.state.admin == false)
      return;
     else{
       return([
         <SettingsList.Header headerText='Admin Privileges' headerStyle={{marginTop:25}}/>

         ,

         <SettingsList.Item
           title='Review New Posts'
           onPress={this.onPressNewPosts}
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
       ]);
     }
   }

   onPressNewPosts(){
     if (this.state.numPosts != 0){
       this.props.navigation.navigate('Admin1')
     }
   }

   renderPleaseVerify(){
     if (!this.state.verifiedAccount){
       return (
         <SettingsList.Item
              icon={
                <View style={{height:30,marginLeft:10,alignSelf:'center'}}>
                  <Image style={{alignSelf:'center',height:30, width:30}} source={require('../assets/about.png')}/>
                </View>
              }
              itemWidth={50}
              title='Your Account has not been verified'
              onPress={() => this.props.navigation.navigate('Verify') }
              arrowIcon={
                <View style={{marginRight:15,alignSelf:'center'}}>
                  <Image style={{height: 20, width:20, alignSelf:'center', color:'red'}} source={require('../assets/more.png')}/>
                </View>
              }
            />
       );
     }
     else{
       return;
     }
   }

  render() {
    return (
      <View style={{flex:1}}>
        <DialogInput isDialogVisible={this.state.isDialogVisible}
          title={"Display Name"}
          message={"Please pick a name to be displayed when you post"}
          hintInput ={this.state.displayName}
          submitInput={ (inputText) => {changeName(inputText, this.state.userId);this.showDialog(false); this.setState({displayName: inputText})} }
          closeDialog={ () => {this.showDialog(false)}}
          modalStyle={{backgroundColor:'red'}}>
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
                    title='Landslide Information'
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
              />
            {this.renderPleaseVerify()}
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
            <SettingsList.Item title='Settings'
              onPress={() => this.props.navigation.navigate('Settings', { data: this.state.dataSource, myPosts: this.state.myPosts, userId: this.state.userId, notificationsValue: this.state.notificationsValue}) }
              arrowIcon={
                <View style={{marginRight:15,alignSelf:'center'}}>
                  <Image style={{height: 20, width:20, alignSelf:'center'}} source={require('../assets/more.png')}/>
                </View>
              }
              />


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
