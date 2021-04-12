import {openModal, closeModal} from './modal';
import {postData} from './services';

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
    openModal(modalSelector, modalTimerId);
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
      closeModal(modalSelector);
    },2000)
  }
}

export default formHandler;