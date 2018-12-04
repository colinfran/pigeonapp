import { AsyncStorage, Alert } from 'react-native'

import TokenService from '@around25/jwt-utils'
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDiFNSIiZO0EUh0jMiYwiDSYJ2wRRl7j4s',
  authDomain: 'project-pigeon-28cbf.firebaseapp.com',
  databaseURL: 'https://project-pigeon-28cbf.firebaseio.com',
  storageBucket: 'project-pigeon-28cbf.appspot.com'
};

// firebase.initializeApp(firebaseConfig);
let app = firebase.initializeApp(firebaseConfig);


export function createUser(emailVar, passwordVar, firstNameVar, lastNameVar, authVar, adminVar, tokenVar, firstresponderlicense) {
    firebase.auth().createUserWithEmailAndPassword(emailVar, passwordVar)
    .then(data => {
      // console.log("User ID :- ", data.user.uid);
      var userID = data.user.uid;
      firebase.database().ref('users/' + userID).set({
        'userID': userID,
        'email': emailVar,
        'password': passwordVar,
        'firstname': firstNameVar,
        'lastname': lastNameVar,
        'auth': authVar,
        'admin': adminVar,
        'numPosts': 0,
        'token':tokenVar,
        'firstresponderlicense': firstresponderlicense,
      });
      firebase.auth().currentUser.sendEmailVerification().then(function() {
       // Email sent.
      }, function(error) {
       // An error happened.
      });

      console.log('firebaseUserID: '+ userID);
      AsyncStorage.setItem('userID', userID);

   })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
        return false;
      } else {
        alert("Error code: " + errorCode + "\n" + errorMessage);
        console.log("Error code: " + errorCode + "\n" + errorMessage);
        return false;
      }

    });
    return true;

}

export function signUserIn(providedEmail, providedPassword, that){
  var errorCode = "";
  var errorMessage = "";

  firebase.auth().signInWithEmailAndPassword(providedEmail, providedPassword)
  .then(function (response) {
    // console.log("response:" + JSON.stringify(response));
    var userId = firebase.auth().currentUser.uid;
    firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
      var name = (snapshot.val() && snapshot.val().firstname);
      var email = providedEmail;
      var admin = (snapshot.val() && snapshot.val().admin);
      // console.log("name: "+name)
      AsyncStorage.setItem('name', name);
      AsyncStorage.setItem('email', email);
      AsyncStorage.setItem('userID', userId);
      AsyncStorage.setItem('admin', ""+admin);
      that.setState({loading:false});
      that.props.navigation.navigate('Emergencies');
    });
  })
  .catch(function(error) {
      // Handle Errors here.
      that.setState({loading:false});
      errorCode = error.code;
      errorMessage = error.message;
      alert(errorMessage);
      console.log(error);
    });
    return;

}

export function submitEmergencyInfo(postTitle, postDescription, postType, postScore, posterUserID, postRegion, postVerified, town, county){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1;
  var yyyy = today.getFullYear();
  if (dd < 10)
    dd = '0'+mm;
  if(mm < 10)
      mm = '0'+mm
  today = mm + '/' + dd + '/' + yyyy;
  var time = new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
  var data = {
    'title': postTitle,
    'description': postDescription,
    'type': postType,
    'score': postScore,
    'posterUserID': posterUserID,
    'postRegion': postRegion,
    'verified': postVerified,
    'postId': null,
    'numComments':0,
    'town': town,
    'county': county,
    'verified': {
      'verified': false,
      'verifier': "",
    },
    'date': today,
    'time': time
  }

  var ref = firebase.app().database().ref();

  var postsRef = ref.child('posts');
  // Create a new ref and log it’s push key
  var postsRef = postsRef.push(data);
  console.log('post key', postsRef.key);
  firebase.database().ref('/posts/'+ postsRef.key).update({
    'postId': postsRef.key
  });
  var length = 0;
  firebase.database().ref('/posts/').once('value').then(function(snapshot) {
    length = (snapshot.val() && snapshot.val().legnth) || 'Anonymous';
  });


  // var ref = firebase.database().ref('posts');
  // console.log("Here2");
  // ref.push({
  //   'title': postTitle,
  //   'description': postDescription,
  //   'type': postType,
  //   'score': postScore,
  //   'posterUserID': posterUserID,
  //   'postRegion': postRegion,
  //   'verified': postVerified,
  //   'comments': "null",
  // });   // Creates a new ref with a new "push key"

  return true;

}

