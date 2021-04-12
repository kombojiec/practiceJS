import modalTimerId from '../script';

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
    openModal('.modal', modalTimerId);
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

export default modal;
export {openModal, closeModal};