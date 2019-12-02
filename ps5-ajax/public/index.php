<?php
session_start();
main();

function main() {

    if (isset($_POST['getName'])) {
        echo $_SESSION['userName'];
        return true;
    }

    if (isset($_POST['newPost'])) {
        include_once '../app/Chat.php';
        $newMessage = array();
        array_push($newMessage, $_POST['time'], $_POST['userName'], $_POST['message']);
        $chat = new Chat();
        $chat->addMessage($newMessage);
        $chat->saveLogs();
        return true;
    }

    if (isset($_POST['logout'])) {
        session_unset();
        return include_once 'content/login-form.php';
    }

    if (isset($_POST['name'], $_POST['pass'])) {
        $result = checkInput($_POST['name'], $_POST['pass']);
        if (strlen($result[2]) > 0) {
            $_SESSION['userName'] = $result[2];
        }
        $result = json_encode($result);
        echo $result;
        return $result;
    }

    if (isset($_POST['newWindow'])) {
        include_once '../app/Chat.php';
        $chat = new Chat();
        echo $chat->getRecentMessages();
        return true;
    }

    return include_once 'content/main.php';
}

function checkInput($name, $pass) {
    define("MAX_LENGTH", 24);
    $result = array('', '', '');
    $correctInput = true;
    include_once '../app/UserManager.php';
    $user = new UserManager($name, $pass);
    if (strlen($name) < 1) {
        $result[0] = 'Please, enter a name';
        $correctInput = false;
    }
    if (strlen($name) >= MAX_LENGTH) {
        $result[0] = 'The name is too long';
        $correctInput = false;
    }
    if (strlen($pass) < 1) {
        $result[1] = 'Please, enter a password';
        $correctInput = false;
    }
    if (strlen($pass) >= MAX_LENGTH) {
        $result[1] = 'The password is too long';
        $correctInput = false;
    }
    if (!$user->isReady) {
        $result[1] = 'Wrong password';
        $correctInput = false;
    }
    if ($correctInput) {
        $result[2] = $name;
    }
    return $result;
}


