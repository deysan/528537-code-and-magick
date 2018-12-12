'use strict';

var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARDS_NUMBER = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var userDialog = document.querySelector('.setup');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var userDialogOpen = document.querySelector('.setup-open');
var userDialogClose = userDialog.querySelector('.setup-close');
var userNameInput = userDialog.querySelector('.setup-user-name');
var coatWizard = document.querySelector('.setup-wizard .wizard-coat');
var inputCoatWizard = document.querySelector('.setup-wizard-form').querySelector('[name="coat-color"]');
var eyesWizard = document.querySelector('.setup-wizard .wizard-eyes');
var inputEyesWizard = document.querySelector('.setup-wizard-form').querySelector('[name="eyes-color"]');
var fireballWizard = document.querySelector('.setup-fireball-wrap');
var inputFireballWizard = fireballWizard.querySelector('input');

var getRandomElementFromArray = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var generateWizardList = function () {
  var wizards = [];

  for (var i = 0; i < WIZARDS_NUMBER; i++) {
    wizards[i] = {
      name: getRandomElementFromArray(FIRST_NAMES) + ' ' + getRandomElementFromArray(LAST_NAMES),
      coatColor: getRandomElementFromArray(COAT_COLORS),
      eyesColor: getRandomElementFromArray(EYES_COLORS)
    };
  }

  return wizards;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderWizardsList = function (wizards) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
};

var init = function () {
  var wizards = generateWizardList();
  renderWizardsList(wizards);
};

init();

// Настройки персонажа
var onPopupEscPress = function (evt) {
  if (evt.target === userNameInput) {
    return;
  } else if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  userDialog.classList.remove('hidden');
  userDialog.querySelector('.setup-similar').classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

userDialogOpen.addEventListener('click', function () {
  openPopup();
});

userDialogOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

userDialogClose.addEventListener('click', function () {
  closePopup();
});

userDialogClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя персонажа не может содержать менее 2 символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Максимальная длина имени персонажа — 25 символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя персонажа не может содержать менее 2 символов');
  } else {
    target.setCustomValidity('');
  }
});

// Изменение цвета персонажа
coatWizard.addEventListener('click', function () {
  var color = getRandomElementFromArray(COAT_COLORS);
  coatWizard.style.fill = color;
  inputCoatWizard.setAttribute('value', color);
});

eyesWizard.addEventListener('click', function () {
  var color = getRandomElementFromArray(EYES_COLORS);
  eyesWizard.style.fill = color;
  inputEyesWizard.setAttribute('value', color);
});

fireballWizard.addEventListener('click', function () {
  var color = getRandomElementFromArray(FIREBALL_COLORS);
  fireballWizard.style.background = color;
  inputFireballWizard.setAttribute('value', color);
});
