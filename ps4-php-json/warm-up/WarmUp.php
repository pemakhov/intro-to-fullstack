<?php

Class WarmUp {
    /* #1 */
    function calcSumOfRange($min, $max) {
        $result = 0;
        for ($i = $min; $i <= $max; $i++) {
            $result += $i;
        }
        return $result;
    }

    /* #2 */
    function calcSumOfRangeEndingWith($endingNumbers, $min, $max) {
        $result = 0;
        for ($i = $min; $i <= $max; $i++) {
            if (in_array(abs($i % 10), $endingNumbers)) {
                $result += $i;
            }
        }
        return $result;
    }

    /* #5 */
    function startSessionIfNeeded() {
        if (isset($_SESSION['counter'])) {
            $_SESSION['counter']++;
        } else {
            $_SESSION['counter'] = $counter = 1;
            session_start();
        }
    }
}
