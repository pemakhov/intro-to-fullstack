const goods = $.getJSON('database.js');

const openRow = (result) => result.concat('<tr>');
const closeRow = (result) => result.concat('</tr>');
const addItem = (src, item) => {
  let result = src;
  for (const property in item) {
    result = result.concat(`<td>${item[property]}</td>`);
    console.log(result);
  }
  return result;
};

const printData = (goods) => {
  let result = '';
  for (const item of goods) {
    result = result.concat(openRow(result));
    result = result.concat(addItem(result, item));
    result = result.concat(closeRow(result));
  }
  return result;
};

window.onload = printData()
