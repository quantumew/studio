import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Component from '../components/entry-list';
import { changePageType, getAccountId } from '../reducers/app';
import { getEntryForAccountById } from '../reducers/entry-list';

function mapStateToProps (state) {
	const accountId = getAccountId;
	return {
		accountId,
		entryList: getEntryForAccountById(state, accountId)
	};
}

function mapDispatchToProps () {
	return bindActionCreators({
		changePageType
	});
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
