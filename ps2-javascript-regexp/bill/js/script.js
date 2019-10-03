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
let sortDown = true;

const sortByCriteria = (criteria) => {
  if (currentSortCriteria !== criteria) {
    sortDown = true;
    currentSortCriteria = criteria;
  }
  data.sort((a, b) => {
    if (a[criteria] < b[criteria]) {
      if (sortDown) {
        return -1;
      }
      return 1;
    }
    if (a[criteria] > b[criteria]) {
      if (sortDown) {
        return 1;
      }
      return -1;
    }
    return 0;
  });
};

const sortByCategory = () => {
  sortByCriteria('category');
  sortDown = !sortDown;
  printData();
};

const sortByName = () => {
  sortByCriteria('name');
  sortDown = !sortDown;
  printData();
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
  let currentCategory = select.options[select.selectedIndex].value;
  data = GOODS;
  data = data.filter((item) => (item.category === currentCategory) || currentCategory === '');
  document.getElementById('find-by-name').value = '';
  printData();
};

const filterNamesOnType = () => {
  const name = document.getElementById('find-by-name').value.toLowerCase();
  data = data.filter((item) => (item.name.toLowerCase().includes(name)));
  printData(data);
};

window.onload = () => {
  const select = document.getElementById('category-select');
  const findByName = document.getElementById('find-by-name');
  const categorySort = document.getElementById('category-direction');
  const nameSort = document.getElementById('name-direction');
  select.addEventListener('change', filterCategory);
  findByName.addEventListener('keyup', filterNamesOnType);
  categorySort.addEventListener('click', sortByCategory);
  nameSort.addEventListener('click', sortByName);
};
