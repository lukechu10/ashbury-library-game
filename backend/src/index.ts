import cors from '@koa/cors';
import Router from '@koa/router';
import Koa from 'koa';
import logger from 'koa-logger';
import { router as bookCoverProxyMiddleware } from './routes/bookCoverProxy';
import { router as booksMiddleware } from './routes/books';

const app = new Koa();
const router = new Router();

router
	.use('/books/', booksMiddleware.routes())
	.use('/books/', bookCoverProxyMiddleware.routes());

router.get('/ping/', async ctx => {
	ctx.body = "pong";
});

app
	.use(cors({origin: '*'}))
	.use(logger())
	.use(router.routes())
	.use(router.allowedMethods());

const normalizePort = process.env.PORT || 8080;
app.listen(normalizePort);
