import React from "react";
import { StyleSheet, Text, View, Dimensions, ListView, FlatList } from "react-native";
import { SafeAreaView } from 'react-native';

export default class MoreScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <FlatList
          data={[
            {key: 'This'},
            {key: 'is'},
            {key: 'settings'},
            {key: 'page'},
            {key: 'maybe?'},
            {key: 'IDK'},
            {key: 'it'},
            {key: 'can'},
            {key: 'be'},
            {key: 'whatever'},
            {key: 'we'},
            {key: 'want'}
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
        />
      </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})
