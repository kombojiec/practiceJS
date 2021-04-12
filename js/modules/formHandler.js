function formHandler(){
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
}

module.exports = formHandler;