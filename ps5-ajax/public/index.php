<?php
session_start();
main();

function main() {

    if (isset($_POST['name'])) {
        echo 'hello';
        return;
    }

    include_once 'content/main.php';
}



