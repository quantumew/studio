import { AsyncStorage } from 'react-native';

const stores = [
	'accountList',
	'entryList'
];

export function getPreloadedState () {
	const promiseList = stores.map(key => {
		return get(key).then(result => {
			return { [key]: result };
		});
	});

	return Promise.all(promiseList).then(resultList => {
		resultList.reduce((resultMap, result) => {
			return {
				...resultMap,
				...result
			};
		}, {});
	});
}

export function setAccountList (value) {
	set('accountList', value);
}

export function setEntryList (value) {
	set('entryList', value);
}

export function set (key, value) {
	return AsyncStorage.setItem(key, JSON.stringify(value));
}

export function get (key) {
	return AsyncStorage.getItem(key, (value) => {
		JSON.parse(value);
	});
}
