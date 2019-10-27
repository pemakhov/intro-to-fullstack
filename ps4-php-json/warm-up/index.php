<?php

session_start();

echo '
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Warm-up PHP</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css">
    <link rel="stylesheet" href="css/theme.css">
</head>
<body>
<div id="wrapper">
<h1>PHP Warm-up</h1>
';

include "WarmUp.php";

$warmUp = new WarmUp();

/* Range variables */
$MIN = -1000;
$MAX = 1000;

/* #1 */
$result = $warmUp->calcSumOfRange($MIN, $MAX);
echo "
<div>
1. Sum of numbers between $MIN and $MAX equals <span class='result'>$result</span>.
<hr>
</div>
";

/* #2 */
$ENDING_NUMBERS = [2, 3, 7];
$result = $warmUp->calcSumOfRangeEndingWith($ENDING_NUMBERS, $MIN, $MAX);
echo "
<div>2. Sum of numbers between $MIN and $MAX ending with " . implode(", ", $ENDING_NUMBERS) .
    " equals <span class='result'>$result</span>.
<hr>
</div>
";

/* #3 */
echo '
<div>
<form action="index.php" method="post" enctype="multipart/form-data">
<label>3. Upload your files</label>
<br>
<input type="file" name="fileToUpload" id="fileToUpload">
<input type="submit" value="Upload!" name="submit">
</form>
';

include 'Uploader.php';
if (isset($_FILES['fileToUpload'])) {
    $nextFile = new Uploader($_FILES['fileToUpload']);
}

include 'DisplayDir.php';
if (isset($_FILES['fileToUpload'])) {
    $displayDir = new DisplayDir();
}

echo '
<hr>
</div>
';

/* 4 */
echo '
<form action="index.php" method="post" enctype="multipart/form-data">
<label>4. Input board dimensions in format "8x8":<br>
</label>
<input type="text" name="dimensions">
<input type="submit" value="Draw!" name="board">
</form>
';

include 'ChessBoard.php';
if (isset($_POST['dimensions'])) {
    $board = new ChessBoard($_POST['dimensions']);
}
echo '
<div>
    <hr>
</div>
';

/* #5 */

echo '
<div>
<form action="index.php" method="post" enctype="multipart/form-data">
<label>5. Enter a number:<br>
</label>
<input type="number" name="number">
<input type="submit" value="Count!" name="sumCount">
</form>
';

if (isset($_POST['number'])) {
    $number = $_POST['number'];
    $result = $warmUp->countSumOfDigits(abs($number));
    echo '<div>Sum of digits within ' . $number . ' equals <span class="result">' . $result . '.</span></div>';
}
echo '
<hr>
</div>
';

/* #6 */
echo '
<div>6. Array operations.<br>
<br>
';

$warmUp->processArrayAndPrintResult();

echo '
<hr>
</div>
';

/* #7 */

$warmUp->growSessionCounter();
echo "
<div>
7. It's <span class='result'>" . $_SESSION['counter'] .
    $warmUp->getOrdinalEnding($_SESSION['counter']) . "</span> time you see this page.
<hr>
</div>
";

/* #8 */

echo '
<div>
<form action="index.php" method="post" enctype="multipart/form-data">
<label>8. Row, letter and space counter.</label>
<br>
<textarea name="text" placeholder="Input some text here." cols="50" rows="6"></textarea>
<br>
<input type="submit" value="Count!" name="textCounter">
</form>
';

if (isset($_POST['text'])) {
    $text = $_POST['text'];
    $warmUp->printTextStatistics($text);
}

echo '
<hr>
</div>
';

echo '
</div> <!--wrapper-->
</body>
</html>
';
