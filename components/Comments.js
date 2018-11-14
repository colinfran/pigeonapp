import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList
} from 'react-native';
import * as firebase from 'firebase';

const list = []

export default class Comments extends  React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: list,
      postId: this.props.postId,
      numComments: this.props.numComments,
    }
    this.itemsRef = firebase.database().ref('/posts/'+this.state.postId + "/comments/");
  }

  setItemsFromFirebase(itemsRef) {
   itemsRef.on('value', (snapshot) => {

     // get children as an array
     var items = [];
     for(var key in snapshot.val()){
				var dataOb = snapshot.val()[key];
        if ((typeof dataOb === 'object'))
          items.push( dataOb );
    }

     this.setState({
       dataSource: items
     });

   });
 }

 componentDidMount() {
   this.setItemsFromFirebase(this.itemsRef);
 }


  render() {
    // console.log(JSON.stringify(this.state.data));
    return (
      <FlatList
        style={styles.root}
        data={this.state.dataSource}
        renderRow={this.renderItem}

        ItemSeparatorComponent={() => {
          return (
            <View style={styles.separator}/>
          )
        }}
        keyExtractor={(item)=>{
          return item.id;
        }}
        renderItem={(item) => {
          const Notification = item.item;
          return(
            <View style={styles.container}>
              <View style={styles.content}>
                <View style={styles.contentHeader}>
                  <Text  style={styles.name}>{Notification.name}</Text>
                  <Text style={styles.time}>
                    {Notification.time}
                  </Text>
                </View>
                <Text rkType='primary3 mediumLine'>{Notification.commentString}</Text>
              </View>
            </View>
          );
        }}/>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#ffffff",
    height: 300
  },
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  content: {
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC"
  },
  image:{
    width:45,
    height:45,
    borderRadius:20,
    marginLeft:20
  },
  time:{
    fontSize:11,
    color:"#808080",
  },
  name:{
    fontSize:16,
    fontWeight:"bold",
  },
});
