<?php


class Chat
{
    const FILE_PATH = '../data/messages.json';
    const SECONDS_IN_HOUR = 3600;
    public $logs;

    function __construct()
    {
        $this->logs = $this->getLogs();
    }

    public function getRecentMessages()
    {
        $time = time();
        $firstHourMessageIndex = 0;
        $counter = 0;
        foreach ($this->logs as $message) {
            if (($time - $message['time']) < self::SECONDS_IN_HOUR) {
                $firstHourMessageIndex = $counter;
                break;
            }
            $counter++;
        }
        if ($firstHourMessageIndex < 0) {
            return array();
        }
        return json_encode(array_slice($this->logs, $firstHourMessageIndex));
    }

    private function getLogs()
    {
        if (filesize(self::FILE_PATH) === 0) {
            return array();
        }
        $file = fopen(self::FILE_PATH, 'r') or die('Unable to open file.');
        $txt = fread($file, filesize(self::FILE_PATH));
        fclose($file);
        return json_decode($txt, true);
    }

    public function addMessage($newMessage)
    {
        array_push($this->logs, $newMessage);
    }

    public function saveLogs()
    {
        $file = fopen(self::FILE_PATH, 'w') or die('Unable to open file.');
        fwrite($file, json_encode($this->logs));
        fclose($file);
    }

}