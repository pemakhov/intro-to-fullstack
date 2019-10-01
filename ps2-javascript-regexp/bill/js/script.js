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

let currentCriteria = '';
let sortUp = true;

const addItem = (src, item) => {
  let result = src;
  for (const property in item) {
    result = result.concat(`<td>${item[property]}</td>`);
  }
  return result;
};

const sortByCriteria = (data, criteria, sortUp) => {
  data.sort((a, b) => {
    if (criteria === currentCriteria) {
      sortUp = !sortUp;
    } else {
      sortUp = true;
    }
    if (a[criteria] < b[criteria]){
      if (sortUp) {
        return -1;
      } else {
        return 1;
      }
    }
    if ( a[criteria] > b[criteria] ){
      if (sortUp) {
        return 1;
      } else {
        return -1;
      }
    }
    return 0;
  })
};

const printData = (data) => {
  const rowOpener = '<tr>';
  const rowCloser = '</tr>';
  let result = '';
  let total = 0;
  sortByCriteria(data, 'name', sortUp);
  for (const item of data) {
    result = result.concat(rowOpener);
    result = addItem(result, item);
    result = result.concat(rowCloser);
    total += item.amount * item.price;
  }
  document.getElementById('goods').innerHTML = result;
  document.getElementById('total').innerHTML = CURRENCY.concat(total);
};

const categorySelect = document.getElementById('category-select');
const filterCategory = () => {
  
}

document.addEventListener('DOMContentLoaded', () => printData(GOODS));
categorySelect.addEventListener('change', filterCategory())
