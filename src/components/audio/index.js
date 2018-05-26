import React from 'react';
import PropTypes from 'prop-types';
import {
	Image,
	ListView,
	ScrollView,
	Slider,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import { appStyles } from '../app';
import Icon from '../entry/icon';

const ICON_PLAY_BUTTON = new Icon(require('../../../assets/play.png'), 70, 70);

export default class Audio extends React.Component {
	constructor (props) {
		super(props);
		this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

		this.state = {
			dataSource: this.ds.cloneWithRows(this.props.audioList),
			idExpanded: null
		};
	}

	componentWillReceiveProps (nextProps) {
		if (nextProps.audioList !== this.props.audioList) {
			this.setState({ dataSource: this.ds.cloneWithRows(nextProps.audioList) });
		}
	}

	renderExpandedAudio (audio) {
		return (
			<View key={audio.id} style={styles.playContainer}>
				<Text style={styles.name}>{audio.name}</Text>
				<View style={styles.textContainer}>
					<Text style={styles.creationDate}>{audio.creationDate}</Text>
					<Text>{audio.duration}</Text>
				</View>
				<View style={styles.seekContainer}>
					<TouchableOpacity style={styles.playBtnContainer}>
						<Image
							style={styles.playBtn}
							source={ICON_PLAY_BUTTON.module}
						/>
					</TouchableOpacity>
					<Text style={styles.durationText}>0:01</Text>
					<Slider style={styles.seekBtn} maximumValue={audio.durationSeconds}/>
					<Text style={styles.durationText}>-0:01</Text>
				</View>
			</View>
		);
	}

	renderAudio (audio) {
		const { isSelected, toggleAudioExpansion } = this.props;
		const containerStyles = [styles.playContainer];

		if (isSelected) {
			containerStyles.push(styles.opaque);
		}

		return (
			<TouchableOpacity key={audio.id} style={containerStyles} onPress={() => toggleAudioExpansion(audio.id)}>
				<Text style={styles.name}>{audio.name}</Text>
				<View style={styles.textContainer}>
					<Text style={styles.creationDate}>{audio.creationDate}</Text>
					<Text>{audio.duration}</Text>
				</View>
			</TouchableOpacity>
		);
	}

	renderAudioList (audio) {
		if (audio.isExpanded) {
			return this.renderExpandedAudio(audio);
		}

		return this.renderAudio(audio);
	}

	render () {
		return (
			<View style={appStyles.container}>
				<ScrollView style={appStyles.content}>
					<ListView
						dataSource={this.state.dataSource}
						renderRow={rowData => this.renderAudioList(rowData)}
					/>
				</ScrollView>
			</View>
		);
	}
}

Audio.navigationOptions = {
	title: 'Audio'
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
	isSelected: PropTypes.bool.isRequired,
	toggleAudioExpansion: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
	creationDate: {
		flex: 1,
	},
	durationText: {
		marginLeft: 5,
		marginRight: 5,
		marginTop: 10,
	},
	name: {
		fontWeight: 'bold',
		fontSize: 18,
		marginBottom: 5,
		marginTop: 10,
	},
	opaque: {
		opacity: 0.3,
	},
	seekBtn: {
		flex: 1
	},
	playBtn: {
		maxWidth: 30,
		maxHeight: 30,
	},
	playBtnContainer: {
		maxHeight: 30,
		marginTop: 3
	},
	seekContainer: {
		borderBottomWidth: 1,
		borderColor: '#d6d7da',
		display: 'flex',
		flexDirection: 'row',
	},
	textContainer: {
		display: 'flex',
		marginBottom: 10,
		flexDirection: 'row',
	},
	playContainer: {
		borderBottomWidth: 1,
		borderColor: '#d6d7da',
		marginRight: 15,
		marginLeft: 15,
	}
});
