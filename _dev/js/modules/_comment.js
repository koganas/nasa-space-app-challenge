'use strict';

const _comment = {
  init() {
    this.cacheDOM();
  },

  cacheDOM() {
    this.cmHeader = document.querySelector('.comment__list_header');
    this.cmHeaderTabs = this.cmHeader ? this.cmHeader.getElementsByTagName('span') : '';
    this.cmList = document.querySelectorAll('.comment__list_items');
    this.commentsToggle();
  },

  commentsToggle() {
    // Comments toggle events
    if (this.cmHeader) {
      this.cmHeader.addEventListener(
        'click',
        () => {
          for (let i = 0; i < this.cmHeaderTabs.length; i++) {
            this.cmHeaderTabs[i].classList.toggle('active');
          }
          this.cmList.forEach(e => {
            if (e.classList.contains('comment__list_items--hide')) {
              e.classList.remove('comment__list_items--display');
              setTimeout(() => {
                e.classList.remove('comment__list_items--hide');
              }, 120);
            } else {
              e.classList.add('comment__list_items--hide');
              setTimeout(() => {
                e.classList.add('comment__list_items--display');
              }, 120);
            }
          });
        },
        false
      );
    }
  }
};

export default _comment;