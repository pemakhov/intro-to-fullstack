<?php

include_once '../DBConfig.php';

class DBManager extends DBConfig
{

    function makeDBConnection()
    {
        $conn = new mysqli(self::SERVERNAME, self::USERNAME, self::PASSWORD, self::DBNAME);

        if ($conn->connect_error) {
            die('Connection failed: ' . $conn->connect_error);
        }
        return $conn;
    }
}