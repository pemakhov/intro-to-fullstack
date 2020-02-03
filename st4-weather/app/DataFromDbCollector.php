<?php

include_once 'DBConnector.php';

/* Gets data from data base and creates json with web-app-api structure */
class DataFromDbCollector extends DBConnector
{
    const TABLE_NAME = 'forecast';
    private $conn;

    public function __construct()
    {
        $this->conn = $this->makeDBConnection();
    }

    public function closeConnection()
    {
        $this->conn->close();
    }

    /* Gets data from data base into an ordinary array */
    public function getData()
    {
        $myArray = array();
        if ($response = $this->conn->query("SELECT * FROM forecast")) {
            while ($row = $response->fetch_array(MYSQLI_ASSOC)) {
                $myArray[] = $row;
            }
        }
        $response->close();
        $this->conn->close();
        return $myArray;
    }

    /* Performs array of data into web app api like structure */
    public function jsonToApiStructure ($json)
    {
        $result = [];
        foreach ($json as $row) {
            $record = (object) array(
                'dt' => (int) $row['dt'],
                'main' => (object) array(
                    'temp' => (float) $row['temp'],
                ),
                'weather' => (array) array(
                    '0' => (object) array(
                        'icon' => (string) $row['icon'],
                    ),
                )
            );
            array_push($result, $record);
        }
        return $result;
    }
}
