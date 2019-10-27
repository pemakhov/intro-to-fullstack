<?php

require_once 'Constants.php';

/*
 * Uploads a file in the destination directory and echoes a message about result.
 */

class Uploader implements Constants
{
    private $file;
    private $tmpFilePath;
    private $newFilePath;
    private $fileType;

    function __construct($tmpFile) {
        $this->file = $tmpFile;
        $this->tmpFilePath = $tmpFile["tmp_name"];
        $this->newFilePath = self::TARGET_DIR . basename($tmpFile['name']);
        $this->fileType = strtolower(pathinfo($this->newFilePath, PATHINFO_EXTENSION));

        if ($this->alreadyExists()) {
            echo $this->formMessage("A file with name " .
                $this->file["name"] . " already exists in the destination directory.");
            return;
        }

        if ($this->isTooBig()) {
            echo $this->formMessage("File is too big.");
            return;
        }

        if (move_uploaded_file($this->tmpFilePath, $this->newFilePath)) {
            echo $this->formMessage("The file " . $this->file["name"] . " has been uploaded.");
        } else {
            echo $this->formMessage("Sorry, there was an error uploading your file.");
        }

    }

    /*
     * Checks if file with such name exists in the destination directory.
     */
    private function alreadyExists() {
        return file_exists($this->newFilePath);
    }

    /*
     * Checks if
     */
    private function isTooBig() {
        return $this->file['size'] > self::MAX_FILE_SIZE;
    }

    /*
     * Puts a message into html tags.
     */
    private function formMessage($message) {
        return '<div id="message">' . $message . '</div>';
    }
}
