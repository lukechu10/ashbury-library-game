import Koa from 'koa';
import Router from '@koa/router';
import logger from 'koa-logger';

import {router as booksMiddleware} from './routes/books';

const app = new Koa();
const router = new Router();

router.use('/books/', booksMiddleware.routes());

app
	.use(logger())
	.use(router.routes())
	.use(router.allowedMethods());

app.listen(8080);
