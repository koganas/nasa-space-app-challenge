'use strict';

const _paywall = {
  init() {
    this.cacheDOM();
  },

  cacheDOM() {
    this.readContentBtn = document.getElementById('readContent');
    this.postContainer = document.querySelector('.post__container');
    this.readBtn = document.getElementById('keepReading');
    this.playBtn = document.getElementById('playAudio');
    this.bindEvents();
  },

  bindEvents() {
    // Display post events
    if (this.readContentBtn != null) {
      this.readContentBtn.addEventListener(
        'click',
        () => {
          this.postContainer.classList.remove('post__container--hd');
          this.classList.add('btn--hide');
          setTimeout(() => {
            this.readContentBtn.style.display = 'none';
          }, 200);
        },
        false
      );
    }

    // Paywall subscribe
    if (this.readBtn != null) {
      const formRead = this.readBtn.parentNode.parentNode.querySelector('.form__paywall_sub');
      this.readBtn.addEventListener(
        'click',
        e => {
          formRead.classList.toggle('form__paywall_sub--open');
          e.target.classList.add('btn--hide');
          this.readBtn.style.pointerEvents = 'none';
        },
        false
      );
    }

    if (this.playBtn != null) {
      this.playBtn.addEventListener('click', openFormAudio);
    }

  }
};

function openFormAudio() {
  const formAudio = _paywall.playBtn.parentNode.parentNode.parentNode.parentNode.querySelector('.form__paywall_sub');
  formAudio.classList.add('form__paywall_sub--open');
  _paywall.playBtn.removeEventListener('click', openFormAudio);
  //playBtn.style.pointerEvents = 'none'
}

export default _paywall;