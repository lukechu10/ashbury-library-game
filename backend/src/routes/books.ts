import Router from '@koa/router';

import mockData from '../model/mock.json';

const router = new Router();

router.get('get', async ctx => {
	const amount: number = ctx.query.amount;
	if (amount === undefined) ctx.throw(400, 'amount required');

	const res = mockData.slice(0, amount);
	ctx.body = res;
});

export { router };
