'use strict';

import _waves from '../modules/_waves';
import _poll from '../modules/_poll';

(() => {
  const core = {
    init() {
      _waves.init();
      _poll.init();
    }
  };

  core.init();
})();