export function updateUserPushSettings(userId, value){
  firebase.database().ref('/users/' + userId).update({
    'pushNotifications': value,
  });

}


export function submitComment(postId, commentString, name, numberofCom){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1;
  var yyyy = today.getFullYear();
  if (dd < 10)
    dd = '0'+mm;
  if(mm < 10)
      mm = '0'+mm
  today = mm + '/' + dd + '/' + yyyy;
  var time = new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");


  var newNum = numberofCom + 1;
  firebase.database().ref('/posts/'+ postId).update({
    'numComments': newNum
  });
  firebase.database().ref('/posts/'+ postId + "/comments/").push({
    'commentString': commentString,
    'postId': postId,
    'name': name,
    'id': newNum,
    'time': time,
    'date': today,
  });


  return true;

}

export function changeName(name, userId){
  firebase.database().ref('users/' + userId).update({
    'firstname': name,
  });
  AsyncStorage.setItem('name', name);

}

export function updateScore(postId, remove, userId){
  if (remove){
    firebase.database().ref('/posts/' + postId+ "/score/" + userId).remove();
  }
  else{
    firebase.database().ref('/posts/'+ postId + "/score/" + userId).set({userId: userId}).then(function (snapshot) {
    });
  }




  // firebase.database().ref('/posts/'+ postId).update({
  //   'score': {
  //     'score': score,
  //     'users':{
  //
  //     }
  //   }
  // });
}

export function getNumPosts(){
  var i = 0;

  firebase.database().ref('/posts/').on('value', (snapshot) => {
    // get children as an array
    for(var key in snapshot.val()){
      if (snapshot.val()[key].verified.verified == false)
        i++;
   }

  });
  // console.log(i);
  return i;
}

export function getMyPosts(userId){




  var items = [];
  var count = 0;
  firebase.database().ref('/posts/').on('value', (snapshot) => {
    // get children as an array
    for(var key in snapshot.val()){
       var dataOb = snapshot.val()[key];
       if ((typeof dataOb === 'object')){
          const posterUserID = Object.values("posterUserID")
          if (posterUserID == userId)
            count++;
       }
    }

  })
  // console.log(count);
  return count;


  // console.log("testerino");
  // var i;
  // var mycountRef = firebase.database().ref('/posts/');
  // mycountRef.on('value', function(snapshot) {
  //   i = snapshot.val();
  // });
  // console.log("I: " + i);
  // for (var j = 0; j<i.length; j++)
  // return i;
  //
  //

}

export function removePosts(postId){
    // firebase.database().ref('/posts/' + postId).remove();
}

export function verifyPosts(postId, verifierId){
    firebase.database().ref('/posts/' + postId + '/verified').update({
      'verified': true,
      'verifier': verifierId
    });
}



export function getEmergencyData(){
  var dataArray = { data: null};
  var items = [];
  var postsRef = firebase.database().ref('/posts');
  postsRef.on('value', function(snapshot) {
    // snapshot.val() is the dictionary with all your keys/values from the '/store' path
    // for(var key in snapshot.val()){
    //     var dataOb = snapshot.val()[key];
    //     var i = 0;
    //     data[i] = dataOb.
    //     console.log(JSON.stringify(dataOb));
    //     i++;

    // }
    for(var key in snapshot.val()){
       var dataOb = snapshot.val()[key];
       if ((typeof dataOb === 'object'))
         items.push( dataOb );
   }

  })
  // console.log("DataArray: "+ JSON.stringify(dataArray))
  return items;
}

export function verifyAccountEmail(){
  firebase.auth().currentUser.sendEmailVerification().then(function() {
   // Email sent.
  }, function(error) {
   // An error happened.
  });
}

export const isLoggedIn = async () => {

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      return true;
    }
    return false;
  });
}

export const logout = async () => {
  AsyncStorage.clear();
  try {
       await firebase.auth().signOut();
   } catch (e) {
       console.log(e);
   }
}
