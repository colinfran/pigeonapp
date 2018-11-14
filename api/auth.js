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


export function createUser(emailVar, passwordVar, firstNameVar, lastNameVar, authVar, adminVar) {
    firebase.auth().createUserWithEmailAndPassword(emailVar, passwordVar)
    .then(data => {
      console.log("User ID :- ", data.user.uid);
      var userID = data.user.uid;
      firebase.database().ref('users/' + userID).set({
        'userID': userID,
        'email': emailVar,
        'password': passwordVar,
        'firstname': firstNameVar,
        'lastname': lastNameVar,
        'auth': authVar,
        'admin': adminVar,
        'score': 0,
        'numPosts': 0,
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

export function signUserIn(providedEmail, providedPassword){
  var errorCode = "";
  var errorMessage = "";
  firebase.auth().signInWithEmailAndPassword(providedEmail, providedPassword)
  .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
        return false;
      } else {
        alert(errorMessage);
        console.log(error);
        return false;
      }
    });

    var userID = firebase.auth().currentUser.uid;

    return firebase.database().ref('/users/' + userID).once('value').then(function(snapshot) {
      var name = (snapshot.val() && snapshot.val().firstname);
      AsyncStorage.setItem('name', name);
    });

    var name = firebase.auth().currentUser.uid.firstname;


    console.log('firebaseUserID: '+ userID);
    AsyncStorage.setItem('userID', userID);

    return true;

}

export function submitEmergencyInfo(postTitle, postDescription, postType, postScore, posterUserID, postRegion, postVerified, town, county){

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
    'county': county
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

  firebase.database().ref('/posts/').update({
    'length': length
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


export function submitComment(postId, commentString, name, numberofCom){

  var date = new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate());
  var time = new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");


  var newNum = numberofCom + 1;
  firebase.database().ref('/posts/'+ postId).update({
    'numComments': newNum
  });
  firebase.database().ref('/posts/'+ postId + "/comments/" + newNum).set({
    'commentString': commentString,
    'postId': postId,
    'name': name,
    'id': newNum,
    'time': time,
    'date': date,
  });


  return true;

}

export function updateScore(postId, score){
  firebase.database().ref('/posts/'+ postId).update({
    'score': score,
  });
}

export function getNumPosts(){
  var i = 0;

  firebase.database().ref('/posts/').on('value', (snapshot) => {
    // get children as an array
    for(var key in snapshot.val()){
       i++;
   }

  });
  console.log(i);
  return i;
}

export function getMyPosts(userId){

  var i = 0;

  // firebase.database().ref('/users/' + userId + '/numPosts').on('value', (snapshot) => {
  //   // get children as an array
  //   i = snapshot.val();
  //
  // })

  console.log("testerino");
  var i;
  var mycountRef = firebase.database().ref('/users/' + userId + '/numPosts');
  mycountRef.on('value', function(snapshot) {
    i = snapshot.val();
  });
  console.log("I: " + i);
  return i;

}

export function deleteData(postId){
    firebase.database().ref('/posts/' + postId).remove();
}



export function getEmergencyData(){
  var dataArray = { data: null};
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
      dataArray.data = snapshot.val();
      // console.log(JSON.stringify(snapshot.val()));
      var data = snapshot.val();
      // console.log(data);
      return data;
  })
  // console.log("DataArray: "+ JSON.stringify(dataArray))
  return dataArray;
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

  try {
       await firebase.auth().signOut();
   } catch (e) {
       console.log(e);
   }
}
