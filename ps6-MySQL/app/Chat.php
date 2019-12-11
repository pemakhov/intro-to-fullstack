<?php


class Chat
{
    /* Messages database file path. */
    const FILE_PATH = '../data/messages.json';
    /* The period of time in milliseconds to withdraw posts. */
    const RECENT_PERIOD = 3600000;
    /* The database of posts. */
    public $logs;

    function __construct()
    {
        $this->logs = $this->getLogs();
    }

    /* Returns the recent posts or the empty array. */
    public function pullRecentPosts()
    {
        $timeBorder = round(microtime(true) * 1000) - self::RECENT_PERIOD;
        $result = array_filter($this->logs, function ($record) use ($timeBorder) {
            return $record['time'] > $timeBorder;
        });
        return empty($result) ? [] : $result;
    }

    /* Returns the new posts (newer than the $lastPostNumber). */
    public function pullNewPosts($lastPostsNumber)
    {
        return array_slice($this->logs, $lastPostsNumber);
    }

    /* Returns the posts from the database file. */
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

    /* Adds a new post into logs */
    public function addMessage($newMessage)
    {
        $newMessage['message'] = strip_tags($newMessage['message']);
        array_push($this->logs, $newMessage);
    }

    /* Saves logs into file. */
    public function saveLogs()
    {
        $file = fopen(self::FILE_PATH, 'w') or die('Unable to open file.');
        fwrite($file, json_encode($this->logs));
        fclose($file);
    }
}