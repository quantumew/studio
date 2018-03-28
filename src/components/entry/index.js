import React from 'react';
import PropTypes from 'prop-types';
import { appStyles } from '../app';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
import AudioBar from './audio-bar';
import Footer from './footer';

export default class Entry extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			isAudioOpen: false
		};
	}

	render () {
		const { audioList, editEntry, id, newRecording, text } = this.props;

		return (
			<View style={appStyles.container}>
				<ScrollView style={appStyles.content}>
					<TextInput
						multiline={true} value={text}
						onChangeText={newText => editEntry(id, newText)}
						style={styles.entryBody}
					/>
				</ScrollView>
				{this.state.isAudioOpen && <AudioBar audioList={audioList}/>}
				<Footer newRecording={newRecording} openAudio={() => this.setState({ isAudioOpen: true })}/>
			</View>
		);
	}
}

Entry.propTypes = {
	accountId: PropTypes.string.isRequired,
	audioList: PropTypes.arrayOf(PropTypes.shape({
		fileName: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
	})).isRequired,
	editEntry: PropTypes.func.isRequired,
	id: PropTypes.string,
	navigation: PropTypes.shape({
		goBack: PropTypes.func.isRequired
	}),
	newRecording: PropTypes.func.isRequired,
	text: PropTypes.string,
};

const styles = StyleSheet.create({
	entryBody: {
		height: '100%',
		width: '100%',
	}
});
