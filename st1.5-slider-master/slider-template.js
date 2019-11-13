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

const getPreviewHtml = () => {
    let alt = 0;
    return IMAGES.map(ending => '<li><img class="preview" src="' + API_URL + '/' + SMALL_SIZE + '/'
        + ending + '" alt="' + (alt++) + '"></li>');
};

$(document).ready(function () {
    const $previewContainer = $('.slider-previews');
    const previewListHtml = getPreviewHtml();
    for (const item of previewListHtml) {
        $previewContainer.append(item);
    }

    console.log($('.slider-current img'));
    let currentImageSrc = $('.slider-current img');
    $previewContainer.click(function () {
        $newSrc = $(this).attr('src');
        currentImageSrc.attr('src', $newSrc);
    });

});
