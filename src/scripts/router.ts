export class Router {
	private static errorMessage = document.createElement('div');

	private static staticConstructor = ((): void => {
		Router.errorMessage.id = 'content';
		Router.errorMessage.innerHTML = '<p>404 - Error loading page</p>';
	})();

	/**
     * Use AJAX to load content of `path` and replace content with loaded data
     * @param path the path to navigate to
     */
	public static async route(path: string): Promise<void> {
		// send http request to get content
		const res = await fetch(path);

		const elem = document.createElement('html');
		elem.innerHTML = await res.text();

		const content = elem.querySelector('#content');
		document.querySelector('#content')!.replaceWith(content ?? Router.errorMessage);
	}

	/**
	 * Attaches Router.route event handler on link click
	 * @param targetQuery the target of the event handler
	 */
	public static attachEventHandlers(targetQuery = 'a[href]'): void {
		document.querySelectorAll(targetQuery).forEach(elem => {
			elem.addEventListener('click', event => {
				event.preventDefault(); // override default behavior
				if (elem.hasAttribute('href')) {
					Router.route(elem.getAttribute('href')!);
				}
			});
		});
	}
}

// @ts-expect-error
window.Router = Router;