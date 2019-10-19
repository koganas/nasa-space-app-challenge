const _debounce = (func, wait, immediate) => {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

export default _debounce;

var wrap = (query, tag) => {
  document.querySelectorAll(query).forEach(elem => {
    const div = document.createElement(tag);
    elem.parentElement.insertBefore(div, elem);
    div.appendChild(elem);
  });
};