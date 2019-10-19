const _filter = {
  init() {
    this.cacheDOM();
  },

  cacheDOM() {
    this.filterList = document.querySelectorAll('.filter__list');
    this.bindActive();
  },

  bindActive() {
    if (this.filterList != null) {
      this.filterList.forEach(item => {
        var list = item.querySelectorAll('li');
        list.forEach(li => {
          li.addEventListener(
            'click',
            () => {
              this.classList.toggle('active');
            },
            false
          );
        });
      });
    }
  }
};

export default _filter;