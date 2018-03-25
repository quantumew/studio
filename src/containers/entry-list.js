import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Component from '../components/entry-list';
import { newEntry, getEntryListForAccount } from '../reducers/entry-list';

function mapStateToProps (state, props) {
	const { accountId, accountName } = props.navigation.state.params;
	return {
		accountId,
		accountName,
		entryList: getEntryListForAccount(state, accountId)
	};
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators({
		newEntry
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
