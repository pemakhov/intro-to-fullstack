// const names = ['Jenny Hess', 'Elliot Foo', 'Stevie Feliciano', 'Christian', 'Matt'];
const friends = [
  {
    name: 'Jenny Hess',
    avatarSrc: 'http://www.hexatar.com/gallery/thumb/151104_f3e74852d09.png',
  },
  {
    name: 'Elliot Foo',
    avatarSrc: 'http://www.hexatar.com/gallery/thumb/151202_040912_m71e6379819.png',
  },
  {
    name: 'Stevie Feliciano',
    avatarSrc: 'http://www.hexatar.com/gallery/thumb/151104_f51487ec855.png',
  },
  {
    name: 'Christian',
    avatarSrc: 'http://www.hexatar.com/gallery/thumb/151204_094136_m35fd66e783.png',
  },
  {
    name: 'Matt',
    avatarSrc: 'http://www.hexatar.com/gallery/thumb/151123_081923_m91b13883e4.png',
  },
];

let currentSelection = 'Select Friend';

const setSelection = (selection) => {
  return '<div class="selection">'.concat(selection).concat('</div>');
};

const setOptions = (options) => {
  let panel = '<div class="panel">';
  const bars = friends.map((item) => '<div class="bar">'
    .concat('<img class="avatar" src="').concat(item.avatarSrc).concat('"></img>')
    .concat(item.name).concat('</div>')
  );
  panel = panel.concat(bars.reduce((acc, value) => acc.concat(value)));
  panel = panel.concat('</div>');
  return panel;
};

const setSelector = (selector, options) => {
  selector.append(setSelection(currentSelection));
  selector.append(setOptions(friends));
};

$(document).ready(function() {
  setSelector($('#dropdown'), friends);
  $('.selection').click(function() {
    $('.panel').slideToggle(500);
    $('#dropdown').toggleClass('active');
    $('.selection').toggleClass('bar');
  });
  $('.panel').slideUp(0);
});
