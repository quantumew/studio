import React from 'react';
import PropTypes from 'prop-types';
import { appStyles } from '../app';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Swipeout from 'react-native-swipeout';

export default class Entry extends React.Component {
	padTime (str) {
		return str.length === 1 ? `0${str}` : str;
	}

	buildTime () {
		const date = new Date(this.props.timestamp);

		if (date.toDateString() === new Date().toDateString()) {
			const hours = String(date.getHours());
			const min = String(date.getMinutes());
			return `${this.padTime(hours)}:${this.padTime(min)}`;
		}

		const year = new String(date.getFullYear()).slice(2, 4);
		const month = date.getMonth() + 1;
		const day = date.getDate();

		return `${month}/${day}/${year}`;
	}

	getPreviewText () {
		const text = this.props.text;
		const { width } = Dimensions.get('window');
		const maxWidth = width / 8;

		const lineOne = text.split('\n')[0];
		const title = lineOne.slice(0, maxWidth);
		const lineTwoStart = text.indexOf(title) + title.length;
		const lineTwo = text.slice(lineTwoStart, lineTwoStart + maxWidth).replace(/^\n/, '');
		const preview = text.length > title.length ? lineTwo : 'No additional text';

		return {
			preview,
			title,
		};
	}

	render () {
		const { accountId, id, navigate, removeEntry } = this.props;

		const { preview, title } = this.getPreviewText();
		const previewTimestamp = this.buildTime();
		const swipeBtns = [
			{
				text: 'Delete',
				backgroundColor: '#FF0000',
				onPress: () => removeEntry(id)
			}
		];

		return (
			<View style={styles.container}>
				<Swipeout right={swipeBtns} autoClose={true} backgroundColor="transparent">
					<TouchableOpacity
						key={id}
						style={appStyles.entryButton}
						onPress={() => navigate('Entry', { accountId, id })}
					>
						<View style={styles.innerContainer}>
							<Text style={styles.title}>{title}</Text>
							<Text style={styles.previewText} numberOfLines={1} ellipsizeMode="tail">
								{`${previewTimestamp}    ${preview}`}
							</Text>
						</View>
					</TouchableOpacity>
				</Swipeout>
			</View>
		);
	}
}

Entry.defaultProps = {
	text: ''
};

Entry.propTypes = {
	accountId: PropTypes.string.isRequired,
	navigate: PropTypes.func.isRequired,
	id: PropTypes.string.isRequired,
	removeEntry: PropTypes.func.isRequired,
	timestamp: PropTypes.string,
	text: PropTypes.string,
};

const styles = StyleSheet.create({
	container: {
		borderBottomWidth: 1,
		borderColor: '#d6d7da',
	},
	innerContainer: {
		margin: 5
	},
	previewText: {

	},
	title: {
		fontWeight: 'bold',
		marginTop: 5,
		marginBottom: 5,
		fontSize: 16,
	}
});
