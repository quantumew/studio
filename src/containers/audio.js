import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Component from '../components/audio';
import { getAudioList, newAudio } from '../reducers/audio-list';

function mapStateToProps (state, props) {
	const { entryId } = props.navigation.state.params;
	return {
		audioList: getAudioList(state, entryId),
		entryId,
	};
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators({
		newAudio,
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
