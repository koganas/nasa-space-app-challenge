'use strict';

const _fillUrlSubmitted = {
  init() {
    this.cacheDOM();
  },

  cacheDOM() {
    this.inputs = document.querySelectorAll('.hs-labs_url_form_submitted');
    this.fillForm();
  },

  fillForm() {
    if (window.NodeList && !NodeList.prototype.forEach) {
      NodeList.prototype.forEach = Array.prototype.forEach;
    }
    this.inputs.forEach((e)=>{
      const input = e.querySelector('input[type="hidden"]');
      input.value = input.baseURI;
      input.setAttribute('value', input.baseURI);
    });
  }
};

export default _fillUrlSubmitted;