import { Asset } from 'expo';

export default class Icon {
	constructor (module, width, height) {
		this.module = module;
		this.width = width;
		this.height = height;
		Asset.fromModule(this.module).downloadAsync();
	}
}
