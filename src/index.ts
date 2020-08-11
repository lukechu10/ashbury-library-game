// styles
import './styles/index.scss';

// polyfills
import 'whatwg-fetch'; // window.fetch

// turbolinks
import * as Turbolinks from 'turbolinks';
Turbolinks.start();

document.addEventListener('DOMContentLoaded', () => {
	console.log('Event: DOMContentLoaded');
});
