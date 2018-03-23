import { getPreloadedState } from '../services/storage';

export const CHANGE_PAGE_TYPE = 'CHANGE_PAGE_TYPE';
export const HYDRATE = 'HYDRATE';

export default function reducer (state = {}, action) {
	switch (action.type) {
		case CHANGE_PAGE_TYPE:
			return {
				...state,
				accountId: action.accountId,
				entryId: action.entryId,
				pageType: action.pageType,
			};
		default:
			return state;
	}
}

// Selectors
export const getPageType = (state) => state.app.pageType;
export const getAccountId = (state) => state.app.accountId;
export const getEntryId = (state) => state.app.entryId;

// Actions
export const changePageType = (pageType, accountId, entryId) => {
	return {
		type: CHANGE_PAGE_TYPE,
		pageType,
		accountId,
		entryId
	};
};

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
