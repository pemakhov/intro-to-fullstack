<?php

class WeatherConfig
{
    const CITY = 'kropyvnytskyi';
    const API_KEY = ''; // openweather.com api key
    public $url;

    public function __construct()
    {
        $this->url = 'http://api.openweathermap.org/data/2.5/forecast?q=' . $this::CITY . '&APPID=' . $this::API_KEY;
    }
}