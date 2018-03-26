import React from 'react';
import PropTypes from 'prop-types';
import { appStyles } from '../app';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';

export default class Entry extends React.Component {
	render () {
		const { editEntry, id, text } = this.props;

		return (
			<View style={appStyles.container}>
				<ScrollView style={appStyles.content}>
					<TextInput
						multiline={true} value={text}
						onChangeText={newText => editEntry(id, newText)}
						style={styles.entryBody}
					/>
				</ScrollView>
			</View>
		);
	}
}

Entry.propTypes = {
	accountId: PropTypes.string.isRequired,
	editEntry: PropTypes.func.isRequired,
	id: PropTypes.string,
	navigation: PropTypes.shape({
		goBack: PropTypes.func.isRequired
	}),
	text: PropTypes.string,
};

const styles = StyleSheet.create({
	entryBody: {
		height: '100%',
		width: '100%'
	}
});
