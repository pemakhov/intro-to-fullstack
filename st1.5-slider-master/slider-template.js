const API_URL = 'https://picsum.photos/';
const BIG_SIZE = '600/400';
const SMALL_SIZE = '60';

const IMAGES = [
    '?image=1080',
    '?image=1079',
    '?image=1069',
    '?image=1063',
    '?image=1050',
    '?image=1039'
];

/* Returns the array of preview links */
const getPreviewImgSrcList = () => {
    return IMAGES.map(ending => API_URL + '/' + SMALL_SIZE + '/' + ending);
};

/* Returns the html-list containing image tags with preview link, classes and "alt" attribute */
const getPreviewHtmlList = () => {
    let index = 0;
    let result = getPreviewImgSrcList().map(src =>
        '<li>' + 
            '<img class="preview ' + (index) + '" src="' + src + '" alt="' + index++ + '">' +
        '</li>');
    return result.reduce((accumulator, current) => accumulator.concat(current));
};

/* Creates the link on full size picture from its preview link */
const smallSrcIntoBig = (src) => {
    return src.replace(SMALL_SIZE, BIG_SIZE);
};

/* Substitutes the source of an image */
const changeImgSrc = (img, newSrc) => {
    img.attr('src', smallSrcIntoBig(newSrc));
};

/*
 * Returns an index of the next picture. If 'right' variable is true -
 * the next index will be increased by 1. Otherwise - decreased by 1.
 * If index equals the number of images in the slider, its value resets
 * to 0. If index < 0 - its value will be changed to the max value.
 */
const getNextIndex = (previousIndex, right) => {
    let nextIndex = right ? parseInt(previousIndex) + 1 : parseInt(previousIndex) - 1;
    nextIndex = (nextIndex >= IMAGES.length) ? 0 : nextIndex;
    nextIndex = (nextIndex < 0) ? IMAGES.length -1 : nextIndex;
    return nextIndex;
};

/* Switches images on the arrow key (left/right) down */
const switchImgWithArrow = (right) => {
    let previous = $('li.current img');
    let previousIndex = previous.attr('alt');
    previousIndex = (previousIndex === undefined) ? 0 : previousIndex;
    const nextIndex = getNextIndex(previousIndex, right);
    const next = $('img.' + nextIndex);
    const nextImgSrc = next.attr('src');
    previous.parent('li').removeClass('current');
    next.parent('li').addClass('current');
    changeImgSrc($('.slider-current img'), nextImgSrc);
};

/* The run point of the script */
$(document).ready(function () {
    $('.slider-previews').append(getPreviewHtmlList);
    let currentImageSrc = $('.slider-current img');
    // Changes the current image at a click on a preview
    $('.preview').click(function () {
        changeImgSrc(currentImageSrc, $(this).attr('src'));
        $('li.current').removeClass('current');
        $(this).parent('li').addClass('current');
    });
    // Changes the current image at an arrow key down
    $(document).keydown(function(e) {
        switch(e.which) {
            case 37: switchImgWithArrow(false);
            break;
            case 39: switchImgWithArrow(true);
            break;
            default: return;
        }
        e.preventDefault();
    });
});
