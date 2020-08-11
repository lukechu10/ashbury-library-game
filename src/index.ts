// styles
import './styles/index.scss';

// polyfills
import 'whatwg-fetch'; // window.fetch

// logic
import { Router } from './scripts/router'; // routing logic

document.addEventListener('DOMContentLoaded', () => {
	// attach routing event handlers
	Router.attachEventHandlers('a');
	console.log('Event: DOMContentLoaded');
});
