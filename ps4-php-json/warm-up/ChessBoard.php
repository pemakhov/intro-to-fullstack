<?php

/*
 * Obtains board dimensions in format "8x8" and draws the chess board.
 */

class ChessBoard implements Constants
{
    private $width;
    private $height;
    const DIMENSIONS_PATTERN = '/^\d+x\d+$/';

    function __construct($dimensions)
    {
        /* Remove all spaces from the string */
        $dimensions = str_replace(' ', '', $dimensions);

        /* Checks input to comply with the pattern */
        if (!preg_match(self::DIMENSIONS_PATTERN, $dimensions)) {
            echo 'Invalid board dimensions';
            return;
        }

        $this->parseDimensions($dimensions);

        /* Checks width and height for maximum size */
        if ($this->width > self::MAX_BOARD_SIZE || $this->height > self::MAX_BOARD_SIZE) {
            echo 'Width or height of the board can\'t be bigger than' .
                self::MAX_BOARD_SIZE . '<br>';
            return;
        }

        echo $this->getBoardHtml($this->width, $this->height);
    }

    /*
     * Parses width and height and writes them into class fields
     */
    private function parseDimensions($dimensions)
    {
        $result = explode('x', $dimensions);
        $this->width = intval($result[0]);
        $this->height = intval($result[1]);
    }

    /*
     * Constructs board html
     */
    private function getBoardHtml($width, $height)
    {
        $isOdd = true;
        $result = '<div class="board">';
        for ($i = 0; $i < $height; $i++) {
            $result .= '<div class="board__row">';
            $rowStartsOdd = $isOdd;
            for ($j = 0; $j < $width; $j++) {
                if ($isOdd) {
                    $class = 'board__cell';
                } else {
                    $class = 'board__cell board__cell--light';
                }
                $isOdd = !$isOdd;
                $result .= '<div class="' . $class . '"></div>';
            }
            $result .= '</div>';
            $isOdd = !$rowStartsOdd;
        }
        return $result . '</div>';
    }
}