import { chromium, Browser, Page } from 'playwright';
let browser: Browser;
let page: Page;

beforeEach(async () => {
	browser = await chromium.launch({
		args: ['--no-sandbox'], // for use on https://gitpod.io
		headless: false
	});

	page = await browser.newPage();
	await page.goto('https://www.example.com/');
});
afterEach(async () => {
	await page.close();
	await browser.close();
});

it('should work', async () => {
	console.log(await page.title());
});