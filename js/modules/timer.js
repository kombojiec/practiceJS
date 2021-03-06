function timer(){
  // const deadLine = new Date(Date.parse(new Date()) + (1000 * 60 * 60 *24) * 1.255);
  const today = new Date().getDate();
  const mounth = new Date().getMonth()
  const year = new Date().getFullYear()
  const deadLine = new Date(year, mounth, today+2);
  const mounths = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
  const mounthText = document.querySelector('#mounthText');
  const dateText = document.querySelector('#dateText');
  dateText.textContent = today + 2;
  dateText.mounthContent = mounths[mounth];
  // console.log(dateText);
  // console.log(mounthText);
  // console.log(new Date(year, mounth, today));
  // console.log(deadLine);
  
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

export default timer;