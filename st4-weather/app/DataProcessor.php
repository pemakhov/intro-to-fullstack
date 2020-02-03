<?php

/* Gets from array needed number of records, the most close to the current time */
class DataProcessor
{
    /* Needed number of records */
    const RECORDS_NUMBER = 7;
    private $data;
    private $today;

    function __construct($data)
    {
        $this->data = $data;
        $this->today = time();
    }

    /* Gets needed records */
    public function getForecast()
    {
        return $this->getRecords($this->getCurrentTimeIndex(), $this::RECORDS_NUMBER);
    }

    /* Gets the index of a record containing the next to current time forecast */
    private function getCurrentTimeIndex()
    {
        $data = $this->data;
        $recordsNumber = count($data);
        for ($i = 0; $i < $recordsNumber; $i++) {
            if ($data[$i]->dt > $this->today) {
                if (($recordsNumber - $i) < $this::RECORDS_NUMBER) {
                    break;
                }
                return $i;
            }
        }
        return -1;
    }

    /* Gets records for specified start index and length */
    private function getRecords($start, $length)
    {
        if ($start === -1) {
            return array_slice($this->data, -$length);
        }
        return array_slice($this->data, $start, $length);
    }
}
