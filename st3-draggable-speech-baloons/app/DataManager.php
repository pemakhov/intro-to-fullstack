<?php

class DataManager
{
    /* Elements database file path. */
    const FILE_PATH = '../data/balloons.json';
    /* The database of posts. */
    public $elements;

    function __construct()
    {
        $this->elements = $this->getElements();
    }

    /* Returns elements from the database file. */
    private function getElements()
    {
        if (filesize(self::FILE_PATH) === 0) {
            return array();
        }
        return json_decode(file_get_contents(self::FILE_PATH), true);
    }

    /* Adds or updates the element */
    public function updateElement($element)
    {
        $elementKey = $this->getElementKey($element['id']);
        if ($elementKey === -1) {
            if ($element['text'] === '') {
                return;
            }
            array_push($this->elements, $element);
            $this->saveElements();
            return;
        }
        if ($element['text'] === '') {
            array_splice($this->elements, $elementKey, 1);
        } else {
            $this->elements[$elementKey] = $element;
        }
        $this->saveElements();
    }

    /* Gets element key in the array, or returns -1 if element with this id don't exists */
    private function getElementKey($needle) {
        foreach ($this->elements as $key => $value) {
            if ($value['id'] === $needle) {
                return $key;
            }
        }
        return -1;
    }

    /* Saves elements into file. */
    public function saveElements()
    {
        $file = fopen(self::FILE_PATH, 'w') or die('Unable to open file.');
        fwrite($file, json_encode($this->elements));
        fclose($file);
    }
}