'use strict';

let mobiles = [];

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function Mobile (name, type){

  this.name = name;
  this.type = type;
  this.price = random(100,500);

  this.status = '';

  mobiles.push(this);
}

function settingItems() {

  let stringObject = JSON.stringify(mobiles);
  localStorage.setItem('mobiles', stringObject);
}

let table = document.getElementById('table');

Mobile.prototype.renderRows = function (){

  let rowElement = document.createElement('tr');
  table.appendChild(rowElement);

  let nameElement = document.createElement('td');
  rowElement.appendChild(nameElement);
  nameElement.textContent = this.name;

  let typeElement = document.createElement('td');
  rowElement.appendChild(typeElement);
  typeElement.textContent = this.type;

  let priceElement = document.createElement('td');
  rowElement.appendChild(priceElement);
  priceElement.textContent = this.price;

  let statusElement = document.createElement('td');
  rowElement.appendChild(statusElement);
  statusElement.textContent = this.status;
};

Mobile.prototype.getStatus = function () {

  if (this.price <= 200) {
    this.status = 'Used';
  } else if (this.price > 200) {
    this.status = 'New';
  }
};

let form = document.getElementById('form');
form.addEventListener('submit', submitter);

function submitter(event) {

  event.preventDefault();

  let name = event.target.name.value;
  let type = event.target.type.value;

  let newObject = new Mobile(name, type);

  newObject.getStatus();

  settingItems();

  newObject.renderRows();

}

function gettingItems() {

  let data = localStorage.getItem('mobiles');
  let parsedObject = JSON.parse(data);

  if (parsedObject) {
    for (let i = 0; i < parsedObject.length; i++) {
      new Mobile(parsedObject[i].name, parsedObject[i].type);
    }
  }
}

function makeHeader() {

  let headerRow = document.createElement('tr');
  table.appendChild(headerRow);

  let userCell = document.createElement('th');
  headerRow.appendChild(userCell);
  userCell.textContent = 'User';

  let typeCell = document.createElement('th');
  headerRow.appendChild(typeCell);
  typeCell.textContent = 'Type';

  let priceCell = document.createElement('th');
  headerRow.appendChild(priceCell);
  priceCell.textContent = 'Price';

  let conditionCell = document.createElement('th');
  headerRow.appendChild(conditionCell);
  conditionCell.textContent = 'Condition';

  headerRow.setAttribute('id', 'headerRow');
}


makeHeader();
gettingItems();

for (let i = 0; i < mobiles.length; i++) {

  mobiles[i].renderRows();
}

let clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', clearer);

function clearer() {

  localStorage.clear();
  table.textContent = '';
  clearButton.style.visibility = 'hidden';
}
