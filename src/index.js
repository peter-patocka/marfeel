import { Report } from './advertisement/report';

let app = {
  init : function(options) {
    this.content = document.querySelector(".content")
    
    this.addComponent(new Report().render());
  },
  addComponent(component) {
    this.content.appendChild(component);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  app.init();
});