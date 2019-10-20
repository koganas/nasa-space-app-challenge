'use strict';

import _tooltip from '../modules/_tooltip';
import _poll from '../modules/_poll';
import _slider from '../modules/_slider';

(() => {
  const core = {
    init() {
      _tooltip.init();
      _poll.init();
      _slider.init();
    }
  };
  core.init();
})();
