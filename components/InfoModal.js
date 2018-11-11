import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Dimensions,
  Image,
  AsyncStorage,
  TextInput
} from "react-native";
import Modal from "react-native-modal";
import Comments from "./Comments";
import renderIf from "../assets/renderIf";

import { Button as ElementsButton } from "react-native-elements";

import { Ionicons } from "@expo/vector-icons"; //https://ionicons.com/

var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

export default class InfoModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.dataClick.title,
      description: this.props.dataClick.description,
      coordinates: {
        latitude: this.props.dataClick.coordinates.latitude,
        longitude: this.props.dataClick.coordinates.longitude
      },
      town: this.props.dataClick.town,
      county: this.props.dataClick.county,
      upVotes: this.props.dataClick.upVotes,
      downVotes: this.props.dataClick.downVotes,

      selected: this.props.dataClick.voteSelected,

      commentData: this.props.dataClick.commentData,

      numComments: this.props.dataClick.numComments,
      showComments: false,
      showHideText: "Show",

      addComment: false,
      commentString: "",

      commentTextLength: 200,
      commentMaxLength: 200
    };
    this._renderImageUp = this._renderImageUp.bind(this);
    this._renderImageDown = this._renderImageDown.bind(this);
    this.imagePress = this.imagePress.bind(this);
    this.addUserComment = this.addUserComment.bind(this);
    this.showPostedComments = this.showPostedComments.bind(this);
    this.onChangeCommentText = this.onChangeCommentText.bind(this);
    this.postComment = this.postComment.bind(this);

  }

  imagePress(press) {
    if (this.state.selected == press) {
      if (press == "up") this.setState({ upVotes: this.state.upVotes - 1 });
      if (press == "down")
        this.setState({ downVotes: this.state.downVotes - 1 });
      this.setState({ selected: "" });
    } else {
      if (press == "up") {
        this.setState({ upVotes: this.state.upVotes + 1 });
        if (this.state.selected == "down")
          this.setState({ downVotes: this.state.downVotes - 1 });
      }
      if (press == "down") {
        this.setState({ downVotes: this.state.downVotes + 1 });
        if (this.state.selected == "up")
          this.setState({ upVotes: this.state.upVotes - 1 });
      }
      this.setState({ selected: press });
    }
  }

  _renderImageUp() {
    if (this.state.selected == "up")
      return (
        <View style={{ height: "100%", width: "100%" }}>
          <Image
            style={{ height: 20, width: 20 }}
            resizeMethod="resize"
            source={require("../assets/arrowUpSelected.png")}
          />
        </View>
      );
    else
      return (
        <View style={{ height: "100%", width: "100%" }}>
          <Image
            style={{ height: 20, width: 20 }}
            resizeMethod="resize"
            source={require("../assets/arrowUp.png")}
          />
        </View>
      );
  }

  _renderImageDown() {
    if (this.state.selected == "down") {
      return (
        <View style={{ height: "100%", width: "100%" }}>
          <Image
            style={{ height: 20, width: 20 }}
            resizeMethod="resize"
            source={require("../assets/arrowDownSelected.png")}
          />
        </View>
      );
    } else
      return (
        <View style={{ height: "100%", width: "100%" }}>
          <Image
            style={{ height: 20, width: 20 }}
            resizeMethod="resize"
            source={require("../assets/arrowDown.png")}
          />
        </View>
      );
  }

  onModalClose() {
    {
      /* Send data to server with upvote info onModalClose

      send 'this.data.selected'

      can do something like:
      if (this.data.selected == "")
        do nothing
      if (this.data.selected == "up")
        upVote + 1
        send upvote to server
      if (this.data.selected == "down")
        downVote + 1
      send vote to server

      Will also have to update array in parent component to have updated selected data
      (or can just refetch data from server)

      */
    }
    this.props.toggle();
  }

  _retrieveData = async () => {
    console.log("Here");
    try {
      const value = await AsyncStorage.getItem("admin");
      if (value !== null) {
        // We have data!!
        console.log(value);
        var result = value == "true";
        this.setState({ admin: result });
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  componentDidMount() {
    this._retrieveData();
  }



  addUserComment() {
    this.setState({ addComment: !this.state.addComment });
  }

  showPostedComments() {
    this.setState({ showComments: !this.state.showComments});
    if (this.state.showHideText=="Show"){
      this.setState({showHideText:"Hide" });
    }
    else{
      this.setState({showHideText: "Show" });
    }
  }

  onChangeCommentText(text) {
    this.setState({
      commentString: text,
      commentTextLength: this.state.commentMaxLength - text.length
    });
  }

  postComment(){
    if (this.state.commentString=="")
      return;
    alert("comment: "+ this.state.commentString );
    this.setState({
      commentString: "",
      commentTextLength: this.state.commentMaxLength,
      addComment: !this.state.addComment,
    });
  }

  render() {
    return (
      <View
        style={{
          width: deviceWidth - deviceWidth / 8,
          height: deviceHeight - deviceHeight / 8,
          backgroundColor: "#FFF"
        }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ padding: 20 }}>
            <Text>{this.state.title}</Text>
            <Text>{this.state.description}</Text>
            <Text>Lat: {this.state.coordinates.latitude}</Text>
            <Text>Long: {this.state.coordinates.longitude}</Text>
            <Text>
              {this.state.town}, {this.state.county}, USA
            </Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              height: "15%",
              paddingTop: 10,
              paddingBottom: 30,
              alignItems: "center"
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{ paddingRight: 5 }}
                onPress={() => this.imagePress("up")}
              >
                <View style={{ width: "100%", height: "100%" }}>
                  {this._renderImageUp()}
                </View>
              </TouchableOpacity>
              <View style={{ height: 15, paddingRight: 10 }}>
                <Text>{this.state.upVotes}</Text>
              </View>

              <TouchableOpacity
                style={{ paddingLeft: 10, paddingRight: 5 }}
                onPress={() => this.imagePress("down")}
              >
                <View style={{ width: "100%", height: "100%" }}>
                  {this._renderImageDown()}
                </View>
              </TouchableOpacity>
              <View style={{ height: 15 }}>
                <Text>{this.state.downVotes}</Text>
              </View>
            </View>
          </View>
          {renderIf(this.state.admin,
            <View style={{borderBottomWidth: 0,borderWidth: 0.8, borderColor: "lightgrey", width:'100%',  paddingLeft: 20,paddingRight: 20, justifyContent: 'center',paddingTop: 10,paddingBottom: 10,}}>
              <TouchableOpacity>
                <Text style={{ color: "blue", textAlign:'center', alignSelf: "center"}}>Remove this post</Text>
              </TouchableOpacity>
            </View>
          )}
          <View
            style={{
              flexDirection: "row",
              borderWidth: 0.8,
              borderColor: "lightgrey",
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 10,
              paddingBottom: 10,
              justifyContent: "space-between"
            }}
          >
            <TouchableOpacity onPress={() => this.showPostedComments()}>
              <Text style={{color:'blue' }}>
                {this.state.showHideText}
                {" "}Comments{" ("}
                {this.state.numComments}
                {") "}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.addUserComment()}>
              <Text style={{color: "blue" }}>
                Post a comment
              </Text>
            </TouchableOpacity>
          </View>
          {renderIf(
            this.state.addComment,
            <View
              style={{
                height: 100,
                borderTopWidth: 0,
                borderWidth: 0.8,
                borderColor: "lightgrey",
                paddingTop: 10,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  width: "75%",
                  paddingLeft: 20
                }}
              >
                <TextInput
                  editable={true}
                  commentMaxLength={500}
                  style={styles.descriptionInput}
                  value={this.state.commentString}
                  onChangeText={this.onChangeCommentText.bind(this)}
                  multiline={true}
                />
                <Text
                  style={{ fontSize: 10, color: "black", textAlign: "right" }}
                >
                  {this.state.commentTextLength}/{this.state.commentMaxLength}
                </Text>
              </View>
              <View style={{ flexDirection: "column" }}>
                <ElementsButton
                  title="Post"
                  style={styles.elementsButtonStyle}
                  onPress={() => this.postComment()}
                />
              </View>
            </View>
          )}
          {renderIf(
            this.state.showComments,
            <Comments commentData={this.state.commentData} />
          )}
        </View>
        <View style={{borderWidth:.5, borderColor:'lightgrey'}}>
          <Button onPress={()=> this.onModalClose()} title="Close" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  descriptionInput: {
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "white",
    height: 60,
    padding: 5
  },
  elementsButtonStyle: {
    marginBottom: 12
  }
});
