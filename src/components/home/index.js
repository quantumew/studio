import React from 'react';
import PropTypes from 'prop-types';
import Footer from './footer';

export default class GroupList extends React.Component {
	renderGroupings () {
		return this.props.groupingList.map(group => {
			<Button style={styles.groupButton} title={group.name} onPress={() => this.openGroup()}/>
		});
	}

	render () {
		return (
			<Footer />
		);
	}
}

GroupList.propTypes = {
	groupingList: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string,
		id: PropTypes.string
	}))
};

const styles = StyleSheet.create({
	groupButton: {
		width: '100%'
	}
});
