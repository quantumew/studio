import React from 'react';
import PropTypes from 'prop-types';
import Footer from './footer';
import { appStyles } from '../app';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';

export default class Entry extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			textareaHeight: null
		};
	}

	onContentSizeChange = ({ nativeEvent: event }) => {
		this.setState({ textareaHeight: event.contentSize.height });
	};

	removeEntry () {
		const { id, navigation, removeEntry } = this.props;

		navigation.goBack();
		removeEntry(id);
	}

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
				<Footer removeEntry={() => this.removeEntry(id)} />
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
	removeEntry: PropTypes.func.isRequired,
	text: PropTypes.string,
};

const styles = StyleSheet.create({
	entryBody: {
		height: '100%',
		width: '100%'
	}
});
