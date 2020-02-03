let data = [];
const defaultRequest = 'request-json';
const $requestJSON = $(`#${defaultRequest}`);
const $requestDB = $('#request-db');
const $requestAPI = $('#request-api');
let currentlyActiveLink = $requestJSON;
const active = 'active';

/* Gets data for a specified request */
const getData = (sourceType) => {
    $.post('../app/weather.php', { requestData: sourceType }, function (res) {
        data = JSON.parse(res);
        putData();
    });
}

/* Listens click on source type tabs */
const listenRequest = () => {
    $('.request').click(function (event) {
        event.preventDefault();
        changeActiveLink($(event.target));
        const requestId = event.target.id;
        getData(requestId);
    })
}

/* Changes the styles of tabs at a cklick */
const changeActiveLink = (element) => {
    let previouslyActiveLink = currentlyActiveLink;
    currentlyActiveLink = element;
    previouslyActiveLink.removeClass(active);
    currentlyActiveLink.addClass(active);
}

/* Puts data into the html */
const putData = () => {
    /* Returns the current day of a week */
    const getCurrentDate = () => {
        /* Returns the day name corresponding to its number */
        const getDayName = (dayNumber) => {
            const weekDayNames = [
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday'
            ];
            return weekDayNames[dayNumber];
        };
        current = new Date(data[0].dt * 1000);
        return `${getDayName(current.getDay())} ${current.getDate()}/${current.getMonth()}`;
    }

    /* Makes the html-code for an icon image */
    const makeIconHtml = (icon, size) => {
        return `<img src="http://openweathermap.org/img/wn/${icon}@2x.png"">`;
    }

    /* Constants */
    const KELVIN_TO_CELSIUS = 273.15;

    /* Transfer Kelvins in Celsius and then round */
    const formatTemperature = (kelvins) => {
        return Math.round(kelvins - KELVIN_TO_CELSIUS);
    };

    /* Returns the html-code for forecast data in a table-like form */
    const makeForecastTable = (tableData) => {
        /* Returns hours for a timestamp */
        const getHoursForTime = (timeStamp) => {
            const date = new Date(timeStamp * 1000);
            return date.getHours();
        };
        let table = [];
        for (let i = 0; i < tableData.length; i++) {
            const row = `
                <div class="hourly-forecast clearfix">
                    <div class="forecast-date">${getHoursForTime(tableData[i].dt)}:00</div>
                    <div class="forecast-weather">
                        <div class="forecast-temperature">${formatTemperature(tableData[i].main.temp)} °</div>
                        <div class="forecast-icon">
                            ${makeIconHtml(tableData[i].weather[0].icon)}
                        </div>
                    </div>
                </div>
            `;
            table.push(row);
        }
        return table.reduce((acc, cur) => acc + cur);
    }

    let $date = $('.date');
    let $currentTempere = $('.current-temperature');
    let $currentIcon = $('.weather-icon');
    let $forecast = $('.forecast');
    $date.text(getCurrentDate());
    $currentTempere.text(`${formatTemperature(data[0].main.temp)} °`);
    $currentIcon.html(makeIconHtml(data[0].weather[0].icon));
    $forecast.html(makeForecastTable(data.slice(1)));
};

/* Code executing at the page load */
$(document).ready(function () {
    getData(defaultRequest);
    listenRequest();
});

