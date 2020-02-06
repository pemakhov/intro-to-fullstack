<!doctype html>
<html>

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Weather</title>
  <link rel="stylesheet" href="styles/app.css">
  <link href="https://fonts.googleapis.com/css?family=Quicksand|Titillium+Web" rel="stylesheet">
</head>

<body>
  <header>
    <h1>Modern weather app</h1>
  </header>
  <nav>
    <a id="request-json" class="<?php echo ($srcType === 'json') ? 'active' : '' ?> request" href="?source=json">JSON</a>
    <a id="request-db" class="<?php echo ($srcType === 'db') ? 'active' : '' ?> request" href="?source=db">Database</a>
    <a id="request-api" class="<?php echo ($srcType === 'api') ? 'active' : '' ?> request" href="?source=api">API</a>
  </nav>
  <main>
    <div class="container">
      <div class="now clearfix">
        <div class="all-50">
          <div class="date">
            <?php echo $forecastDate ?>
          </div>
          <div class="current-temperature">
            <?php echo $currentTemp ?> &deg;
          </div>
        </div>
        <div class="all-50">
          <div class="weather-icon">
            <?php echo $currentIconHtml ?>
          </div>
        </div>
      </div>
      <div class="forecast">
        <?php
        foreach ($forecastTable as $row) {
          echo $row;
        }
        ?>
      </div>
    </div>
  </main>
</body>

</html>