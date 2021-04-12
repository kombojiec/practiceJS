/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/constants.js":
/*!*************************!*\
  !*** ./js/constants.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const menu = [
  {
    "img": "img/tabs/vegy.jpg",
    "altimg": "vegy",
    "title": "Меню 'Фитнес'",
    "descr": "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
    "price": 9
  },
  {
    "img": "img/tabs/post.jpg",
    "altimg": "post",
    "title": "Меню 'Постное'",
    "descr": "Меню 'Постное' - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
    "price": 14
  },
  {
    "img": "img/tabs/elite.jpg",
    "altimg": "elite",
    "title": "Меню 'Премиум'",
    "descr": "В меню 'Премиум' мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
    "price": 21
  }
]

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (menu);

/***/ }),

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calculator(){
  let gender, height, weight, age, activity, ratio;
  const result = document.querySelector('.calculating__result span');
  const genderChoose = document.querySelectorAll('#gender div');
  const dataInputs = document.querySelectorAll('.calculating__choose input');
  const activityChoose = document.querySelectorAll('#activity div');
  const activeClass = 'calculating__choose-item_active';

  gender = localStorage.getItem('gender') || 'female';

  genderChoose.forEach(item => {
    if(item.classList.contains(activeClass)){
      item.classList.remove(activeClass);        
    }
    if(item.id == gender){
      item.classList.add(activeClass);
    }
    item.addEventListener('click', event => {
      genderChoose.forEach(item => item.classList.remove(activeClass))
      const element = event.target.getAttribute('id');
      document.getElementById(element).classList.add(activeClass);
      gender = element;
      localStorage.setItem('gender', gender);
      setCalculateValue();
    })
  })

  dataInputs.forEach(input => {
    input.addEventListener('input', event => {
      const id = input.getAttribute('id');
      switch(id){
        case 'height': 
          height = event.target.value;
          break;
        case 'weight':
          weight =  event.target.value;
          break; 
        case 'age':
          age =  event.target.value;
          break;
      }
      setCalculateValue();
    })
  })

  activity = localStorage.getItem('activity') || 'small';

  activityChoose.forEach(item => {
    if(item.classList.contains(activeClass)){
      item.classList.remove(activeClass);        
    }
    if(item.id == activity){
      item.classList.add(activeClass);
    }
    item.addEventListener('click', event => {
      activityChoose.forEach(item => item.classList.remove(activeClass))
      const element = event.target.getAttribute('id');
      ratio = +event.target.getAttribute('data-ratio');
      document.getElementById(element).classList.add(activeClass);
      activity = element;
      localStorage.setItem('activity', activity);
      setCalculateValue();
    })
  })

  activityChoose.forEach(item => {
    if(item.classList.contains(activeClass)){
      ratio = +item.getAttribute('data-ratio');
    }
  })   

  if(!height || !weight || !age){
    result.textContent = '0 '
  }

  function setCalculateValue(){
    if(!height || !weight || !age){
      result.textContent = '0 '
    }else if(gender == 'female'){
      result.textContent = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio);
    }else if(gender == 'male'){
      result.textContent = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio);
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);

/***/ }),

/***/ "./js/modules/formHandler.js":
/*!***********************************!*\
  !*** ./js/modules/formHandler.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services */ "./js/modules/services.js");



