// HS forms events
const _forms = {
	init() {
		this.getButton();
	},

	getButton() {
		var counter = 0;
		var interval = setInterval(function() {
			var formClass = document.querySelectorAll('.form__newsletter');

			formClass.forEach(elm => {
				if (elm || counter === 5) {
					var hsButton = elm.querySelector('.hs-button'),
						form = elm.querySelectorAll('form');

					if (hsButton) {
						hsButton.addEventListener(
							'click',
							function() {
								elm.getElementsByTagName('label')[0].style.display = 'none';
							},
							false
						);
						form.forEach(e => {
							e.addEventListener(
								'submit',
								function() {
									elm.getElementsByTagName('label')[0].style.display = 'none';
								},
								false
							);
						});
						clearInterval(interval);
					}
				}
				counter + 1;
			});
		}, 1000);
	}
};

export default _forms;