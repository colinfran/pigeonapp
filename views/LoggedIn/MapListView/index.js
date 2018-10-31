import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import TopBarNav from 'top-bar-nav';
import { Ionicons } from '@expo/vector-icons'; //https://ionicons.com/

import MapScreen from '../../../components/MapScreen';
import ListScreen from '../../../components/ListScreen';

//---------------------------------------------------------------------------

// routes for MapList to switch between map and list
const ROUTES = {
	MapScreen, ListScreen
};

const ROUTESTACK = [
	{ text: <Ionicons name='ios-map' size={27} color={"#ffff"} />, title: 'MapScreen' },
	{ text: <Ionicons name='ios-list' size={27} color={"#ffff"} />, title: 'ListScreen' } // title is just the name of the Component being rendered.  See the renderScene property below
];

export default class MapList extends React.Component {
	render() {
		return (
			<View style={{ flex: 1 }}>
				<TopBarNav
					routeStack={ROUTESTACK}
					renderScene={(route, i) => {
						// This is a lot like the now deprecated Navigator component
						let Component = ROUTES[route.title];
						return <Component index={i} />;
					}}
					headerStyle={[styles.headerStyle, { paddingTop: 30 }]}
					labelStyle={styles.labelStyle}
					underlineStyle={styles.underlineStyle}
					imageStyle={styles.imageStyle}
					sidePadding={40}
					inactiveOpacity={1}
					fadeLabels={true}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	headerStyle: {
		borderBottomWidth: 1,
		borderColor: '#DCDCDC',
		backgroundColor: '#33ADFF'
	},
	labelStyle: {
		fontSize: 15,
		fontWeight: '500',
		color: '#fff'
	},
	imageStyle: {
		height: 20,
		width: 20,
		tintColor: '#e6faff'
	},
	underlineStyle: {
		height: 3.6,
		backgroundColor: '#e6faff',
		width: 40
	}
});
