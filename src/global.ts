// included in all views

// global styles
import './styles/global.scss';
// turbolinks
import * as Turbolinks from 'turbolinks';
// polyfills
import 'whatwg-fetch'; // window.fetch
import '@webcomponents/shadydom'; // shadow dom

Turbolinks.start();

document.addEventListener('DOMContentLoaded', () => {
	console.log('Event: DOMContentLoaded');
});
