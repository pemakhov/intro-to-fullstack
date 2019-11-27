<?php
include_once '../app/ContentManager.php';
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
</head>
<body>
<div class="spectrum"></div>
<div class="title">Easy Chat</div>
<div class="container">
    <?php ContentManager::getContent(); ?>
</div>

<script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js"></script>
<script src="js/spectrum.js"></script>
<script src="<?php print ContentManager::getScriptPath() ?>"></script>
</body>
</html>
