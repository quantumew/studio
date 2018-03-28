import { AsyncStorage } from 'react-native';
import { getAccountList } from '../reducers/account-list';
import { getAudioList } from '../reducers/audio-list';
import { getEntryList } from '../reducers/entry-list';

const storeKeys = [
	'accountList',
	'audioList',
	'entryList',
];

export function getPreloadedState () {
	return AsyncStorage.multiGet(storeKeys, (err, stores) => {
		return stores.reduce((result, item) => {
			const key = item[0];
			const value = item[1];

			result[key] = JSON.parse(value);

			return result;
		}, {});
	});
}

export function save (state) {
	return Promise.all([
		setAccountList(getAccountList(state)),
		setAudioList(getAudioList(state)),
		setEntryList(getEntryList(state)),
	]);
}

export function setAccountList (value) {
	return set('accountList', value);
}

export function setEntryList (value) {
	return set('entryList', value);
}

export function setAudioList (value) {
	return set('audioList', value);
}

export function set (key, value) {
	return AsyncStorage.setItem(key, JSON.stringify(value));
}

export function get (key) {
	return AsyncStorage.getItem(key, (value) => {
		JSON.parse(value);
	});
}
