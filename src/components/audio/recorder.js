import React from 'react';
import {
	Dimensions,
	Image,
	Slider,
	StyleSheet,
	Text,
	Button,
	TouchableHighlight,
	View,
} from 'react-native';
import Expo, { Asset, Audio, FileSystem, Font, Permissions } from 'expo';
import { appStyles } from '../app';

class Icon {
	constructor (module, width, height) {
		this.module = module;
		this.width = width;
		this.height = height;
		Asset.fromModule(this.module).downloadAsync();
	}
}

const ICON_RECORD_BUTTON = new Icon(require('../../../assets/mic.png'), 70, 70);
// const ICON_RECORDING = new Icon(require('./assets/images/recording.png'), 20, 14);

const ICON_PLAY_BUTTON = new Icon(require('../../../assets/play.png'), 34, 51);
const ICON_STOP_BUTTON = new Icon(require('../../../assets/stop.png'), 22, 22);

export default class App extends React.Component {
	constructor (props) {
		super(props);
		this.recording = null;
		this.sound = null;
		this.isSeeking = false;
		this.shouldPlayAtEndOfSeek = false;
		this.state = {
			haveRecordingPermissions: false,
			isLoading: false,
			isPlaybackAllowed: false,
			soundPosition: null,
			soundDuration: null,
			recordingDuration: null,
			shouldPlay: false,
			isPlaying: false,
			isRecording: false,
			shouldCorrectPitch: true,
			volume: 1.0,
			rate: 1.0,
		};
		this.recordingSettings = JSON.parse(JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY));
	}

	componentDidMount () {
		this.askForPermissions();
	}

	askForPermissions () {
		return Permissions.askAsync(Permissions.AUDIO_RECORDING).then(response => {
			return this.setState({
				haveRecordingPermissions: response.status === 'granted',
			});
		});
	}

	renderRecorder () {
		return (
			<TouchableHighlight
				onPress={this._onRecordPressed}
				disabled={this.state.isLoading}
				style={styles.recordButton}
			>
				<Image
					style={styles.recordButton}
					source={ICON_RECORD_BUTTON.module}
				/>
			</TouchableHighlight>
		);
	}

	render () {
		// if (!this.state.haveRecordingPermissions) {
		// 	return (
		// 		<View>
		// 			<Text>
		// 				You must enable audio recording permissions in order to use this app.
		// 			</Text>
		// 		</View>
		// 	);
		// }

		return (
			<View style={appStyles.footerContainer}>
				{this.renderRecorder()}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	recordButton: {
		maxWidth: ICON_RECORD_BUTTON.width,
		maxHeight: ICON_RECORD_BUTTON.height
	}
});
