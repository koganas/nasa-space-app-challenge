const _riseWater = {
  init() {
    this.cacheDOM();
  },

  cacheDOM() {
    this.header = document.querySelector('.header');
    this.effect = document.querySelector('.waves__water');
    this.riseW();
  },

  riseW() {
    if (this.header != null) {
      this.header.addEventListener(
        'click',
        (e) => {
          this.effect.classList.add('waves__water--up');
          this.header.classList.add('hide');
        },
        false
      );
    }
  }

};

export default _riseWater;