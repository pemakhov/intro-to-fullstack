<?php
/* Returns proper content for the page */
function getContent()
{
    if (isset($_SESSION['userName']) && strlen($_SESSION['userName']) > 0) {
        return include_once "chat.php";
    }
    return include_once "login-form.php";
}

?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Easy Chat</title>
    <link type="text/css" href="https://fonts.googleapis.com/css?family=Pacifico|Montserrat&display=swap"
          rel="stylesheet">
    <link rel="stylesheet" href="css/theme.css">
    <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js"></script>
</head>
<body>
<div class="spectrum"></div>
<div class="title">Easy Chat</div>
<div class="container">
    <?php getContent(); ?>
</div>

<script src="js/spectrum.js"></script>
<script src="js/login.js"></script>
</body>
</html>
