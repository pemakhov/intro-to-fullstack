<?php

require_once 'Constants.php';

/*
 * Surfs files in the destination directory and echoes
 * the list containing names, size with an appropriate
 * dimension and a miniature if file is an image.
 */

class DisplayDir implements Constants
{
    private $fileNames;

    function __construct()
    {
        $this->getNames();
        $this->echoContent();
    }

    /*
     * Writes names of all files in target directory into array.
     */
    private function getNames()
    {
        $this->fileNames = array_diff(scandir(self::TARGET_DIR), array('.', '..'));
    }

    /*
     * Returns size of a file in bytes.
     */
    private function getSize($fName)
    {
        return filesize(self::TARGET_DIR . $fName);
    }

    /* Rounds file size to $precision adn returns it along with an appropriate dimension.
     * Solution from
     * https://stackoverflow.com/questions/2510434/format-bytes-to-kilobytes-megabytes-gigabytes/2510540
     */
    function formatBytes($bytes, $precision = 2)
    {
        $units = array('bytes', 'KB', 'MB', 'GB', 'TB');

        /* If $bytes has a negative value, it will be replaced with 0 */
        $bytes = max($bytes, 0);
        $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
        $pow = min($pow, count($units) - 1);
        $bytes /= (1 << (10 * $pow));

        return round($bytes, $precision) . ' ' . $units[$pow];
    }

    /*
     * Echoes the list of file names, their size an (if image) miniatures.
     */
    private function echoContent()
    {
        echo 'Target directory now contains the following files: ';
        echo '<ul>';
        foreach ($this->fileNames as $key => $name) {
            echo '<li>';
            echo '<a href="' . self::TARGET_DIR . $name . '" download>';
            echo $name;
            echo '</a>';
            echo ' (';
            echo $this->formatBytes($this->getSize($name), 1);
            echo ')';
            echo $this->getPreviewHtml(self::TARGET_DIR . $name);
            echo '</li>';
        }
        echo '</ul>';
    }

    /*
     * Returns true if a file is an image.
     */
    private function isImage($fPath)
    {
        $ext = strtolower(pathinfo($fPath, PATHINFO_EXTENSION));
        return in_array($ext, self::IMG_TYPES);
    }

    /*
     * Returns html of image preview, or empty string if file is not an image.
     */
    private function getPreviewHtml($fPath) {
        if (!$this->isImage($fPath)) {
            return '';
        }
        return ' <img src="' . $fPath . '" height="' . self::IMG_PREV_HEIGHT . '"' .
            'alt="' . pathinfo($fPath, PATHINFO_BASENAME) . '">';
    }
}