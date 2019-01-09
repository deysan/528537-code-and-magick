'use strict';

(function () {

  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var coatWizardElement = document.querySelector('.setup-wizard .wizard-coat');
  var inputCoatWizardElement = document.querySelector('.setup-wizard-form').querySelector('[name="coat-color"]');
  var eyesWizardElement = document.querySelector('.setup-wizard .wizard-eyes');
  var inputEyesWizardElement = document.querySelector('.setup-wizard-form').querySelector('[name="eyes-color"]');
  var fireballWizardElement = document.querySelector('.setup-fireball-wrap');
  var inputFireballWizardElement = fireballWizardElement.querySelector('input');

  var colorize = {
    onEyesChange: function (color) {
      return color;
    },
    onCoatChange: function (color) {
      return color;
    }
  };

  coatWizardElement.addEventListener('click', function () {
    var color = window.util.getRandomElementFromArray(COAT_COLORS);
    coatWizardElement.style.fill = color;
    inputCoatWizardElement.setAttribute('value', color);
    colorize.onCoatChange(color);
  });

  eyesWizardElement.addEventListener('click', function () {
    var color = window.util.getRandomElementFromArray(EYES_COLORS);
    eyesWizardElement.style.fill = color;
    inputEyesWizardElement.setAttribute('value', color);
    colorize.onEyesChange(color);
  });

  fireballWizardElement.addEventListener('click', function () {
    var color = window.util.getRandomElementFromArray(FIREBALL_COLORS);
    fireballWizardElement.style.background = color;
    inputFireballWizardElement.setAttribute('value', color);
  });

  window.colorize = colorize;

})();
