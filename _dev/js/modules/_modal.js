'use strict';

const _modal = {
  init() {
    this.cacheDOM();
  },

  cacheDOM() {
    this.subBtn = document.getElementById('btnSub');
    this.subBtnClose = document.getElementById('closeModal');
    this.modalSub = document.querySelector('.modal__subscribe');
    this.searchBtn = document.getElementById('btnSearch');
    this.modalSearch = document.querySelector('.modal__search');
    this.menuMobile = document.querySelector('.nav__menu_links');
    this.navHamburger = document.getElementById('hamburgerMenu');
    this.formInputs = this.modalSub ? this.modalSub.getElementsByTagName('input') : '';
    this.bindEvents();
  },

  bindEvents() {
    if (this.subBtn) {
      // Display form events
      this.subBtn.addEventListener(
        'click',
        () => {
          this.modalSub.classList.toggle('modal__subscribe--open');
          this.subBtn.classList.toggle('btn__sub--toggle');
          
          this.searchBtn.classList.remove('btn__search--toggle');
          this.navHamburger.classList.remove('nav__menu_hamburger--open');
          this.menuMobile.classList.remove('active');
          this.modalSearch.classList.remove('modal__search--open');

          this.formInputs[0].value = '';
          this.formInputs[1].value = '';
          this.formInputs[1].focus();
        },
        false
      );
      // Close with outside click
      this.modalSub.addEventListener(
        'click',
        e => {
          if ( this.modalSub.classList.contains('modal__subscribe--open')
            && !e.target.closest('.modal__form')
            && !e.target.closest('.modal__img')) {
            this.modalSub.classList.remove('modal__subscribe--open');
            this.subBtn.classList.toggle('btn__sub--toggle');
            this.formInputs[0].value = '';
            this.formInputs[1].value = '';
          }
        },
        false
      );
    }
  }
};

export default _modal;