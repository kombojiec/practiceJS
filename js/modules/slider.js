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
export default slider;