'use strict';

const _search = {
  init() {
    this.cacheDOM();
  },

  cacheDOM() {
    this.searchBtn = document.getElementById('btnSearch');
    this.searchBtnClose = document.getElementById('closeSearch');
    this.modalSearch = document.querySelector('.modal__search');
    this.modalSub = document.querySelector('.modal__subscribe');
    this.menuMobile = document.querySelector('.nav__menu_links');
    this.navHamburger = document.getElementById('hamburgerMenu');
    this.searchInput = document.getElementById('search');
    this.searchForm = document.querySelector('.form__search');
    this.bindEvents();
  },

  bindEvents() {
    if (this.searchBtn) {
      // Display search events
      this.searchBtn.addEventListener(
        'click',
        () => {
          this.modalSearch.classList.toggle('modal__search--open');
          this.searchBtn.classList.toggle('btn__search--toggle');

          this.menuMobile.classList.remove('active');
          this.navHamburger.classList.remove('nav__menu_hamburger--open');
          this.modalSub.classList.remove('modal__subscribe--open');
          this.modalSub.classList.remove('modal--auto');
          
          this.searchInput.value = '';
          this.searchInput.focus();
        },
        false
      );
      // Search outside click
      this.modalSearch.addEventListener(
        'click',
        e => {
          if (this.modalSearch.classList.contains('modal__search--open') && !e.target.closest('.form')) {
            this.modalSearch.classList.remove('modal__search--open');
            this.searchBtn.classList.toggle('btn__search--toggle');
          }
        },
        false
      );
    }
  }
};

export default _search;