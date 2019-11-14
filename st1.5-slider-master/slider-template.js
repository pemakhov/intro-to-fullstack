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

const getPreviewImgSrcList = () => {
    return IMAGES.map(ending => API_URL + '/' + SMALL_SIZE + '/' + ending);
};

const getPreviewHtmlList = () => {
    let index = 0;
    const liStart = '<li><img class="preview" src="';
    const liEnd = '"></li>'
    let result = getPreviewImgSrcList().map(src => 
        '<li>' + 
            '<img class="preview ' + (index++) + '" src="' + src + '" alt="' + index + '">' +
        '</li>');
    return result.reduce((accumulator, current) => accumulator.concat(current));
}

/* const getPreviewHtml = () => { */
/*     let alt = 0; */
/*     return IMAGES.map(ending => '<li><img class="preview" src="' + API_URL + '/' + SMALL_SIZE + '/' */
/*         + ending + '" alt="' + (alt++) + '"></li>'); */
/* }; */

const smallSrcIntoBig = (src) => {
    return src.replace(SMALL_SIZE, BIG_SIZE);
};

const switchImgWithArrow = (right) => {
    const previous = $('li.current img');
    const previousIndex = previous.attr('alt');
    const nextIndex = right ? previousIndex + 1 : previousIndex - 1;
    const next = $('img.' + nextIndex);
    console.log(nextIndex);
    console.log(previous);
    console.log(next);
    previous.parent('li').removeClass('current');
    next.parent('li').addClass('current');
};

$(document).ready(function () {
    const $previewContainer = $('.slider-previews');
    $previewContainer.append(getPreviewHtmlList);

    let currentImageSrc = $('.slider-current img');
    $('.preview').click(function () {
        currentImageSrc.attr('src', smallSrcIntoBig($(this).attr('src')));
        $('li.current').removeClass('current');
        $(this).parent('li').addClass('current');
    });

    $(document).keydown(function(e) {
        switch(e.which) {
            case 37: switchImgWithArrow(true);
            break;
            case 39: switchImgWithArrow(false);
            break;
            default: return;
        }
        e.preventDefault();
    });
});
