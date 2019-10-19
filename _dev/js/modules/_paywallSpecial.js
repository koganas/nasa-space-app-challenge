'use strict';

const _paywallSpecial = {
  init() {
    this.cacheDOM();
  },

  cacheDOM() {
    this.readContentBtn = document.getElementById('readContent');
    this.specialContainer = document.querySelector('.special__container');
    this.readBtn = document.getElementById('keepReading');
    this.sendBtn = document.getElementById('btnSend');
    this.bindEvents();
  },

  bindEvents() {
    // Display post events
    if (this.readContentBtn != null) {
      this.readContentBtn.addEventListener(
        'click',
        () => {
          this.specialContainer.classList.remove('special--hd');
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
      var formRead = this.readBtn.parentNode.parentNode.querySelector('.form__paywall_sub');
      this.readBtn.addEventListener(
        'click',
        () => {
          formRead.classList.toggle('form__paywall_sub--open');
          this.classList.add('btn--hide');
          this.readBtn.style.pointerEvents = 'none';
        },
        false
      );
    }

    // Send post by mail
    if (this.sendBtn != null) {
      var mailField = this.sendBtn.parentNode.querySelector('.post__feature_mail_field');
      this.sendBtn.addEventListener(
        'click',
        e => {
          e.preventDefault();
          mailField.classList.toggle('post__feature_mail_field--open');
          mailField.getElementsByTagName('input')[0].focus();
        },
        false
      );
    }
  }
};

export default _paywallSpecial;