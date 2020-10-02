import { router } from './books';
import got from 'got';

router.get('imageProxy', async ctx => {
	const imageUrl: string = ctx.query.imageUrl;
	if (imageUrl === undefined) ctx.throw(400, 'invalid imageUrl query');

	const res = await got(imageUrl);
	ctx.type = 'jpg';
	ctx.body = res.rawBody;
});

export { router };