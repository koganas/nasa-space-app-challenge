'use strict';

import _debounce from './_utils';

const _menu = {
  init() {
    this.cacheDOM();
  },

  cacheDOM() {
    this.navLogo = document.getElementById('navLogo');
    this.navLogoSm = document.getElementById('navLogoSm');
    this.header = document.getElementsByTagName('header')[0];

    this.navHamburger = document.getElementById('hamburgerMenu');
    this.menuMobile = document.querySelector('.nav__menu_links');
    this.modalSearch = document.querySelector('.modal__search');
    this.modalSub = document.querySelector('.modal__subscribe');
    this.searchBtn = document.getElementById('btnSearch');
    this.sectionLink = document.querySelectorAll('.menu-item-has-children');
    this.specialLink = document.querySelectorAll('.menu-item');

    // Nav events
    window.addEventListener('scroll', () => {
      _debounce(this.navChange(), 50);
    });
    window.addEventListener('resize', () => {
      _debounce(this.resizeMenu(), 50);
    });
    this.mobileMenu();
    this.childMenu();

    if (document.getElementsByTagName('header')[0].classList.contains('nav__special')) {
      this.specialMenu();
    }
  },

  navChange() {
    const scrollPosY = window.pageYOffset || document.body.scrollTop;
    if (scrollPosY <= 150) {
      if (this.navLogo) {
        this.navLogo.className = 'nav__logo_lg';
        this.navLogoSm.className = 'nav__logo_sm hide';
      }
      if (window.innerWidth > 768 && window.innerWidth < 994 && this.header.classList.contains('nav__special')) {
        this.header.style.maxHeight = '100px';
      } else if (window.innerWidth > 768 && !this.header.classList.contains('nav__special')) {
        this.header.style.maxHeight = '88px';
      }
    } else {
      if (this.navLogo) {
        this.navLogo.className = 'nav__logo_lg hide';
        this.navLogoSm.className = 'nav__logo_sm';
      }
      if (window.innerWidth > 768 && window.innerWidth < 994 && this.header.classList.contains('nav__special')) {
        this.header.style.maxHeight = '100px';
      } else {
        this.header.style.maxHeight = '58px';
      }
    }
  },

  resizeMenu() {
    if (window.innerWidth > 768 && window.innerWidth < 994 && this.header.classList.contains('nav__special')) {
      this.header.style.maxHeight = '100px';
    } else if (window.innerWidth > 768 && !this.header.classList.contains('nav__special')) {
      this.header.style.maxHeight = '88px';
    } else {
      this.header.style.maxHeight = '58px';
    }
  },

  mobileMenu() {
    this.navHamburger.addEventListener(
      'click',
      () => {
        this.navHamburger.classList.toggle('nav__menu_hamburger--open');
        this.menuMobile.classList.toggle('active');
        if (this.searchBtn) {
          this.searchBtn.classList.remove('btn__search--toggle');
          this.modalSearch.classList.remove('modal__search--open');
          this.modalSub.classList.remove('modal__subscribe--open');
        }
      },
      false
    );
  },

  childMenu() {
    this.sectionLink.forEach(item=> {
      item.addEventListener(
        'click',
        e => {
          e.target.classList.toggle('active');
        },
        false
      );
    });
  },

  specialMenu() {
    this.specialLink.forEach(item=> {
      if (!item.classList.contains('menu-item-has-children')) {
        item.getElementsByTagName('a')[0].addEventListener(
          'click',
          () => {
            this.navHamburger.classList.remove('nav__menu_hamburger--open');
            this.menuMobile.classList.remove('active');
          },
          false
        );
      }
    });
  }
};

export default _menu;