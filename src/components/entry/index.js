import React from 'react';
import PropTypes from 'prop-types';
import Footer from './footer';

export default class Entry extends React.Component {
	render () {
		return (
			<Footer addEntry={this.props.addEntry} />
		);
	}
}

Entry.propTypes = {
	addEntry: PropTypes.func.isRequired,
	text: PropTypes.string
};
