// Modal Form events
import Cookies from 'js-cookie';

const _modalCookie = {
  init() {
    this.cacheDOM();
  },

  cacheDOM() {
    this.btnModal = document.querySelectorAll('#btnSub');
    this.btnModalClose = document.querySelector('#closeModal');
    this.modal = document.querySelector('.modal--special');
    this.isCollection = document.querySelector('.tax-collection');
    this.isHome = document.querySelector('.blog');
    this.isPost = document.querySelector('.postid-6818');

    if( this.isCollection || this.isHome || this.isPost ) this.bindEvents();
  },

  bindEvents() {
    if (this.btnModal) {
      this.btnModal.forEach(e=>{
        e.addEventListener(
        'click',
        e => {
          e.preventDefault();
          if (this.modal.classList.contains('modal--auto')) {
            this.showModal(this.modal);
          } else {
            this.hideModal(this.modal);
          }
        },
          false
        );
      });
    }

    if (this.btnModalClose) {
      this.btnModalClose.addEventListener(
        'click',
        () => {
          this.hideModal(this.modal);
        },
        false
      );
    }

    if (this.modal) {
      
      // Modal outside click
      document.addEventListener(
        'click',
        e => {
          if (this.modal.classList.contains('modal--auto')
            && !e.target.closest('.modal__form')
            && !e.target.closest('.modal__img')) {
              this.hideModal(this.modal);
          }
        },
        false
      );

      // Modal show after 5 sec
      if (!Cookies.get('labs-modal')) {
        setTimeout(()=> {
          this.showModal(this.modal);
        }, 4000);
      }

      // window.addEventListener(
      //   'blur',
      //   e => {
      //     if (!Cookies.get('labs-modal')) {
      //       e.preventDefault();
      //       e.stopPropagation();
      //       this.showModal(this.modal);
      //     }
      //   },
      //   false
      // );

    }

  },

  hideModal(e) {
    e.classList.remove('modal--auto');
  },

  showModal(e) { 
    Cookies.set('labs-modal', true, { expires: 0.1 });
    e.classList.add('modal--auto');
  }

};

export default _modalCookie;