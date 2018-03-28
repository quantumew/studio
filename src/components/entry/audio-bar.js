import React from 'react';
import { ScrollView, View } from 'react-native';
import { appStyles } from '../app';
import PropTypes from 'prop-types';
import Player from '../audio/player';

export default class AudioBar extends React.Component {
	renderAudio () {
		return this.props.audioList.map(audio => {
			return (
				<Player key={audio.name} fileName={audio.fileName}/>
			);
		});
	}

	render () {
		return (
			<View style={appStyles.footerContainer}>
				<ScrollView horizontal={true}>
					{this.renderAudio()}
				</ScrollView>
			</View>
		);
	}
}

AudioBar.propTypes = {
	audioList: PropTypes.arrayOf(PropTypes.shape({
		fileName: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
	})).isRequired,
};
