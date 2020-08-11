// included in all views

// global styles
import './styles/global.scss';

// polyfills
import 'whatwg-fetch'; // window.fetch

// turbolinks
import * as Turbolinks from 'turbolinks';
Turbolinks.start();

document.addEventListener('DOMContentLoaded', () => {
	console.log('Event: DOMContentLoaded');
});
