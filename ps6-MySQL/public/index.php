<?php

session_start();
main();


/* Processes requests from user or returns the page. */
function main()
{
    if (isset($_POST['get-name'])) {
        echo $_SESSION['userName'];
        return true;
    }

    if (isset($_POST['message'])) {

        if (!isset($_SESSION['userName']) || strlen($_SESSION['userName']) < 1) {
            /* This is a protection from posting by unauthenticated users */
            return false;
        }
        include_once '../app/Chat.php';
        $chat = new Chat();
        $message = $chat->prepareMessage($_POST);
        $chat->addMessage($message);
        $chat->conn->close();
        $_SESSION['lastPostTime'] = $message['time'];
        return true;
    }

    if (isset($_POST['pull-new'])) {
        if (!isset($_SESSION['lastPostTime'])) {
            $_SESSION['lastPostTime'] = 0;
        }
        $lastPostTime = $_POST['pull-new'];
        include_once '../app/Chat.php';
        $chat = new Chat();
        $result = $chat->pullNewPosts($lastPostTime);
        $chat->conn->close();
        if (!$result) {
            return false;
        }
        $_SESSION['lastPostTime'] = end($result)['time'];
        array_unshift($result, $_SESSION['lastPostTime']);
        echo json_encode($result);
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

    return include_once 'content/main.php';
}

/* Checks user input of name and password */
function checkInput($name, $pass)
{
    define("MAX_LENGTH", 50);
    $result = array('', '', '');
    $correctInput = true;
    include_once '../app/UserManager.php';
    if (strlen($name) < 1) {
        $result[0] = 'Please, enter a name';
        $correctInput = false;
    }
    if (strlen($name) >= MAX_LENGTH) {
        $result[0] = 'Max length of name is ' . MAX_LENGTH . ' symbols';
        $correctInput = false;
    }
    if (strlen($pass) < 1) {
        $result[1] = 'Please, enter a password';
        $correctInput = false;
    }
    if (strlen($pass) >= MAX_LENGTH) {
        $result[1] = 'Max length of password is ' . MAX_LENGTH . ' symbols';
        $correctInput = false;
    }
    if ($name != strip_tags($name)) {
        $result[1] = 'HTML tags are not allowed';
        $correctInput = false;
    }
    if ($correctInput) {
        $user = new UserManager($name, $pass);
        if (!$user->isReady) {
            $result[1] = 'Wrong password';
            $correctInput = false;
        }
    }
    if ($correctInput) {
        $result[2] = $name;
    }
    return $result;
}
