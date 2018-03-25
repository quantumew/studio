import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Component from '../components/entry';
import { removeEntry, editEntry, getEntryForAccountById } from '../reducers/entry-list';

function mapStateToProps (state, props) {
	const { accountId, id } = props.navigation.state.params;

	return {
		accountId,
		...getEntryForAccountById(state, id)
	};
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators({
		editEntry,
		removeEntry,
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
