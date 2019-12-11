<?php

 /* The class managing users */

class UserManager
{
    /* The directory path where users data is stored */
    const FILE_PATH = '../data/users.json';

    /* Indicates that user name is ready for usage */
    public $isReady = false;

    function __construct($name, $pass)
    {
        if (filesize(self::FILE_PATH) > 0) {
            $dataBase = $this->getDataBase();
            $user = $this->getUser($name, $dataBase);
            if ($user !== null) {
                $this->isReady = $user['pass'] == $pass;
                return;
            }
            $this->isReady = true;
            $this->appendUser($dataBase, array('name' => $name, 'pass' => $pass));
            return;
        }
        $this->appendUser(array(), array('name' => $name, 'pass' => $pass));
        $this->isReady = true;
    }

    /* Opens file for reading, reads, decodes and returns json */
    function getDataBase()
    {
        $file = fopen(self::FILE_PATH, 'r') or die('Unable to open file.');
        $txt = fread($file, filesize(self::FILE_PATH));
        fclose($file);
        return json_decode($txt, true);
    }

    /* Finds and returns a user by name. Returns null if found nothing */
    function getUser($name, $data)
    {
        foreach ($data as $obj) {
            if ($obj['name'] == $name) {
                return $obj;
            }
        }
        return null;
    }

    /* Appends user info into database array */
    function appendUser($dataBase, $user)
    {
        array_push($dataBase, $user);
        $this->writeToFile(json_encode($dataBase));
    }


    /* Opens file for writing, replaces its content */
    function writeToFile($dataBase)
    {
        $file = fopen(self::FILE_PATH, 'w') or die('Unable to open file.');
        fwrite($file, $dataBase);
        fclose($file);
    }
}