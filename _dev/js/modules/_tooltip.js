'use strict';

const _tooltip = {
  init() {
    this.cacheDOM();
  },

  cacheDOM() {
    this.elements = document.querySelectorAll('[data-tooltip]');
    this.bindEvents();
  },

  bindEvents() {
    if (this.elements) {
      this.elements.forEach(elm => {
        this.attachTooltip(elm);
      });
    }
  },

  attachTooltip(elm) {
    const text = elm.getAttribute('data-tooltip');
    // this.showTooltip({target: elm}, text)
    elm.addEventListener('mouseover', event => {
      this.showTooltip(event, text);
    });
    elm.addEventListener('mouseout', event => {
      this.hideTooltip(event, text);
    });
  },

  showTooltip(event, text) {
    let tooltip = document.createElement('span');
    tooltip.classList.add('tooltip');
    tooltip.innerHTML = '<p>' + event.target.innerHTML + '</p>' + text;
    event.target.appendChild(tooltip);
    setTimeout(() => {
      tooltip.style.opacity = 1;
    }, 100);
  },

  hideTooltip(event, text) {
    let tooltip = event.target.querySelector('.tooltip');
    tooltip.style.opacity = 0;
    event.target.removeChild(tooltip);
  }
};

export default _tooltip;