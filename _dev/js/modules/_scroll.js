import smoothScroll from 'smoothscroll';

const _smoothScroll = {
	init() {
		this.cacheDOM();
	},

	cacheDOM() {
		this.links = document.querySelectorAll('a[href^="#"]');
		this.scroll();
	},

	scroll() {
		this.links.forEach(link => {
			link.addEventListener('click', event => {
				const { target } = event,
					id = target.getAttribute('href').replace('#', '');
				event.preventDefault();
				event.stopPropagation();
				smoothScroll(document.getElementById(id));
			});
		});
	}
};

export default _smoothScroll;