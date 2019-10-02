const GOODS = [
  {
    category: 'furniture',
    name: 'Chair',
    amount: 1,
    price: 20,
  },
  {
    category: 'supplies',
    name: 'Gel Pen',
    amount: 20,
    price: 2,
  },
  {
    category: 'other',
    name: 'Trash Bin',
    amount: 1,
    price: 5,
  },
  {
    category: 'furniture',
    name: 'Sofa',
    amount: 1,
    price: 50,
  },
  {
    category: 'supplies',
    name: 'Notebook',
    amount: 3,
    price: 3,
  },
  {
    category: 'other',
    name: 'Calendar 2019',
    amount: 1,
    price: 3,
  },
];

const CURRENCY = '$';

let data = GOODS;
let currentSortCriteria = '';
let sortUp = true;
let currentCategory = '';

const setSortDirection = (sortCriteria) => {
  if (sortCriteria === currentSortCriteria) {
    sortUp = !sortUp;
  } else {
    sortUp = true;
  }
};

const sortByCriteria = (criteria) => {
  data.sort((a, b) => {
    if (a[criteria] < b[criteria]) {
      if (sortUp) {
        return -1;
      }
      return 1;
    }
    if (a[criteria] > b[criteria]) {
      if (sortUp) {
        return 1;
      }
      return -1;
    }
    return 0;
  });
};

const addItem = (src, item) => {
  let result = src;
  for (const property in item) {
    result = result.concat(`<td>${item[property]}</td>`);
  }
  return result;
};

const printData = (currentData = data) => {
  const rowOpener = '<tr>';
  const rowCloser = '</tr>';
  let result = '';
  let total = 0;
  sortByCriteria('category');
  for (const item of currentData) {
    result = result.concat(rowOpener);
    result = addItem(result, item);
    result = result.concat(rowCloser);
    total += item.amount * item.price;
  }
  document.getElementById('goods').innerHTML = result;
  document.getElementById('total').innerHTML = CURRENCY.concat(total);
};

document.addEventListener('DOMContentLoaded', () => printData(data));

const filterCategory = () => {
  const select = document.getElementById('category-select');
  currentCategory = select.options[select.selectedIndex].value;
  data = GOODS;
  data = data.filter((item) => (item.category === currentCategory) || currentCategory === '');
  printData();
};

const filterNamesOnType = () => {
  let currentData = data;
  const name = document.getElementById('find-by-name').value;
  currentData = data.filter((item) => (item.name.startsWith(name)));
  printData(currentData);
};

window.onload = () => {
  const select = document.getElementById('category-select');
  const findByName = document.getElementById('find-by-name');
  select.addEventListener('change', filterCategory);
  findByName.addEventListener('keyup', filterNamesOnType);
};
