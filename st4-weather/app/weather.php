<?php

/* The file routing requests */

/* Request sourec types */
$requestJSON = 'request-json';
$requestDB = 'request-db';
$requestAPI = 'request-api';

if (isset($_POST['requestData'])) {
    require_once('DataProcessor.php');
    if ($_POST['requestData'] === $requestJSON) {
        $data = json_decode(file_get_contents('../data/today.json'));
        $dm = new DataProcessor($data);
        echo json_encode($dm->getForecast());
        return;
    }
    if ($_POST['requestData'] === $requestDB) {
        require_once('DataFromDbCollector.php');
        $db = new DataFromDbCollector();
        $data = $db->getData();
        $data = $db->jsonToApiStructure($data);
        $dp = new DataProcessor($data);
        echo json_encode($dp->getForecast());
        return;
    }
    if ($_POST['requestData'] === $requestAPI) {
        require_once('DataFromApiCollector.php');
        $api = new DataFromApiCollector();
        $data = json_decode($api->getWeather());
        $dm = new DataProcessor($data->list);
        echo json_encode($dm->getForecast());
        return;
    }
    return;
}