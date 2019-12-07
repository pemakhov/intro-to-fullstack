const classNames = [
    'darkGrayBg',
    'darkKhakiBg',
    'khakiBg',
    'lightYellowBg',
    'aquamarineBg',
];

/* Creates html for differently colored stripe */
getSpectrum = () => {
    function reducer(acc, cur) {
        return acc + cur;
    }
    const result = classNames.map(name => `<div class="${name}"></div>`).reduce(reducer);
    return result + result;
};

$(document).ready(function () {
    $('.spectrum').html(getSpectrum());
});