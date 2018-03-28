import React from 'react';
import PropTypes from 'prop-types';
import { Button, View } from 'react-native';
import { appStyles } from '../app';

export default class Footer extends React.Component {
	render () {
		const { newRecording, openAudio } = this.props;

		return (
			<View style={appStyles.footerContainer}>
				<Button title="New Recording" onPress={() => newRecording()}/>
				<Button title="Audio" onPress={() => openAudio()}/>
			</View>
		);
	}
}

Footer.propTypes = {
	newRecording: PropTypes.func.isRequired,
	openAudio: PropTypes.func.isRequired,
};

