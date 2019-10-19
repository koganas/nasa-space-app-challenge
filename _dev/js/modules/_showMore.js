'use strict';

const _showMore = {
  init() {
    this.cacheDOM();
  },

  cacheDOM() {
    this.showBtn = document.querySelector('#showMore');
    this.grid = document.querySelector('.grid--hide');
    this.showPosts();
  },

  showPosts() {
    if (this.grid) {
      this.showBtn.addEventListener(
        'click',
        (e) => {
          console.log(e.target.parentNode);
          e.target.parentNode.classList.remove('grid--hide');
          e.target.style.display = "none";
        },
        false
      );
    }
  }
};

export default _showMore;