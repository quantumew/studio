import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { appStyles } from '../app';

export default class Audio extends React.Component {
	renderAudio () {
		const { audioList } = this.props;

		return audioList.map(audio => {
			return (
				<View key={audio.id} style={styles.playContainer}>
					<Text style={styles.name}>{audio.name}</Text>
					<View>
						<Text>{audio.creationDate}</Text>
						<Text>{audio.duration}</Text>
					</View>
				</View>
			);
		});
	}

	render () {
		return (
			<View style={appStyles.container}>
				<ScrollView style={appStyles.content}>
					{ this.renderAudio() }
				</ScrollView>
			</View>
		);
	}
}

Audio.navigationOptions = {
	title: 'Music Studio'
};

Audio.defaultProps = {
	audioList: []
};

Audio.propTypes = {
	audioList: PropTypes.arrayOf(PropTypes.shape({
		fileName: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
	})).isRequired,
	entryId: PropTypes.string.isRequired,
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired
	}),
	newAudio: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
	name: {
		fontWeight: 'bold'
	},
	playContainer: {
		height: 50,
		borderBottomWidth: 1,
		borderColor: '#d6d7da',
	}
});
