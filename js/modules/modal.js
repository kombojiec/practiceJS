function modal(){
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
}

module.exports = modal;