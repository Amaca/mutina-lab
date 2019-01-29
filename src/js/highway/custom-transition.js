/* jshint esversion: 6 */

import Highway from '@dogstudio/highway';
import 'gsap/CSSPlugin';
import TweenLite from 'gsap/TweenLite';

class CustomTransition extends Highway.Transition { in ({ from, to, done }) {
		// Reset Scroll
		window.scrollTo(0, 0);

		// Animation
		TweenLite.fromTo(to, 0.5, { opacity: 0 }, {
			opacity: 1,
			onComplete: done
		});

		// Animation
		TweenLite.fromTo(from, 0.5, { opacity: 1 }, {
			opacity: 0,
			onComplete: () => {
				// Set New View in DOM Stream
				to.style.position = 'static';

				// Remove Old View
				from.remove();
			}
		});
	}

	out({ done }) {
		done();
	}
}

// Don`t forget to export your transition
export default CustomTransition;
