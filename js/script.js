'use strict';

import calculator from './modules/calculator';
import formHandler from './modules/formHandler';
import menuCards from './modules/menuCards';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';
import {openModal} from './modules/modal';


// window.addEventListener("DOMContentLoaded", () => {  
  
  const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 5000);
  
  calculator();
  formHandler('.modal');
  menuCards();
  modal('[data-modal]', '.modal', modalTimerId);
  slider();
  tabs();
  timer();
  
  
  export default modalTimerId;
// }); //========================== End of file =============================>>>


