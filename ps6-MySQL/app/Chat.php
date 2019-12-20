<?php

class Chat
{
    /* Messages database file path. */
    const FILE_PATH = '../data/messages.json';
    /* The period of time in milliseconds to withdraw posts. */
    const RECENT_PERIOD = 3600000;
    /* The database of posts. */
    public $messages;

    function __construct()
    {
        $this->messages = $this->getMessages();
    }

    /* Returns the recent posts or the empty array. */
    public function pullRecentPosts()
    {
        $timeBorder = round(microtime(true) * 1000) - self::RECENT_PERIOD;
        $result = array_filter($this->messages, function ($record) use ($timeBorder) {
            return $record['time'] > $timeBorder;
        });
        return empty($result) ? [] : $result;
    }

    /* Returns the new posts (newer than the $lastPostNumber). */
    public function pullNewPosts($lastPostsNumber)
    {
        return array_slice($this->messages, $lastPostsNumber);
    }

    /* Returns the posts from the database file. */
    private function getMessages()
    {
        if (filesize(self::FILE_PATH) === 0) {
            return array();
        }
        return json_decode(file_get_contents(self::FILE_PATH), true);
    }

    /* Adds a new post into messages */
    public function addMessage($newMessage)
    {
        $newMessage['message'] = strip_tags($newMessage['message']);
        array_push($this->messages, $newMessage);
    }

    /* Saves messages into file. */
    public function saveMessages()
    {
        $file = fopen(self::FILE_PATH, 'w') or die('Unable to open file.');
        fwrite($file, json_encode($this->messages));
        fclose($file);
    }
}