import cors from '@koa/cors';
import Router from '@koa/router';
import Koa from 'koa';
import logger from 'koa-logger';
import { router as booksMiddleware } from './routes/books';
import { router as bookCoverProxyMiddleware } from './routes/bookCoverProxy';

const app = new Koa();
const router = new Router();

router
	.use('/books/', booksMiddleware.routes())
	.use('/books/', bookCoverProxyMiddleware.routes());

app
	.use(cors({origin: '*'}))
	.use(logger())
	.use(router.routes())
	.use(router.allowedMethods());

app.listen(8080);
