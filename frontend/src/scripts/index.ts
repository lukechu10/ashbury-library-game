// entrypoint for index.html

import '../styles/index.scss'; // styles
import { API_URL_BASE } from './constants';

fetch(API_URL_BASE); // ping url base to wake up heroku server