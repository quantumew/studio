import { getPreloadedState } from '../services/storage';
import { TOGGLE_ACCOUNT_MODAL, ADD_ACCOUNT } from './account-list';

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

// Actions
export const hydrateAction = (accountList = [], entryList = []) => {
	return {
		type: HYDRATE,
		accountList,
		entryList
	};
};

export const hydrate = (dispatch) => {
	getPreloadedState().then(initState => {
		initState = initState || {};
		const { accountList, entryList } = initState;

		dispatch(hydrateAction(accountList, entryList));
	});
};
