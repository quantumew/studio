import { StyleSheet } from 'react-native';
import Home from '../containers/home';
import EntryList from '../containers/entry-list';
import Entry from '../containers/entry';
import { StackNavigator } from 'react-navigation';

const App = StackNavigator({
	Home: { screen: Home },
	EntryList: { screen: EntryList },
	Entry: { screen: Entry },
});

export default App;
export const appStyles = StyleSheet.create({
	container: {
		height: '100%'
	},
	footerContainer: {
		display: 'flex',
		flexShrink: 0,
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	content: {
		display: 'flex',
		flexGrow: 1,
		flexShrink: 0,
		flexBasis: 'auto',
	},
	entryButton: {
		width: '100%',
		justifyContent: 'flex-start'
	},
	header: {
		fontSize: 20,
		top: 70,
		left: 10,
	},
	flexCenter: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center',
	},
	flexCenterBottom: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'flex-end',
		alignContent: 'center',
		alignItems: 'center',
	}
});
