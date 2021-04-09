'use strict';
window.addEventListener("DOMContentLoaded", () => {

  //=================Tabs========================
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


  // =================Timer========================

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



  //=====================Modal window==================================
  
  const modalTrigger = document.querySelectorAll('[data-modal]'),
      modal = document.querySelector('.modal'),
      close = document.querySelector('[data-close]');

    function openModal(){
      modal.classList.add('show');
      modal.classList.remove('hide');
      document.body.style.overflow = 'hidden';
      clearTimeout(modalTimerId);
      window.removeEventListener('scroll', openModalscroll);
    }

    modalTrigger.forEach(button =>{
      button.addEventListener('click', openModal);
    });

  function closeModal(){
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = 'visible';    
  }

  close.addEventListener('click', closeModal);
  
  modal.addEventListener('click', (event)=>{
    if(event.target === modal){
      closeModal();    
    }
  });

  document.addEventListener('keydown', (event)=>{
    if(event.code == 'Escape' && modal.classList.contains('show')){
      closeModal();
    }
  });

  let modalTimerId = setTimeout(openModal, 15000);

  function openModalscroll(){
    if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
      openModal();
    }
  }

  window.addEventListener('scroll', openModalscroll);


  // =======================menuCards===========================

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
      // element.classList.add('menu__item');
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

  new CreateCard("img/tabs/vegy.jpg", 
    "vegy", 
    'Меню "Фитнес"', 
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    5,
    '.menu .container',
    'menu__item',
    'someClass',
    ).createContent();

  new CreateCard("img/tabs/elite.jpg", 
    "elite", 
    'Меню “Премиум”', 
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    7,
    '.menu .container'
    ).createContent();


  new CreateCard("img/tabs/post.jpg", 
  "post", 
    'Меню "Постное"', 
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    6,
    '.menu .container'
    ).createContent();

  

}); //=======================================================


