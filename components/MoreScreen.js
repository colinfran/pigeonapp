import React from "react";
import { StyleSheet, Text, View, Dimensions, ListView, FlatList, Platform, StatusBar, ScrollView, Button } from "react-native";
import { SafeAreaView } from 'react-native';
import {SettingsDividerShort, SettingsDividerLong, SettingsEditText, SettingsCategoryHeader, SettingsSwitch, SettingsPicker} from 'react-native-settings-components';
import DialogAndroid from 'react-native-dialogs';
import { logout } from '../api/auth'

export default class MoreScreen extends React.Component {
  constructor(props) {
        super(props);
        this.onLogout = this.onLogout.bind(this);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            allowPushNotifications: false,
        };
        if(Platform.OS === 'ios') {
            StatusBar.setBarStyle('light-content');
        } else {
            StatusBar.setBackgroundColor('#1B0887');
        }
    }
    async onLogout() {
       await logout();
       this.props.navigation.navigate('Login');
     }


    render() {
        return <View style={{flex: 1}}>
            <View style={[{padding: 16, backgroundColor: colors.blueGem},
                (Platform.OS === 'ios') ? {paddingTop: 30, justifyContent: 'center', flexDirection: 'row'} : null]}>
                <Text style={{color: colors.white, fontWeight: 'bold', fontSize: 18}}></Text>
            </View>
            <ScrollView style={{flex: 1, backgroundColor: (Platform.OS === 'ios') ? colors.iosSettingsBackground : colors.white}}>
                <SettingsCategoryHeader title={'My Account'} textStyle={(Platform.OS === 'android') ? {color: colors.monza} : null}/>
                <SettingsDividerLong android={false}/>
                <SettingsEditText
                    title="Email"
                    negativeButtonTitle={'Cancel'}
                    positiveButtonTitle={'Save'}
                    onSaveValue={(value) => {
                        console.log('Email:', value);
                        this.setState({
                            email: value
                        });
                    }}

                    value={this.state.email}
                    dialogAndroidProps={{
                        widgetColor: colors.monza,
                        positiveColor: colors.monza,
                        negativeColor: colors.monza,
                    }}
                />
                <SettingsDividerShort/>
                <SettingsEditText
                    title="First Name"
                    dialogDescription={'Enter your first name.'}
                    valuePlaceholder="..."
                    negativeButtonTitle={'Cancel'}
                    positiveButtonTitle={'Save'}
                    onSaveValue={(value) => {
                        console.log('firstname:', value);
                        this.setState({
                            firstname: value
                        });
                    }}
                    value={this.state.firstname}
                    dialogAndroidProps={{
                        widgetColor: colors.monza,
                        positiveColor: colors.monza,
                        negativeColor: colors.monza,
                    }}
                />
                <SettingsDividerShort/>
                <SettingsEditText
                    title="Last Name"
                    dialogDescription={'Enter your last name.'}
                    valuePlaceholder="..."
                    negativeButtonTitle={'Cancel'}
                    positiveButtonTitle={'Save'}
                    onSaveValue={(value) => {
                        console.log('last name:', value);
                        this.setState({
                            lastname: value
                        });
                    }}
                    value={this.state.lastname}
                    dialogAndroidProps={{
                        widgetColor: colors.monza,
                        positiveColor: colors.monza,
                        negativeColor: colors.monza,
                    }}
                />
                <SettingsDividerShort/>

                <SettingsDividerLong android={false}/>
                <SettingsCategoryHeader title={'Notifications'} textStyle={(Platform.OS === 'android') ? {color: colors.monza} : null}/>
                <SettingsDividerLong android={false}/>
                <SettingsSwitch
                    title={'Allow Push Notifications'}
                    onSaveValue={(value) => {
                        console.log('allow push notifications:', value);
                        this.setState({
                            allowPushNotifications: value
                        });
                    }}
                    value={this.state.allowPushNotifications}
                    thumbTintColor={(this.state.allowPushNotifications) ? colors.switchEnabled : colors.switchDisabled}
                />
                <SettingsDividerLong android={false}/>
                  <Button
           title='Logout'
           onPress={this.onLogout} />
            </ScrollView>
        </View>
    }

}

const colors = {
  iosSettingsBackground: 'rgb(235,235,241)',
  white: '#FFFFFF',
  monza: '#C70039',
  switchEnabled: (Platform.OS === 'android') ? '#C70039' : null,
  switchDisabled: (Platform.OS === 'android') ? '#efeff3' : null,
  switchOnTintColor: (Platform.OS === 'android') ? 'rgba(199, 0, 57, 0.6)' : null,
  blueGem: '#33ADFF',
};