function formHandler(modalSelector, modalTimerId){
  const forms = document.querySelectorAll('form');

  const message = {
    loading: 'Загрузка',
    success: 'Спасибо, мы скоро свяжемся с вами',
    failure: 'Упс... Что-то пошло не так...',
  }

  function bindPostData(form){
    form.addEventListener('submit', event => {
      event.preventDefault();

      const statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      statusMessage.textContent = message.loading;
      form.append(statusMessage);

      const formData = new FormData(form);
      const jsonData = JSON.stringify(Object.fromEntries(formData.entries()));

      (0,_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', jsonData)
      .then(data => {
        console.log(data)
        statusMessage.textContent = message.success;
        showThanksModal(message.success);          
        statusMessage.remove();
      })
      .catch((error) => {
        console.log(error);
        showThanksModal(message.failure);
      })
      .finally(() => {
        form.reset();
      })

    })
  }

  forms.forEach(form => {
    bindPostData(form);
  })

  function showThanksModal(message){
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(modalSelector, modalTimerId);
    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close>&times;</div>
        <div class="modal__title">${message}</div>
      </div>
    `;

    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(modalSelector);
    },2000)
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formHandler);

/***/ }),

/***/ "./js/modules/menuCards.js":
/*!*********************************!*\
  !*** ./js/modules/menuCards.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./js/constants.js");


function menuCards(){ 
  class CreateCard{
    constructor(src, alt, title, description, price, parent, ...classes){
      this.alt = alt;
      this.src = src;
      this.title = title;
      this.description = description;
      this.price = price;
      this.parent = document.querySelector(parent);
      this.classes = classes;
      this.currentCourse = 30;
      this.convertPrice();
    }    

    convertPrice(){
      this.price = this.price * this.currentCourse;
    }

    createContent(){
      let element = document.createElement('div');
      if(!this.classes.length){
        this.classes = 'menu__item';
        element.classList.add(this.classes);
      }else{
        this.classes.forEach(className => element.classList.add(className));
      }
      element.innerHTML = `
        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">Меню ${this.description}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
      `;
      this.parent.append(element);
    }
  }

  // axios.get('http://localhost:3000/menu')
  // .then(res => {
  //   res.data.forEach(({img, altimg, title, descr, price}) => {
  //     new CreateCard(img, altimg, title, descr, price, '.menu .container', 'menu__item', 'someClass').createContent();
  //   });
  // })
  _constants__WEBPACK_IMPORTED_MODULE_0__.default.forEach(({img, altimg, title, descr, price}) => {
    new CreateCard(img, altimg, title, descr, price, '.menu .container', 'menu__item', 'someClass').createContent();
  })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (menuCards);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal),
/* harmony export */   "closeModal": () => (/* binding */ closeModal)
/* harmony export */ });
/* harmony import */ var _script__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../script */ "./js/script.js");


function openModal(modalSelector, modalTimerId){
  modal = document.querySelector(modalSelector); 
  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';
  if(modalTimerId){
    clearTimeout(modalTimerId);
  }
  window.removeEventListener('scroll', openModalscroll);
}

function closeModal(modalSelector){
  modal = document.querySelector(modalSelector); 
  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflow = 'visible';    
}

function openModalscroll( ){
  if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
    openModal('.modal', _script__WEBPACK_IMPORTED_MODULE_0__.default);
  }
}



function modal(triggerSelector, modalSelector, modalTimerId){
  const modalTrigger = document.querySelectorAll(triggerSelector),
  modal = document.querySelector(modalSelector);  

  modalTrigger.forEach(button =>{
    button.addEventListener('click', () => openModal(modalSelector, modalTimerId));
  });

  modal.addEventListener('click', (event)=>{
    if(event.target === modal || event.target.getAttribute('data-close') == ''){
      closeModal(modalSelector);    
    }
  });

  document.addEventListener('keydown', (event)=>{
    if(event.code == 'Escape' && modal.classList.contains('show')){
      closeModal(modalSelector);
    }
  });

  window.addEventListener('scroll', openModalscroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/services.js":
/*!********************************!*\
  !*** ./js/modules/services.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });

const postData = async (url, data) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      'Content-type': 'application/json',
    },
    body: data,
  })
  return await res.json();
}




/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider(){
  const sliderWrapper = document.querySelector('.offer__slider-wrapper');
  const container = sliderWrapper.querySelector('.offer__lsider-inner')
  const slides = document.querySelectorAll('.offer__slide');
  const prevSlideButton = document.querySelector('.offer__slider-prev');
  const nextSlideButton = document.querySelector('.offer__slider-next');
  const currentSlide = document.querySelector('#current');
  const totalSlide = document.querySelector('#total');
  const width = parseInt(window.getComputedStyle(slides[0]).width);
  let currentIndex = 0;

  function setTextValue(value, container){
    container.textContent = value;
  }

  setTextValue(currentIndex +1, currentSlide);
  setTextValue(slides.length, totalSlide);

  slides.forEach(slide => {
    slide.style.width = width + 'px';
  })

  container.style.width = slides.length * width +'px';
  container.style.display = 'flex';
  container.style.transition = "all 0.5s linear"
  sliderWrapper.style.overflow = 'hidden';

  nextSlideButton.addEventListener('click', () => {
    moveSlideAhead()
  })

  function moveSlideAhead(){
    ++currentIndex;
    if(currentIndex * width > width * (slides.length -1)){
      container.style.transform = `translateX(0px)`;
      currentIndex = 0;
    }
    container.style.transform = `translateX(${-currentIndex * width}px)`;
    setTextValue(currentIndex +1, currentSlide);
    changeNavigationButton(currentIndex);
  }

  prevSlideButton.addEventListener('click', () => {
    moveSlideBack();
  })

  function moveSlideBack(){
    --currentIndex;
    if(currentIndex < 0){
      currentIndex = slides.length -1;
      container.style.transform = `translateX(${-currentIndex * width}px)`;
    }      
    container.style.transform = `translateX(${-currentIndex * width}px)`;
    setTextValue(currentIndex +1, currentSlide);
    changeNavigationButton(currentIndex);
  }

  function moveSlideOnPosition(index){
    currentIndex = index;
    container.style.transform = `translateX(${-currentIndex * width}px)`;
    setTextValue(index +1, currentSlide);
    changeNavigationButton(currentIndex);
  }

      //  Реализация слайдера с display: none;

  // slides.forEach((slide, i) => {
  //   hideSlide(i);
  // })
  // showSlide(0);
  // setTextValue(setZero(1), currentSlide);
  // setTextValue(setZero(slides.length), totalSlide);

  // function showSlide(index){
  //   slides[index].classList.remove('hide');
  //   slides[index].classList.add('active', 'fade');
  // }

  // function hideSlide(index){
  //   slides[index].classList.add('hide');
  //   slides[index].classList.remove('active', 'fade');
  // }

  // function returnActiveSlide(){
  //   let active = undefined;
  //   slides.forEach((item, index) => {
  //     if(item.classList.contains('active')){
  //       active = index; 
  //     }
  //   })
  //   return active;
  // }

  // nextSlideButton.addEventListener('click', () => {
  //   let active = returnActiveSlide();
  //   let next = active +1;
  //   next >= slides.length? next = 0: next;
  //   hideSlide(active);
  //   showSlide(next)
  //   setTextValue(setZero(next +1), currentSlide);
  // })

  // prevSlideButton.addEventListener('click', () => {
  //   let active = returnActiveSlide();
  //   let prev = active -1;
  //   prev < 0 ? prev = slides.length -1: prev;
  //   hideSlide(active);
  //   showSlide(prev)
  //   setTextValue(setZero(prev +1), currentSlide);
  // })

  // ======= Создание навигации для слайдера==========
  const dots = document.createElement('ul');
  dots.classList.add('carousel-indicators');
  sliderWrapper.style.position = 'relative';
  sliderWrapper.append(dots);
  
  for(let i = 0; i < slides.length; ++i){
    const dot = document.createElement('li');
    i == 0? dot.classList.add('dot', 'active'): dot.classList.add('dot');
    dot.setAttribute(`data-dot`, i)
    dots.append(dot);
  }    
  const dotsList = dots.querySelectorAll('.dot');

  function changeNavigationButton(index){
    dotsList.forEach((dot, i) => {
      if(dot.classList.contains('active')){
        dot.classList.remove('active');
      }
      if(i == index){
        dot.classList.add('active');
      }
    })
  }

  dotsList.forEach(dot => {
    dot.addEventListener('click', event => {
      const index = +event.target.getAttribute('data-dot');
      moveSlideOnPosition(index);
    })
  })
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(){
  const tabs = document.querySelectorAll('.tabheader__item'),
  tabsContent = document.querySelectorAll('.tabcontent'),
  tabsParent = document.querySelector('.tabheader__items');

  function hideContent(){
    tabsContent.forEach((item, i) => {
    item.classList.add('hide');
    item.classList.remove('show', 'fade');
    tabs[i].classList.remove('tabheader__item_active');
    });
  }
  hideContent();

  function showContent(i = 0){
    tabsContent[i].classList.add('show', 'fade');    
    tabsContent[i].classList.remove('hide');    
    tabs[i].classList.add('tabheader__item_active');    
  }
  showContent();

  tabsParent.addEventListener('click', (event) => {
    const target = event.target;
    if(target && target.classList.contains('tabheader__item')){
    tabs.forEach((item, i) => {
      if(target == item){
        hideContent();
        showContent(i);
      }
    });
    }
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(){
  const deadLine = new Date(Date.parse(new Date()) + (1000 * 60 * 60 *24) * 1.255);
  
  function getRemnant(deadLine){
    const currentTime = new Date();
    const remnant = Date.parse(deadLine) - Date.parse(currentTime);
    const days = Math.floor(remnant / (1000 * 60 * 60 *24));
    const hours = Math.floor(remnant / (1000 * 60 * 60 ) % 24);
    const minutes = Math.floor(remnant / (1000 * 60) % 60);
    const seconds = Math.floor(remnant / 1000 % 60);

    return{
      remnant,
      days,
      hours,
      minutes,
      seconds
    }
  }

  function setTimerData(data){
    const dayValue = document.getElementById('days')
    const hourValue = document.getElementById('hours')
    const minuteValue = document.getElementById('minutes')
    const secondsValue = document.getElementById('seconds')
    
    dayValue.textContent = setZero(data.days);
    hourValue.textContent = setZero(data.hours);
    minuteValue.textContent = setZero(data.minutes);
    secondsValue.textContent = setZero(data.seconds);
  }

  function setTimer(deadLine){
    const interval = setInterval(() => {
      const data = getRemnant(deadLine);
      setTimerData(data);
      if(data.remnant <= 0){
        clearInterval(interval);
      }
    },1000);
  }

  function setZero(number){
    if(number < 0) return '00';
    if(number >= 0 && number <= 9){
      return `0${number}`;
    }else if(number > 0){
      return number;
    }else{
      return;
    }
  }

  setTimerData(getRemnant(deadLine));
  setTimer(deadLine);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");
/* harmony import */ var _modules_formHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/formHandler */ "./js/modules/formHandler.js");
/* harmony import */ var _modules_menuCards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/menuCards */ "./js/modules/menuCards.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");












  
  const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.openModal)('.modal', modalTimerId), 5000);
  
  (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_0__.default)();
  (0,_modules_formHandler__WEBPACK_IMPORTED_MODULE_1__.default)('.modal');
  (0,_modules_menuCards__WEBPACK_IMPORTED_MODULE_2__.default)();
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.default)('[data-modal]', '.modal', modalTimerId);
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__.default)();
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__.default)();
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__.default)();
  
  
  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modalTimerId);

//========================== End of file =============================>>>




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./js/script.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map