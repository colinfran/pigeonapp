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
  firebase.auth().signInWithEmailAndPassword(providedEmail, providedPassword).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
        console.log(error);
        return false;
      }
    });
    var userID = firebase.auth().currentUser.uid;
    console.log('firebaseUserID: '+ userID);
    AsyncStorage.setItem('userID', userID);
    return true;

}

export function submitEmergencyInfo(postTitle, postDescription, postType, postScore, posterUserID, postRegion, postVerified){

  var data = {
    'title': postTitle,
    'description': postDescription,
    'type': postType,
    'score': postScore,
    'posterUserID': posterUserID,
    'postRegion': postRegion,
    'verified': postVerified,
  }

  var ref = firebase.app().database().ref();

  var postsRef = ref.child('posts');
  // Create a new ref and log it’s push key
  var postsRef = postsRef.push(data);
  console.log('user key', postsRef.key);

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
