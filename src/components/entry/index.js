import React from 'react';
import PropTypes from 'prop-types';
import { appStyles } from '../app';
import { StyleSheet, TextInput, View } from 'react-native';
import AudioBar from './audio-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

export default class Entry extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			isAudioOpen: false
		};
	}

	newAudio (info, audioId) {
		const { id, newAudio } = this.props;
		const { uri } = info;
		const parts = uri.split('/');
		const name = parts[parts.length - 1];
		newAudio(id, name, uri, audioId);
	}

	render () {
		const { audioList, editEntry, id, text } = this.props;

		return (
			<View style={appStyles.container}>
				<KeyboardAwareScrollView style={appStyles.content} getTextInputRefs={() => [this.text]}>
					<TextInput
						multiline={true} value={text}
						onChangeText={newText => editEntry(id, newText)}
						style={styles.entryBody}
						placeholder="Enter text"
						ref={el => this.text = el}
					/>
				</KeyboardAwareScrollView>
				<AudioBar audioList={audioList} newAudio={(info, id) => this.newAudio(info, id)}/>
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
	newAudio: PropTypes.func.isRequired,
	text: PropTypes.string,
};

const styles = StyleSheet.create({
	entryBody: {
		height: '100%',
		width: '100%',
	}
});
