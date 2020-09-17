// included in all views

import '@webcomponents/webcomponentsjs'; // shadydom and shadycss polyfills
// import * as Turbolinks from 'turbolinks'; // turbolinks spa application
import 'whatwg-fetch'; // window.fetch
import './styles/global.scss'; // global styles

// Turbolinks.start();

document.addEventListener('DOMContentLoaded', () => {
	console.log('Event: DOMContentLoaded');
});
