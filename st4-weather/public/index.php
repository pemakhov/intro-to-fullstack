<?php

require_once('../app/DataProcessor.php');
require_once('../app/DateAgregator.php');
require_once('../app/WeatherAregator.php');

define('ADDRESS_BASE', 'localhost:3000/public/index.php');
$srcType = $_GET['source'] ?? 'json';
$dataProcessor = new DataProcessor();
$data;

switch ($srcType) {
  case 'json':
    $dataProcessor->setData(json_decode(file_get_contents('../data/today.json')));
    break;
  case 'db':
    require_once('../app/DataFromDbCollector.php');
    $db = new DataFromDbCollector();
    $dataProcessor->setData($db->jsonToApiStructure($db->getData()));
    break;
  case 'api':
    require_once('../app/DataFromApiCollector.php');
    $api = new DataFromApiCollector();
    $dataProcessor->setData(json_decode($api->getWeather())->list);
    break;
}

$data = $dataProcessor->getForecast();

$dateAgregator = new DateAgregator($data[0]->dt);
$forecastDate = $dateAgregator->getWeekDay() . ' ' . $dateAgregator->getDayAndMonth();

$weatherAgregator = new WeatherAgregator($data);
$currentTemp = $weatherAgregator->getTemperature(0);
$currentIconHtml = $weatherAgregator->getIconHtml($data[0]->weather[0]->icon);

$forecastTable;
for ($i = 1; $i < count($data); $i++) {
  $dateAgregator->setDate($data[$i]->dt);
  $forecastTable[$i - 1] =
    '
  <div class="hourly-forecast clearfix">
    <div class="forecast-date">' . $dateAgregator->getTime() . '</div>
      <div class="forecast-weather">
          <div class="forecast-temperature">' . $weatherAgregator->getTemperature($i) . ' &deg;</div>
          <div class="forecast-icon">'
    . $weatherAgregator->getIconHtml($data[$i]->weather[0]->icon) .
    '</div>
      </div>
  </div>
  ';
}

include_once 'views/main.php';
