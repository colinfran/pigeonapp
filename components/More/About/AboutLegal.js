import React from "react";
import { TouchableOpacity,TouchableHighlight, TextInput, Image, StyleSheet, Text, View, Dimensions, ListView, FlatList, Platform, StatusBar, ScrollView, Button } from "react-native";
import { SafeAreaView} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import Grid from 'react-native-grid-component';
import { MapView } from "expo";

export default class AboutLegal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  static navigationOptions = {
    title: "Legal",
    headerStyle: {
      backgroundColor: "red"
    },
    headerTintColor: "#fff"
  };


  render() {
    return (
      <ScrollView style={{ flex: 1}}>
        <View
          style={{
            flex: 0,
            flexDirection:'column',

            padding: 15,
            paddingTop: 10,
          }}
        >
        <Text style={{textAlign:'center',fontSize:22, paddingBottom: 15,  textDecorationLine:'underline', fontWeight:'bold'}}>
          Privacy Policy
        </Text>
        <Text style={{ paddingBottom: 10}}>
          Pigeon built the Pigeon App app as a Free app. This SERVICE is provided by Pigeon at no cost and is intended for use as is.
        </Text>
        <Text  style={{ paddingBottom: 10}}>
          This page is used to inform visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service.
        </Text>
        <Text style={{ paddingBottom: 10}}>
          If you choose to use our Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that we collect is used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.
        </Text>
        <Text style={{ paddingBottom: 10}}>
          The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at Pigeon App unless otherwise defined in this Privacy Policy.
        </Text>
        <Text style={{textAlign:'center',fontSize:16, paddingBottom: 10,  textDecorationLine:'underline', fontWeight:'bold'}}>
          Information Collection and Use
        </Text>
        <Text style={{paddingBottom: 10}}>
          For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to name, email, password, drivers license, posts, comments. The information that we request will be retained by us and used as described in this privacy policy.
        </Text>
        <Text style={{paddingBottom: 10}}>
          The app does use third party services that may collect information used to identify you.
        </Text>
        <Text style={{textAlign:'center',fontSize:16, paddingBottom: 10,  textDecorationLine:'underline', fontWeight:'bold'}}>
          Cookies
        </Text>
        <Text style={{paddingBottom: 10}}>
          Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device{"'"}s internal memory.
        </Text>
        <Text style={{paddingBottom: 10}}>
          This Service does not use these “cookies” explicitly. However, the app may use third party code and libraries that use “cookies” to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.
        </Text>
        <Text style={{textAlign:'center',fontSize:16, paddingBottom: 10,  textDecorationLine:'underline', fontWeight:'bold'}}>
          Service Providers
        </Text>
        <Text style={{paddingBottom: 10}}>
          We may employ third-party companies and individuals due to the following reasons:
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text>{'\u2022'+'  '}</Text>
          <Text>To facilitate our Service</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text>{'\u2022'+'  '}</Text>
          <Text>To provide the Service on our behalf</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text>{'\u2022'+'  '}</Text>
          <Text>To perform Service-related services</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text>{'\u2022'+'  '}</Text>
          <Text>To assist us in analyzing how our Service is used.</Text>
        </View>
        <Text style={{paddingTop: 10, paddingBottom: 10}}>
          We want to inform users of this Service that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.
        </Text>
        <Text style={{textAlign:'center',fontSize:16, paddingBottom: 10, textDecorationLine:'underline', fontWeight:'bold'}}>
          Security
        </Text>
        <Text style={{paddingBottom: 10}}>
          We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.
        </Text>
        <Text style={{textAlign:'center',fontSize:16, paddingBottom: 10,  textDecorationLine:'underline', fontWeight:'bold'}}>
          Changes to This Privacy Policy
        </Text>
        <Text style={{paddingBottom: 10}}>
          We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately after they are posted on this page.
        </Text>

        </View>
      </ScrollView>
    );
  }
}
