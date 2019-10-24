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
/* Current set of goods */
let data = GOODS;
let currentSortCriteria = '';
/* A set of goods filtred on type */
let currentView = data;
/* Sort direction */
let sortDown = false;

/* Sorts data by a chosen criteria */
const sortByCriteria = (criteria) => {
  if (currentSortCriteria !== criteria) {
    sortDown = false;
    currentSortCriteria = criteria;
  }
  currentView.sort((a, b) => {
    if (a[criteria] > b[criteria]) {
      if (sortDown) {
        return -1;
      }
      return 1;
    }
    if (a[criteria] < b[criteria]) {
      if (sortDown) {
        return 1;
      }
      return -1;
    }
    return 0;
  });
};

/* Creates HTML layout for all properties of one item */
const addItem = (src, item) => {
  let result = src;
  for (const property in item) {
    result = result.concat(`<td>${item[property]}</td>`);
  }
  return result;
};

/* Prints the table of data */
const printData = (currentData = currentView) => {
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

/* Sets arrows according to a sort criteria and current direction */
const setArrows = (activeCriteria) => {
  const categoryArrow = document.getElementById('category-arrow');
  const nameArrow = document.getElementById('name-arrow');
  switch (activeCriteria) {
    case 'category':
      categoryArrow.className = ((sortDown) ? 'sort-down' : 'sort-up');
      nameArrow.className = 'sort-off';
      break;
    case 'name':
      categoryArrow.className = 'sort-off';
      nameArrow.className = ((sortDown) ? 'sort-down' : 'sort-up');
      break;
    default:
      categoryArrow.className = 'sort-off';
      nameArrow.className = 'sort-off';
  }
};

/* Sorts data by category */
const sortByCategory = () => {
  sortByCriteria('category');
  sortDown = !sortDown;
  setArrows('category');
  printData();
};

/* Sorts data by name */
const sortByName = () => {
  sortByCriteria('name');
  sortDown = !sortDown;
  setArrows('name');
  printData();
};

/* Filters the table of data by name */
const filterNamesOnType = () => {
  currentView = data;
  const name = document.getElementById('find-by-name').value.toLowerCase();
  currentView = data.filter((item) => (item.name.toLowerCase().includes(name)));
  printData(currentView);
};

/* Filters the table of data by category */
const filterCategory = () => {
  const select = document.getElementById('category-select');
  const currentCategory = select.options[select.selectedIndex].value;
  data = GOODS;
  data = data.filter((item) => (item.category === currentCategory) || currentCategory === '');
  // document.getElementById('find-by-name').value = '';
  currentView = data;
  // printData();
  filterNamesOnType();
};

/* Prints table when the page is loaded for the first time */
document.addEventListener('DOMContentLoaded', () => printData(data));

/* Event listeners */
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
