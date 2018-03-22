import { guidGenerator } from '../utils';

export const ADD_ACCOUNT = 'ADD_ACCOUNT';

export default function reducer (state = [], action) {
	switch (action.type) {
		case ADD_ACCOUNT:
			return [
				...state,
				action.account,
			];
		default:
			return state;
	}
}

// Selectors
export const getAccountList = (state) => state.accountList;

// Actions
export const addAccount = (name) => {
	return {
		type: ADD_ACCOUNT,
		account: {
			id: guidGenerator(),
			name
		}
	};
};
