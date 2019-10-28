<?php
function getFileContent($fName)
{
    $file = fopen($fName, 'r+') or die('Unable to open file.');
    $txt = fread($file, filesize($fName));
    fclose($file);
    return $txt;
}

if (isset($_POST['day'])) {
    $choice = $_POST['day'];
    $fName = 'vote-base.json';
    if (file_exists($fName) && filesize($fName) > 0) {
        $txt = getFileContent($fName);
        $json = json_decode($txt, true);
        if (!array_key_exists($choice, $json)) {
            $json[$choice] = 0;
        }
    } else {
        $json[$choice] = 0;
    }
    $json[$choice] += 1;
    $txt = json_encode($json, true);
    $file = fopen($fName, 'w+') or die('Unable to open file.');
    fwrite($file, $txt);
    fclose($file);
}
?>

<head>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script type="text/javascript">
        google.charts.load('current', {packages: ['corechart']});
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
            // Define the chart to be drawn.
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Element');
            data.addColumn('number', 'Percentage');
            data.addRows([
                ['Sunday', 55],
                ['Monday', 11],
                ['Tuesday', 22],
                ['Wednesday', 101],
                ['Thursday', 44],
                ['Friday', 77],
                ['Saturday', 66]
            ]);

            // Instantiate and draw the chart.
            var chart = new google.visualization.PieChart(document.getElementById('myPieChart'));
            chart.draw(data, null);
        }
    </script>
</head>
<body>



<!-- Identify where the chart should be drawn. -->
<div id="myPieChart" style="width: 1024px; height: 800px; margin: 0 auto;"/>
</body>