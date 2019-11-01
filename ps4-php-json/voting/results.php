<?php

session_start();

/* Opens file for reading, reads and returns its content */
function getFileContent($fName)
{
    $file = fopen($fName, 'r+') or die('Unable to open file.');
    $txt = fread($file, filesize($fName));
    fclose($file);
    return $txt;
}

/* Opens file for writing, replaces its content */
function writeToFile($txt, $fName) {
    $file = fopen($fName, 'w+') or die('Unable to open file.');
    fwrite($file, $txt);
    fclose($file);
}

function processVote() {
    if (!isset($_POST['day'])) {
        $_SESSION['message'] = 'Something went wrong.';
        return '';
    }

    $choice = $_POST['day'];
    $oldChoice = '';
    $fName = 'vote-base.json';
    $_SESSION['message'] = '';

    if (isset($_SESSION['choice'])) {
      $oldChoice = $_SESSION['choice'];
    }

    if (file_exists($fName) && filesize($fName) > 0) {
        $txt = getFileContent($fName);
        $json = json_decode($txt, true);
    } else {
        $json = [];
        $oldChoice = '';
    }

    /* When user voted for the same options once again */
    if ($oldChoice === $choice && strlen($oldChoice) > 0) {
      $_SESSION['message'] = 'You have already voted for this option.';
      return $txt;
    }

    if (!array_key_exists($choice, $json)) {
        $json[$choice] = 0;
    }

    $json[$choice] += 1;

    if ($oldChoice !== '') {
        $json[$oldChoice] -= 1;
        $_SESSION['message'] = 'Your vote has been updated.';
    } else {
        $_SESSION['message'] = 'Your vote has been counted.';
    }

    $txt = json_encode($json, true);
    writeToFile($txt, $fName);
    $_SESSION['choice'] = $choice;
    return $txt;
}

?>

<head>
    <link rel="stylesheet" href="css/result-theme.css">
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script type="text/javascript">
        google.charts.load('current', {packages: ['corechart']});
        google.charts.setOnLoadCallback(drawChart);

        // Transform json into array
        function jsonToArray(json) {
          let result = [];
          for (let i in json){
            result.push([i, json[i]]);
          }
          return result;
        }

        function drawChart() {
            // Define the chart to be drawn.
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Element');
            data.addColumn('number', 'Percentage');
            data.addRows(jsonToArray(JSON.parse('<?= processVote(); ?>')));



            var options = {
                title: 'The best day of the week',
                titleTextStyle: {
                    color: '#c7c6c5',
                    fontSize: 24,
                },
                /* legend: 'none', */
                pieSliceText: 'percentage',
                backgroundColor: 'transparent',
                legend: {textStyle: {color: '#c7c6c5'}},
                slices: {
                    4: {offset: 0.2},
                    6: {offset: 0.2},
                },
            };

            // Instantiate and draw the chart.
            var chart = new google.visualization.PieChart(document.getElementById('myPieChart'));
            chart.draw(data, options);
        }
    </script>
</head>
<body>
<div id="message" class="message"><?= $_SESSION['message']; ?></div>


<!-- Identify where the chart should be drawn. -->
<div id="myPieChart"/>
<script src="js/script.js"></script>
</body>
