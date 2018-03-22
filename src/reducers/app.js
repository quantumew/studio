import { getPreloadedState } from '../services/storage';
import { TOGGLE_ACCOUNT_MODAL, ADD_ACCOUNT, getAccountList } from './account-list';
import { getAudioList } from './audio-list';
import { getEntryList } from './entry-list';

export const HYDRATE = 'HYDRATE';

export default function reducer (state = {}, action) {
	switch (action.type) {
		case ADD_ACCOUNT:
		case TOGGLE_ACCOUNT_MODAL:
			return {
				...state,
				isAccountModalOpen: !state.isAccountModalOpen
			};
		default:
			return state;
	}
}

// Selectors
export const getPageType = (state) => state.app.pageType;
export const getIsAccountModalOpen = state => state.app.isAccountModalOpen;
export const stateHasDiff = (a = {}, b = {}) => {
	const audio = getAudioList(a) !== getAudioList(b);
	const account = getAccountList(a) !== getAccountList(b);
	const entry = getEntryList(a) !== getEntryList(b);

	return audio || account || entry;
};

// Actions
export const hydrateAction = (accountList = [], audioList = [], entryList = []) => {
	return {
		type: HYDRATE,
		accountList,
		audioList,
		entryList
	};
};

export const hydrate = (dispatch) => {
	getPreloadedState().then(initState => {
		initState = initState || {};
		const { accountList, audioList, entryList } = initState;

		dispatch(hydrateAction(accountList, audioList, entryList));
	});
};
