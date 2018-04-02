import React from 'react';
import { ScrollView, View } from 'react-native';
import AudioButton from './button';
import { Audio, FileSystem, Permissions } from 'expo';
import PropTypes from 'prop-types';
import { appStyles } from '../app';
import Icon from './icon';
import PromptModal from '../prompt-modal';
import { guidGenerator } from '../../utils';

const ICON_RECORD_BUTTON = new Icon(require('../../../assets/record.png'), 70, 70);
const ICON_STOP_BUTTON = new Icon(require('../../../assets/stop.png'), 70, 70);
const ICON_PLAY_BUTTON = new Icon(require('../../../assets/play.png'), 70, 70);
const ICON_PAUSE_BUTTON = new Icon(require('../../../assets/pause.png'), 70, 70);

export default class AudioBar extends React.Component {
	constructor (props) {
		super(props);
		this.recording = null;
		this.state = {
			haveRecordingPermissions: false,
			isLoading: false,
			isPlaybackAllowed: false,
			isSoundMapLoaded: false,
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

		if (!this.state.isSoundMapLoaded) {
			this.loadAudio();
		}
	}

	loadAudio () {
		this.soundMap = {};

		return Promise.all(
			this.props.audioList.map(audio => {
				const soundObject = new Audio.Sound();
				this.soundMap[audio.id] = soundObject;
				// soundObject.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
				return soundObject.loadAsync({ uri: audio.fileName });
			})
		).then(() => {
			this.setState({
				isSoundMapLoaded: true
			});
		});
	}

	async askForPermissions () {
		const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
		this.setState({
			haveRecordingPermissions: response.status === 'granted',
		});
	}

	updateScreenForRecordingStatus (status) {
		if (status.canRecord) {
			this.setState({
				isRecording: status.isRecording,
				recordingDuration: status.durationMillis,
			});
		} else if (status.isDoneRecording) {
			this.setState({
				isRecording: false,
				recordingDuration: status.durationMillis,
			});

			if (!this.state.isLoading) {
				this.stopRecordingAndEnablePlayback();
			}
		}
	}

	updateScreenForSoundStatus (status) {
		if (status.isLoaded) {
			this.setState({
				soundDuration: status.durationMillis,
				soundPosition: status.positionMillis,
				shouldPlay: status.shouldPlay,
				isPlaying: status.isPlaying,
				rate: status.rate,
				muted: status.isMuted,
				volume: status.volume,
				shouldCorrectPitch: status.shouldCorrectPitch,
				isPlaybackAllowed: true,
			});
		} else {
			this.setState({
				soundDuration: null,
				soundPosition: null,
				isPlaybackAllowed: false,
			});

			if (status.error) {
				console.log(`FATAL PLAYER ERROR: ${status.error}`);
			}
		}
	}

	async stopRecordingAndEnablePlayback () {
		this.setState({
			isLoading: true,
		});
		try {
			await this.recording.stopAndUnloadAsync();
		} catch (error) {
			// Do nothing -- we are already unloaded.
		}
		const info = await FileSystem.getInfoAsync(this.recording.getURI());
		const id = guidGenerator();
		this.props.newAudio(info, id);
		await Audio.setAudioModeAsync({
			allowsRecordingIOS: false,
			interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
			playsInSilentModeIOS: true,
			playsInSilentLockedModeIOS: true,
			shouldDuckAndroid: true,
			interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
		});
		const { sound } = await this.recording.createNewLoadedSound(
			{
				isLooping: true,
				isMuted: this.state.muted,
				volume: this.state.volume,
				rate: this.state.rate,
				shouldCorrectPitch: this.state.shouldCorrectPitch,
			},
			status => this.updateScreenForSoundStatus(status)
		);
		this.soundMap[id] = sound;
		this.setState({
			isLoading: false,
		});
	}

	onPausePressed (playingId) {
		this.setState({
			playingId: null,
			isPlaying: false,
		});
		this.soundMap[playingId].pauseAsync();
	}

	onPlayPressed (playingId) {
		if (this.state.isPlaying) {
			this.soundMap[this.state.playingId].pauseAsync();
		}

		this.setState({
			playingId,
			isPlaying: true,
		});
		this.soundMap[playingId].playAsync();
	}

	onStopPressed () {
		this.stopRecordingAndEnablePlayback();
	}

	async onRecordPressed () {
		this.setState({
			isLoading: true,
		});

		if (this.state.isPlaying) {
			const id = this.state.playingId;
			await this.soundMap[id].pauseAsync();
		}

		await Audio.setAudioModeAsync({
			allowsRecordingIOS: true,
			interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
			playsInSilentModeIOS: true,
			shouldDuckAndroid: true,
			interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
		});

		if (this.recording !== null) {
			this.recording.setOnRecordingStatusUpdate(null);
			this.recording = null;
		}

		const recording = new Audio.Recording();
		await recording.prepareToRecordAsync(this.recordingSettings);
		recording.setOnRecordingStatusUpdate(status => this.updateScreenForRecordingStatus(status));

		this.recording = recording;
		await this.recording.startAsync();
		this.setState({
			isLoading: false,
			playingId: null,
			isPlaying: false,
		});
	}

	renderPlay () {
		const { audioList } = this.props;

		if (!this.state.isSoundMapLoaded) {
			return null;
		}

		return audioList.map(audio => {
			if (this.state.playingId === audio.id) {
				return (
					<AudioButton
						key={audio.id}
						onPress={() => this.onPausePressed(audio.id)}
						image={ICON_PAUSE_BUTTON} isDisabled={false}
					/>
				);
			}

			return (
				<AudioButton
					key={audio.id}
					onPress={() => this.onPlayPressed(audio.id)}
					image={ICON_PLAY_BUTTON} isDisabled={false}
				/>
			);
		});
	}

	renderRecorder () {
		if (this.state.isRecording) {
			return (
				<AudioButton
					onPress={() => this.onStopPressed()}
					image={ICON_STOP_BUTTON} isDisabled={false}
				/>
			);
		}

		return (
			<AudioButton
				onPress={() => this.onRecordPressed()}
				image={ICON_RECORD_BUTTON}
				isDisabled={this.state.isLoading}
			/>
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
				<ScrollView horizontal={true}>
					{this.renderRecorder()}
					{this.renderPlay()}
				</ScrollView>
				<PromptModal
					save={name => this.saveAudio(name)}
					close={() => this.setState({ isModalOpen: false })}
					isOpen={this.state.isModalOpen}
				/>
			</View>
		);
	}
}

AudioBar.defaultProps = {
	audioList: []
};

AudioBar.propTypes = {
	audioList: PropTypes.arrayOf(PropTypes.shape({
		fileName: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
	})).isRequired,
	newAudio: PropTypes.func.isRequired,
};
