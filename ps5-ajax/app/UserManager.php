<?php

/* The class creating a json file with user data,
 * writing login data in it, then appending info data.
 */

class UserManager
{
    /* The directory path where users data is stored */
    const DIR_NAME = '../data/';
    /* User's e-mail */
    private $userName;
    /* File name, generated from user's email */
    private $fName;

    function __construct($name)
    {
        if (!isset($_POST) || sizeof($_POST) === 0) {
            return;
        }

        /* Create user and write first part of data */
        if (isset($_POST['email'], $_POST['password'])) {

            $this->makeUserDataFile();
            return;
        }
        if (isset($_SESSION['email']) && sizeof($_POST) > 0) {
            $this->appendUserDataFile();
        }
    }

    /* Creates a file with user's login data (email and password).
     * If file-name already exists, creates a correspondent message
     * in $_POST['invEmailMessage'].
     */
    function makeUserDataFile()
    {
        if (!isset($_SESSION['invEmailMessage'], $_SESSION['invPassMessage'])) {
            return;
        }
        if (strlen($_SESSION['invEmailMessage']) > 0 || strlen($_SESSION['invPassMessage']) > 0) {
            return;
        }

        $this->email = $_POST['email'];
        $this->existingFNames = $this->getFileNames();
        $this->fName = $this->makeFName($this->email);

        if (in_array($this->fName, $this->existingFNames)) {
            $_SESSION['invEmailMessage'] = 'User with this email already exists';
            return;
        }
        $this->user = $this->addUserProperties(new stdClass());
        $this->writeToFile(json_encode($this->user), $this->fName);
        $_SESSION['email'] = $this->email;
    }

    /* Appends user info into data file */
    function appendUserDataFile()
    {
        if (!isset($_SESSION['invNameMessage'],
            $_SESSION['invHouseMessage'],
            $_SESSION['invHobbiesMessage'])) {
            return;
        }
        if (strlen($_SESSION['invNameMessage']) > 0 &&
            strlen($_SESSION['invHouseMessage']) > 0 &&
            strlen($_SESSION['invHobbiesMessage']) > 0) {
            return;
        }
        $this->fName = $this->makeFName($_SESSION['email']);
        $this->user = json_decode($this->getFileContent($this->fName));
        $this->user = $this->addUserProperties($this->user);
        $this->writeToFile(json_encode($this->user), $this->fName);
    }


    /* Opens file for reading, reads and returns its content */
    function getFileContent($fName)
    {
        $fPath = self::DIR_NAME . $fName;
        $file = fopen($fPath, 'r+') or die('Unable to open file.');
        $txt = fread($file, filesize($fPath));
        fclose($file);
        return $txt;
    }

    /* Opens file for writing, replaces its content */
    function writeToFile($txt, $fName)
    {
        $fPath = self::DIR_NAME . $fName;
        $file = fopen($fPath, 'w+') or die('Unable to open file.');
        fwrite($file, $txt);
        fclose($file);
    }

    /* Creates a file name from user's email.
     * Replaces all file system forbidden characters with "-".
     * Adds ".json" extension. Returns file name.
     */
    function makeFName($email)
    {
        return (preg_replace('/[^A-Za-z0-9\-@._]/', '-', $email)) . '.json';
    }

    /* Adds user properties stored in $_POST into $this->user object */
    function addUserProperties($user)
    {
        foreach ($_POST as $key => $value) {
            $user->$key = $value;
        }
        return $user;
    }

    /* Returns the names of all files in the DIR_NAME directory. */
    private function getFileNames()
    {
        return scandir(self::DIR_NAME);
    }
}