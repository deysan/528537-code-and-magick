'use strict';

(function () {

  var URL = {
    load: 'https://js.dump.academy/code-and-magick/data',
    save: 'https://js.dump.academy/code-and-magick'
  };

  // Обработчик ошибок
  var error = function (errorMessage) {
    var popup = document.createElement('div');
    popup.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    popup.style.position = 'absolute';
    popup.style.left = 0;
    popup.style.right = 0;
    popup.style.fontSize = '30px';
    popup.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', popup);
  };

  var server = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;
  };

  // Загружка данных
  var load = function (onLoad, onError) {
    var xhr = server(onLoad, onError);
    xhr.open('GET', URL.load);
    xhr.send();
  };

  // Отправка данных
  var save = function (data, onLoad, onError) {
    var xhr = server(onLoad, onError);
    xhr.open('POST', URL.save);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save,
    error: error
  };

})();
