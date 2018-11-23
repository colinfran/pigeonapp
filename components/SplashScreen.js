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
				<Image style={{}} source={require('../assets/preloader.gif')} />
			</View>
		)

	}
}
