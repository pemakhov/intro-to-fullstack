<?php

class DateAgregator
{
  private $date;

  function __construct($date)
  {
    $this->date = $date;
  }

  public function setDate($date)
  {
    $this->date = $date;
  }

  private function weekDayByNumber($number)
  {
    $days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return $days[$number];
  }

  public function getWeekDay()
  {
    return $this->weekDayByNumber(date('w', strtotime($this->date)));
  }

  public function getDayAndMonth()
  {
    return date('d/m', $this->date);
  }

  public function getTime()
  {
    return date('h:i', $this->date);
  }

}

