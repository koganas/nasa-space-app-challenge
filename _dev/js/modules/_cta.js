const _cta = {
	init() {
		this.cacheDOM();
	},

	cacheDOM() {
		this.ctaArea = document.querySelector('.cta');
		this.ctaBanner = document.querySelector('.cta__banner');
		this.ctaForm = document.querySelector('.cta__form--close');
		this.ctaDownload = document.getElementById('ctaDownload');
		this.ctaSuccess = document.querySelector('.cta__success--close');
		this.bindEvents();
	},

	bindEvents() {
		this.ctaBanner.addEventListener(
			'click',
			e => {
				e.preventDefault();
				this.ctaBanner.classList.toggle('cta__banner--close');
				this.ctaForm.className = 'cta__form';
				this.ctaDownload.getElementsByTagName('input')[0].focus();
			},
			false
		);

		if (this.ctaDownload.getElementsByTagName('button')[0]) {
			this.ctaDownload.getElementsByTagName('button')[0].addEventListener(
				'click',
				e => {
					e.preventDefault();
					this.ctaForm.className = 'cta__form--close';
					this.ctaSuccess.className = 'cta__success';
				},
				false
			);
		}
	}
};

export default _cta;
