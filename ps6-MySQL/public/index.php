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
        include_once '../app/Chat.php';
        $chat = new Chat();
        $chat->addMessage($_POST);
        $chat->saveLogs();
        $_SESSION['postsNumber']++;
        return true;
    }

    if (isset($_POST['pull-recent'])) {
        include_once '../app/Chat.php';
        $chat = new Chat();
        $result = $chat->pullRecentPosts();
        $postsNumber = sizeof($chat->logs);
        array_unshift($result, $postsNumber);
        $_SESSION['postsNumber'] = $postsNumber;
        echo json_encode($result);
        return true;
    }

    if (isset($_POST['pull-new'])) {
        if (!isset($_SESSION['postsNumber'])) {
            include_once '../app/Chat.php';
            $chat = new Chat();
            $_SESSION['postsNumber'] = sizeof($chat->logs);
        }
        $lastPostsNumber = $_POST['pull-new'];
        if ($_SESSION['postsNumber'] === $lastPostsNumber) {
            return true;
        }
        include_once '../app/Chat.php';
        $chat = new Chat();
        $result = $chat->pullNewPosts($lastPostsNumber);
        array_unshift($result, sizeof($chat->logs));
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

    if (isset($_POST['newWindow'])) {
        $chat = new Chat();
        echo $chat->pullRecentPosts();
        return true;
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

