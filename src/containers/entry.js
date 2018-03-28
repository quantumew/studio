import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Component from '../components/entry';
import { removeEntry, editEntry, getEntryForAccountById } from '../reducers/entry-list';
import { getAudioListForEntry } from '../reducers/audio-list';

function mapStateToProps (state, props) {
	const { accountId, id } = props.navigation.state.params;

	return {
		accountId,
		...getEntryForAccountById(state, id),
		audioList: getAudioListForEntry(state, id),
	};
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators({
		editEntry,
		removeEntry,
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
