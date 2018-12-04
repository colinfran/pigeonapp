import React from "react";
import { View, Text, StyleSheet, Image } from 'react-native';



export default class SplashScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}


	componentDidMount() {
	}

	render() {
		return (
			<View style={{flex:1, justifyContent: 'center',alignItems: 'center',}}>
				<Image style={{width: 200, height: 200}} source={require('../assets/preloader.gif')} />
        <Image style={{width: 136, height:50, paddingTop: 10}} source={require('../assets/loadingtext.gif')} />
			</View>
		)

	}
}
