<?php

class WeatherAgregator
{
    public $data;

    function __construct($data)
    {
        $this->data = $data;
    }

    private function kelvinToCelsius($kelvins)
    {
        define('KELVIN_TO_CELSIUS', 273.15);
        return $kelvins - KELVIN_TO_CELSIUS;
    }
    
    public function getTemperature($row)
    {
        return round($this->kelvinToCelsius($this->data[$row]->main->temp));
    }

    public function getIconHtml($icon)
    {
        return '<img src="http://openweathermap.org/img/wn/'. $icon . '@2x.png">';
    }

}