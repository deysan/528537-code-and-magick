'use strict';

(function () {

  window.util = {
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,

    getRandomElementFromArray: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    }

  };

})();
