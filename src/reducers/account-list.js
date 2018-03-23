import { guidGenerator } from '../utils';
import { HYDRATE } from './app';

export const ADD_ACCOUNT = 'ADD_ACCOUNT';

export default function reducer (state = [], action) {
	switch (action.type) {
		case HYDRATE:
			return action.accountList;
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
