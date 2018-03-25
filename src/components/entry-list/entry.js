import React from 'react';
import PropTypes from 'prop-types';
import { appStyles } from '../app';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

export default class Entry extends React.Component {
	buildTime () {
		const date = new Date(this.props.timestamp);

		if (date.toDateString() === new Date().toDateString()) {
			return `${date.getHours()}:${date.getMinutes()}`;
		}

		const year = new String(date.getFullYear()).slice(2, 4);
		const month = date.getMonth() + 1;
		const day = date.getDate();

		return `${month}/${day}/${year}`;
	}

	render () {
		const { accountId, id, name, navigate, text } = this.props;

		const preview = text ? text : 'No additional text';
		const previewTimestamp = this.buildTime();

		return (
			<View style={styles.container}>
				<TouchableHighlight
					key={id}
					style={appStyles.entryButton}
					onPress={() => navigate('Entry', { accountId, id })}
				>
					<View>
						<Text style={styles.title}>{name}</Text>
						<Text style={styles.previewText} ellipsizeMode="tail">
							{`${previewTimestamp}    ${preview.slice(0, 20)}`}
						</Text>
					</View>
				</TouchableHighlight>
			</View>
		);
	}
}

Entry.defaultProps = {
	text: ''
};

Entry.propTypes = {
	accountId: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	navigate: PropTypes.func.isRequired,
	id: PropTypes.string.isRequired,
	timestamp: PropTypes.string,
	text: PropTypes.string,
};

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderColor: '#d6d7da',
	},
	previewText: {

	},
	title: {
		fontWeight: 'bold'
	}
});
