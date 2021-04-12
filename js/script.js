'use strict';
window.addEventListener("DOMContentLoaded", () => {  

  const calculator = require('./modules/calculator');
  const formHandler = require('./modules/formHandler');
  const menuCards = require('./modules/menuCards');
  const modal = require('./modules/modal');
  const slider = require('./modules/slider');
  const tabs = require('./modules/tabs');
  const timer = require('./modules/timer');

  calculator();
  formHandler();
  menuCards();
  modal();
  slider();
  tabs();
  timer();

  
}); //========================== End of file =============================>>>


