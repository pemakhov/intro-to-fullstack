<?php

echo '
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Warm-up PHP</title>
</head>
<body>';

include "WarmUp.php";

$warmUp = new WarmUp();

/* Range variables */
$MIN = -1000;
$MAX = 1000;

/* #1 */
$result = $warmUp->calcSumOfRange($MIN, $MAX);
echo "<div>1. Sum of numbers between $MIN and $MAX equals $result.</div>";
echo '<hr>';

/* #2 */
$ENDING_NUMBERS = [2, 3, 7];
$result = $warmUp->calcSumOfRangeEndingWith($ENDING_NUMBERS, $MIN, $MAX);
echo "<div>2. Sum of numbers between $MIN and $MAX ending with " . implode(", ", $ENDING_NUMBERS) .
    " equals $result.</div>";
echo '<hr>';

/* #3 */
echo '
<div>
<form action="index.php" method="post" enctype="multipart/form-data">
<label>3. Upload your files</label>
<input type="file" name="filesToUpload" id="filesToUpload">
<input type="submit" value="Upload!" name="submit">
</div>
</form>
';
echo '<hr>';


/* #5 */
$warmUp->startSessionIfNeeded();
echo "5. It's " . $_SESSION['counter'] . " time you see this page.";


echo '</body></html>';