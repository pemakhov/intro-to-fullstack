<?php
include_once '../WeatherConfig.php';

/* Contains functions for fetching data from api */
class DataFromApiCollector extends WeatherConfig
{
    /* Gets data from api */
    public function getWeather()
    {
        $result = file_get_contents($this->url);
        if (!$result) {
            throw new \Exception('No response from API');
        }
        return $result;
    }

    /* Exports data from api into data base. Not used in app. */
    public function exportToDb()
    {
        $data = json_decode($this->getWeather());
        $data = $data->list;
        include_once 'DBConnector.php';
        $dbc = new DBConnector();
        $conn = $dbc->makeDBConnection();
        $i = 0;
        foreach ($data as $row) {
            $dt = $row->dt;
            $temp = $row->main->temp;
            $icon = $row->weather[0]->icon;
            $conn->query("INSERT INTO `forecast` (`id`, `dt`, `temp`, `icon`) 
       VALUES ('" . $i++ . "', '" . $dt . "', '" . $temp . "', '" . $icon . "')");
        }
        $conn->close;
        return $data;
    }
}
