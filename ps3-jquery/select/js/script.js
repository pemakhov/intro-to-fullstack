/* Data of friends */
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

/* True if not default option is selected */
let isSelected = false;
/* Contains HTML of the selector before any option was chosen */
const defaultSelectorHtml = '<div class="selection default">Select Friend<span></span></div>';
const restoreDefaultHtml = '<div class="restore-default-bar bar-selector">Select Friend</div>';
/* Contains HTML of currently chosen or default option */
let selectorHtml = defaultSelectorHtml;
/* Contains the option that was chosen the last time, or null */
let currentBar = null;

/* Sets all options. Places them into a container ("panel"). Returns
* container with options.
*/
const setOptions = (options) => {
  /* The container for options */
  let panel = '<div class="panel">';
  if (isSelected) {
    panel = panel.concat(restoreDefaultHtml);
  }
  /* Wrap each bar into HTML tags */
  const bars = friends.map((item) => '<div class="bar bar-selector">'
    .concat('<img class="avatar" src="').concat(item.avatarSrc).concat('"></img>')
    .concat(item.name).concat('</div>')
  );
  /* Concatinate all bars code into one string, then - to panel string */
  panel = panel.concat(bars.reduce((acc, value) => acc.concat(value)));
  panel = panel.concat('</div>');
  return panel;
};

/* Sets selector (dropdown list) */
const setSelector = (selector, options) => {
  selector.append(selectorHtml);
  selector.append(setOptions(friends));
};

/* Launches all functions when the document is ready */
$(document).ready(function() {
  /* Sets the selector (dropdown list of options) */
  setSelector($('#dropdown'), friends);
  /* Toggle the panel (list of options) */
  $('.selection').click(function() {
    $('.panel').slideToggle(500);
    /* Toggle the border color for folded and unfolded selector */
    $('#dropdown').toggleClass('active');
  });
  /* By default the slider is unfolded, so I make it folded */
  $('.panel').slideUp(0);
  /* Makes a bar selected: shovs it on the top */
  $('.bar-selector').click(function() {
    selectorHtml = $(this).html();
    $('.panel').slideUp(500);
    $('.selection').html(`${selectorHtml}<span></span>`);
    $('#dropdown').toggleClass('active');
    /* CurrentBar can be equal null before at least one option was selected */
    if (currentBar !== null) {
      currentBar.removeClass('hidden');
    }
    currentBar = $(this);
    console.log(`isSelected = ${isSelected}`);
    console.log(currentBar.val());
    console.log(defaultSelectorHtml);
    if (currentBar.innerHTML === defaultSelectorHtml) {
        isSelected = false;
      } else {
        isSelected = true;
      }
    currentBar.addClass('hidden');
    /* Selection with class 'default' has light-grey color */
    $('.selection').removeClass('default');
  });
});
