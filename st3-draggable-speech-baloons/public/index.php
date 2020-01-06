<?php
main();

function main()
{
    if (!isset($_POST) || empty($_POST)) {
        include_once 'content/main.php';
        return true;
    }

    include_once '../app/DataManager.php';
    $dataManager = new DataManager();

    if (isset($_POST['pull'])) {
        echo json_encode($dataManager->elements);
        return true;
    }
    if (isset($_POST['id'])) {
        $dataManager->updateElement($_POST);
    }
    return false;
}
