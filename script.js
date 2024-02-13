let items = [];

const itemsDiv = document.querySelector('.items');
const input = document.querySelector('#inputItem');
const addButton = document.querySelector('#addItem');

const storageKey = 'items'; //the value can be anything it doesn't matter.

const renderItems = ()=> {
  itemsDiv.innerHTML = null;

  for (const [idx, item] of Object.entries(items)) {
    const container = document.createElement('div');
    container.style.marginBottom = '1rem';

    const text = document.createElement('p');
    text.style.display = 'inline';
    text.style.marginRight = '1rem';
    text.textContent = item;

    const button = document.createElement('button');
    button.textContent = 'Delete';
    button.addEventListener('click', ()=> {
      removeItem(idx);
    });
    container.appendChild(text);
    container.appendChild(button);

    itemsDiv.appendChild(container);
  }
};

const loadItems = ()=> {
  const oldItems = localStorage.getItem(storageKey);
  if (oldItems) {
    items = JSON.parse(oldItems);
  }
  renderItems();
};

const saveItems = ()=> {
  const stringItems = JSON.stringify(items);
  localStorage.setItem(storageKey, stringItems);
};

const addItem = ()=> {
  const value = input.value;
  if (!value) {
    alert('Please enter an item !');
    return
  }
  items.push(value);
  renderItems();
  input.value = null;
  saveItems();
};

addButton.addEventListener('click', ()=> {
  addItem();
});

const removeItem = (idx)=> {
  items.splice(idx, 1);
  renderItems();
  saveItems();
};

document.addEventListener('DOMContentLoaded', loadItems);