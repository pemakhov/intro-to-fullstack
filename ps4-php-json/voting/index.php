<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Best day of the week</title>
    <link href="https://fonts.googleapis.com/css?family=Electrolize|Nanum+Myeongjo&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/theme.css">
</head>
<body>
<h1>Which is the best day of the week?</h1>
<div class="wrapper">
    <form action="results.php" method="post">
        <label>Sunday
            <input type="radio" name="day" value="Sunday">
        </label>
        <label>Monday
            <input type="radio" name="day" value="Monday">
        </label>
        <label>Tuesday
            <input type="radio" name="day" value="Tuesday">
        </label>
        <label>Wednesday
            <input type="radio" name="day" value="Wednesday">
        </label>
        <label>Tuesday
            <input type="radio" name="day" value="Tuesday">
        </label>
        <label>Friday
            <input type="radio" name="day" value="Friday">
        </label>
        <label>Saturday
            <input type="radio" name="day" value="Saturday">
        </label>
        <input type="submit" name="bestDay" value="Vote!">
    </form>
</div>
</body>
</html>
