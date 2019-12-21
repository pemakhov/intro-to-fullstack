<?php

include_once 'config.php';
/* $servername = 'localhost'; */
/* $username = 'root'; */
/* $password = ''; */
$dbname = 'easyChatDB';

$conn = new mysqli($servername, $username, $password);
if ($conn->connect_error) {
    die('Connection failed ' . $conn->connect_error);
}

$sql = 'CREATE DATABASE ' . $dbname;

if ($conn->query($sql) === TRUE) {
  echo 'Database created successfully';
} else {
  echo'Error creating database: ' . $conn->error;
}
echo '<br>';

$conn->close();

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die('Connection failed ' . $conn->connect_error);
    echo '<br>';
}

$sql = 'CREATE TABLE users (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30) NOT NULL,
password VARCHAR(30)
)';

if ($conn->query($sql) === TRUE) {
  echo 'Table users created successfully';
} else {
  echo 'Error creating table: ' . $conn->error;
}
echo '<br>';

$sql = 'CREATE TABLE messages (
timestamp INT(11) UNSIGNED PRIMARY KEY,
name VARCHAR(30) NOT NULL,
message VARCHAR(65535) NOT NULL
)';

if ($conn->query($sql) === TRUE) {
  echo 'Table messages created successfully';
} else {
  echo 'Error creating table: ' . $conn->error;
}

$conn->close();


