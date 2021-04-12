import menu from '../constants';

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
  menu.forEach(({img, altimg, title, descr, price}) => {
    new CreateCard(img, altimg, title, descr, price, '.menu .container', 'menu__item', 'someClass').createContent();
  })
}

export default menuCards;