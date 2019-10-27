<?php

/*
 * A toolbox of methods for PS4 warm-up.
 */

class WarmUp
{
    /* #1 */

    /*
     * Calculates a sum of range between two numbers (including them).
     */
    function calcSumOfRange($min, $max)
    {
        $result = 0;
        for ($i = $min; $i <= $max; $i++) {
            $result += $i;
        }
        return $result;
    }

    /* #2 */

    /*
     * Calculates a sum of range, counting only numbers ending
     * with digits, provided with $endingNumbers array
     */
    function calcSumOfRangeEndingWith($endingNumbers, $min, $max)
    {
        $result = 0;
        for ($i = $min; $i <= $max; $i++) {
            if (in_array(abs($i % 10), $endingNumbers)) {
                $result += $i;
            }
        }
        return $result;
    }

    /* #3 */
    // Uploader.php and DisplayDir.php classes.

    /* #4 */
    // ChessBoard.php class.

    /* #5 */

    /*
     * Counts sum of all digits within the number.
     */
    function countSumOfDigits($number)
    {
        if (strlen($number) === 0) {
            return 0;
        }
        $result = substr($number, 0, 1);
        $result += $this->countSumOfDigits(substr($number, 1));
        return $result;
    }

    /* #6 */

    /*
     * Creates an array of random numbers from 1 to 10. Length of the array
     * is 100 elements. Deletes not unique numbers. Sorts the array. Reverses
     * it. Multiplies all numbers by 2. Prints all transitional and the final
     * results.
     */
    function processArrayAndPrintResult()
    {
        $length = 100;
        $myNumbers = array();

        for ($i = 0; $i < $length; $i++) {
            array_push($myNumbers, mt_rand(1, 10));
        }

        echo 'Array of ' . $length . ' random numbers, from 1 to 10 each one: ';
        $this->printArray($myNumbers);
        echo '<br>';

        $myNumbers = array_unique($myNumbers);
        echo '<br>After deleting repeating numbers: ';
        $this->printArray($myNumbers);
        echo '<br>';

        sort($myNumbers);
        echo '<br>After sorting: ';
        $this->printArray($myNumbers);
        echo '<br>';

        $myNumbers = array_reverse($myNumbers);
        echo '<br>After reversing: ';
        $this->printArray($myNumbers);
        echo '<br>';

        function double($value)
        {
            return ($value * 2);
        }

        $myNumbers = array_map("double", $myNumbers);
        echo '<br>After multiplying by 2: <span class="result">';
        $this->printArray($myNumbers);
        echo '</span>';
    }

    /*
     * Prints all elements of an array, separating them by comma and
     * space. In the end puts a dot.
     */
    private function printArray($ar)
    {

        $length = sizeof($ar);
        $i = 0;

        foreach ($ar as $number) {
            echo $number;
            if ($i === $length - 1) {
                echo '.';
                continue;
            }
            echo ', ';
            $i++;
        }
    }

    /* #7 */

    /*
     * Increases session counter by 1 if it is set, or creates
     * it in the $_SESSION variable, if it didn't exist yet.
     */
    function growSessionCounter()
    {
        if (isset($_SESSION['counter'])) {
            $_SESSION['counter'] = $_SESSION['counter'] + 1;
        } else {
            $_SESSION['counter'] = 1;
        }
    }

    /*
     * Returns a proper ending for an ordinal numeric.
     */
    function getOrdinalEnding($number)
    {
        if ($number === 0) {
            return '';
        }
        if ($number === 1 || (substr($number, -2, -1) != 1) && (substr($number, -1) == 1)) {
            return 'st';
        }
        if ($number === 2 || (substr($number, -2, -1) != 1) && (substr($number, -1) == 2)) {
            return 'nd';
        }
        if ($number === 3 || (substr($number, -2, -1) != 1) && (substr($number, -1) == 3)) {
            return 'rd';
        }
        return 'th';
    }

    /* #8 */

    /*
     * Counts and prints number of rows, letters and spaces in a string.
     */
    public function printTextStatistics($text)
    {
        preg_match_all('/[\n]/', $text, $rows);
        preg_match_all('/\w/u', $text, $letters);
        preg_match_all('/\s[^\r\n]/', $text, $spaces);

        echo 'Rows: <span class="result">' . (sizeof($rows[0]) + 1) . '</span><br>';
        echo 'Letters: <span class="result">' . sizeof($letters[0]) . '</span><br>';
        echo 'Spaces: <span class="result">' . sizeof($spaces[0]) . '</span>';
    }
}
