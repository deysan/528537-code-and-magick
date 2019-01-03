'use strict';

(function () {

  // var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  // var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARDS_NUMBER = 4;

  var userDialogElement = document.querySelector('.setup');
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var userDialogOpenElement = document.querySelector('.setup-open');
  var userDialogCloseElement = userDialogElement.querySelector('.setup-close');
  var userNameInputElement = userDialogElement.querySelector('.setup-user-name');

  // var generateWizardList = function () {
  //   var wizards = [];

  //   for (var i = 0; i < WIZARDS_NUMBER; i++) {
  //     wizards[i] = {
  //       name: window.util.getRandomElementFromArray(FIRST_NAMES) + ' ' + window.util.getRandomElementFromArray(LAST_NAMES),
  //       coatColor: window.util.getRandomElementFromArray(window.colorize.COAT_COLORS),
  //       eyesColor: window.util.getRandomElementFromArray(window.colorize.EYES_COLORS)
  //     };
  //   }

  //   return wizards;
  // };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  // var renderWizardsList = function (wizards) {
  //   var fragment = document.createDocumentFragment();
  //   for (var i = 0; i < WIZARDS_NUMBER; i++) {
  //     fragment.appendChild(renderWizard(wizards[i]));
  //   }
  //   similarListElement.appendChild(fragment);
  // };

  window.load(function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < WIZARDS_NUMBER; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }

    similarListElement.appendChild(fragment);
    userDialogElement.querySelector('.setup-similar').classList.remove('hidden');
  });

  // var init = function () {
  //   var wizards = generateWizardList();
  //   renderWizardsList(wizards);
  // };

  // init();

  // Настройки персонажа
  var onPopupEscPress = function (evt) {
    if (evt.target !== userNameInputElement && evt.keyCode === window.util.ESC_KEYCODE) {
      closePopup();
    }
  };

  var openPopup = function () {
    userDialogElement.classList.remove('hidden');
    userDialogElement.querySelector('.setup-similar').classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    userDialogElement.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    userDialogElement.style.top = 80 + 'px';
    userDialogElement.style.left = 50 + '%';
  };

  userDialogOpenElement.addEventListener('click', function () {
    openPopup();
  });

  userDialogOpenElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      openPopup();
    }
  });

  userDialogCloseElement.addEventListener('click', function () {
    closePopup();
  });

  userDialogCloseElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      closePopup();
    }
  });

  userNameInputElement.addEventListener('invalid', function () {
    if (userNameInputElement.validity.tooShort) {
      userNameInputElement.setCustomValidity('Имя персонажа не может содержать менее 2 символов');
    } else if (userNameInputElement.validity.tooLong) {
      userNameInputElement.setCustomValidity('Максимальная длина имени персонажа — 25 символов');
    } else if (userNameInputElement.validity.valueMissing) {
      userNameInputElement.setCustomValidity('Обязательное поле');
    } else {
      userNameInputElement.setCustomValidity('');
    }
  });

  userNameInputElement.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < 2) {
      target.setCustomValidity('Имя персонажа не может содержать менее 2 символов');
    } else {
      target.setCustomValidity('');
    }
  });

})();
