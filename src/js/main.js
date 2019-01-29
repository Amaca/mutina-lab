/* jshint esversion: 6 */
/* global jQuery */

import Highway from '@dogstudio/highway';
import ContextualTransition from './highway/contextual-transition';
import CustomRenderer from './highway/custom-renderer';
import CustomTransition from './highway/custom-transition';
import Dom from './shared/dom';
export default class Main {

	constructor() {}

	init() {
		let header,
			html;
		const body = document.querySelector('body');
		html = document.documentElement;
		header = document.querySelector('.header');

		Dom.detect(body);

		//const lights1 = new Lights({ selector: '#canvas1' });
		//const lights2 = new Lights({ selector: '#canvas2', diffuse: 'img/image_bg.jpg' });

		imagesLoaded(document.querySelector('.wrapper'), function(instance) {
			body.classList.remove('loading');
		});

		const H = new Highway.Core({
			renderers: {
				name: CustomRenderer
			},
			transitions: {
				name: CustomTransition,
				contextual: {
					foo: ContextualTransition
				}
			}
		});
	}
}

let main = new Main();

window.onload = () => {
	main.init();
};
