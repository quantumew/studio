import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Component from '../components/entry';
import { changePageType, getAccountId, getEntryId } from '../reducers/app';
import { getEntry } from '../reducers/entry-list';

function mapStateToProps (state, props) {
	const accountId = getAccountId(state);
	const entryId = getEntryId(state);

	return {
		accountId,
		entryId,
		...getEntry(state, entryId)
	};
}

function mapDispatchToProps () {
	return bindActionCreators({
		changePageType
	});
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
