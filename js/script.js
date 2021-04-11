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
      modal = document.querySelector('.modal');

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

  
  modal.addEventListener('click', (event)=>{
    if(event.target === modal || event.target.getAttribute('data-close') == ''){
      closeModal();    
    }
  });

  document.addEventListener('keydown', (event)=>{
    if(event.code == 'Escape' && modal.classList.contains('show')){
      closeModal();
    }
  });

  // let modalTimerId = setTimeout(openModal, 15000);

  function openModalscroll(){
    if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
      openModal();
    }
  }

  // window.addEventListener('scroll', openModalscroll);


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

  // const getMenu = async (url) => {
  //   const res = await fetch(url);
  //   if(!res.ok){
  //     throw new Error(`Error with status ` + res.status)
  //   }
  //   return await res.json();
  // }

  // getMenu('http://localhost:3000/menu')
  // .then(data => {
  //   data.forEach(({img, altimg, title, descr, price}) => {
  //     new CreateCard(img, altimg, title, descr, price, '.menu .container', 'menu__item', 'someClass').createContent();
  //   });
  // })

  axios.get('http://localhost:3000/menu')
  .then(res => {
    res.data.forEach(({img, altimg, title, descr, price}) => {
      new CreateCard(img, altimg, title, descr, price, '.menu .container', 'menu__item', 'someClass').createContent();
    });
  })
  
    // ================ Отправка форм ====================

    const forms = document.querySelectorAll('form');

    const message = {
      loading: 'Загрузка',
      success: 'Спасибо, мы скоро свяжемся с вами',
      failure: 'Упс... Что-то пошло не так...',
    }

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

    function bindPostData(form){
      form.addEventListener('submit', event => {
        event.preventDefault();

        const statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
        statusMessage.textContent = message.loading;
        form.append(statusMessage);

        const formData = new FormData(form);
        const jsonData = JSON.stringify(Object.fromEntries(formData.entries()));

        postData('http://localhost:3000/requests', jsonData)
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
      openModal();
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
        closeModal();
      },2000)
    }

    // fetch('http://localhost:3000/menu')
    // .then(data => data.json())
    // .then(data => console.log(data))




    // ============ Slider ====================>>
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
    



}); //=======================================================


