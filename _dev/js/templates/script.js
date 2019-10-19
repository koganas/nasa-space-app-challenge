'use strict';

import _menu from '../modules/_menu';
import _search from '../modules/_search';
import _filter from '../modules/_filter';
import _push from '../modules/_push';

import _modal from '../modules/_modal';
import _modalCookie from '../modules/_modalCookie';
import _smoothScroll from '../modules/_scroll';

import _forms from '../modules/_forms';
import _shareForm from '../modules/_shareForm';
import _fillUrlSubmitted from '../modules/_fillUrlSubmitted';
import _hsFormInterceptor from '../modules/_hsFormInterceptor';
import '../modules/_flexibility';
//import _cta from '../modules/_cta';

(() => {
  const core = {
    init() {
      _menu.init();
      _search.init();
      _filter.init();
      _push.init();
      _modal.init();
      _modalCookie.init();
      _smoothScroll.init();
      _forms.init();
      _shareForm.init();
      _hsFormInterceptor.init();
      setTimeout(() => {
        _fillUrlSubmitted.init();
      }, 1000);
    }
  };

  core.init();
})();
