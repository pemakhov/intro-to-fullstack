<?php

session_start();

function getFileContent($fName)
{
    $file = fopen($fName, 'r+') or die('Unable to open file.');
    $txt = fread($file, filesize($fName));
    fclose($file);
    return $txt;
}

function writeToFile($txt, $fName) {
    $file = fopen($fName, 'w+') or die('Unable to open file.');
    fwrite($file, $txt);
    fclose($file);
}

function processVote() {
    if (!isset($_POST['day'])) {
        return '';
    }
    $choice = $_POST['day'];
    $oldChoice = '';
    $_SESSION['message'] = '';
    $fName = 'vote-base.json';
    if (file_exists($fName) && filesize($fName) > 0) {
        $txt = getFileContent($fName);
        if (isset($_SESSION['choice'])) {
          $oldChoice = $_SESSION['choice'];
          if ($oldChoice === $choice) {
            $_SESSION['message'] = 'You have already voted for this option.';
            return $txt;
          }
        }
        $json = json_decode($txt, true);
        if (!array_key_exists($choice, $json)) {
            $json[$choice] = 0;
        }
    } else {
        $json[$choice] = 0;
    }
    $json[$choice] += 1;
    if ($oldChoice !== '') {
        $json[$oldChoice] -= 1;
        $_SESSION['message'] = 'Your vote was updated.';
    }
    $txt = json_encode($json, true);
    writeToFile($txt, $fName);
    $_SESSION['choice'] = $choice;
    return $txt;
}

?>

<head>
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
                /* legend: 'none', */
                pieSliceText: 'percentage',
                slices: {  2: {offset: 0.2},
                },
            };

            // Instantiate and draw the chart.
            var chart = new google.visualization.PieChart(document.getElementById('myPieChart'));
            chart.draw(data, options);
        }
    </script>
</head>
<body>
<div><?= $_SESSION['message']; ?></div>



<!-- Identify where the chart should be drawn. -->
<div id="myPieChart" style="width: 1024px; height: 800px; margin: 0 auto;"/>
</body>
