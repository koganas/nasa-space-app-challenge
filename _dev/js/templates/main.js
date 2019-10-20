'use strict';

import _tooltip from '../modules/_tooltip';
import _poll from '../modules/_poll';

(() => {
  const core = {
    init() {
      _tooltip.init();
      _poll.init();
    }
  };

  core.init();
})();
