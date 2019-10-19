'use strict';

const _shareForm = {
  init() {
    this.cacheDOM();
  },

  cacheDOM() {
    this.sendBtn = document.getElementById('btnSend');
    this.bindEvents();
  },

  bindEvents() {
    // Send post by mail
    if (this.sendBtn != null) {
      const mailField = this.sendBtn.parentNode.querySelector('.article__share');
      this.sendBtn.addEventListener(
        'click',
        e => {
          e.preventDefault();
          mailField.classList.toggle('article__share--open');
          mailField.getElementsByTagName('input')[0].focus();
        },
        false
      );
    }  
  }

};

export default _shareForm;