const { chromium, Page } = require("playwright");
let browser: any;
let page: any;

beforeEach(async () => {
	browser = await chromium.launch();
	page = await browser.newPage();
});
afterEach(async () => {
	await page.close();
	await browser.close();
});

it('should work', async () => {
	await page.goto('https://www.example.com/');
	console.log(await page.title());
});