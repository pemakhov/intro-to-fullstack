<?php

include_once 'DBConfig.php';

$db = new DBConfig();

$servername = $db::SERVERNAME;
$username = $db::USERNAME;
$password = $db::PASSWORD;
$dbname = $db::DBNAME;

$conn = new mysqli($servername, $username, $password);
if ($conn->connect_error) {
    die('Connection failed ' . $conn->connect_error);
}

$sql = 'CREATE DATABASE ' . $dbname;

if ($conn->query($sql) === TRUE) {
    echo 'Database created successfully';
} else {
    echo 'Error creating database: ' . $conn->error;
}
echo '<br>';

$conn->close();

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die('Connection failed ' . $conn->connect_error);
}

$sql = 'CREATE TABLE users (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30) NOT NULL,
password VARCHAR(256)
)';

if ($conn->query($sql) === TRUE) {
    echo 'Table users created successfully';
} else {
    echo 'Error creating table: ' . $conn->error;
}
echo '<br>';

$sql = 'CREATE TABLE messages (
time VARCHAR(16) PRIMARY KEY,
author VARCHAR(30) NOT NULL,
message TEXT NOT NULL
)';

if ($conn->query($sql) === TRUE) {
    echo 'Table messages created successfully';
} else {
    echo 'Error creating table: ' . $conn->error;
}

$conn->close();


