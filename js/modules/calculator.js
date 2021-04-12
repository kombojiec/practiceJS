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

module.exports = calculator;