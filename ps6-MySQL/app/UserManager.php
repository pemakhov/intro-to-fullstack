<?php

/* The class managing users */
include_once 'DBManager.php';

class UserManager extends DBManager
{
    /* Indicates that user name is ready for usage */
    public $isReady = false;
    private $userExists = true;
    private $correctPassword = true;
    private $conn;

    public function __construct($name, $pass)
    {
        $this->conn = $this->makeDBConnection();
        $this->checkUser($name, $pass);
        if (!$this->userExists) {
            $this->appendUser($name, $pass);
        }
        $this->isReady = $this->correctPassword;
        $this->conn->close();
    }

    function checkUser($name, $pass)
    {
        $sql = "SELECT password FROM users WHERE name = '" . $name . "'";
        $result = $this->conn->query($sql);
        if ($result->num_rows === 0) {
            $this->userExists = false;
        } else {
            $this->correctPassword = mysqli_fetch_assoc($result)['password'] === $pass;
        }
    }

    /* Appends user info into database */
    function appendUser($name, $pass)
    {
        $sql = "INSERT INTO users (name, password) VALUES ('" . $name . "', '" . $pass . "')";
        $this->conn->query($sql);
    }
}