<?php

include_once 'DBManager.php';

class Chat extends DBManager
{
    /* The period of time in milliseconds to withdraw posts. */
    const RECENT_PERIOD = 3600000;

    /* The database connection */
    public $conn;

    function __construct()
    {
        $this->conn = $this->makeDBConnection();
    }

    /* Returns the new posts (newer than the $lastPostTime). */
    public function pullNewPosts($lastPostTime)
    {
        if (intval($lastPostTime) === 0) {
            $lastPostTime = round(microtime(true) * 1000) - self::RECENT_PERIOD;
        }
        $sql = "SELECT time, author, message 
                FROM messages 
                WHERE time > " . $lastPostTime;

        return $this->sqlResultToArray($this->conn->query($sql));
    }

    /* Removes html tags from the message */
    public function prepareMessage($newMessage)
    {
        $newMessage['message'] = addslashes(strip_tags($newMessage['message']));
        return $newMessage;
    }

    /* Saves messages into file. */
    public function addMessage($message)
    {
        $sql = "INSERT INTO messages (time, author, message)
                VALUES ('" . $message['time'] . "', 
                '" . $message['author'] . "', 
                '" . $message['message'] . "')";

        if ($this->conn->query($sql) === TRUE) {
            return true;
        }
        return false;
    }

    /* Makes and returns the array from an sql result */
    private function sqlResultToArray($sqlResult)
    {
        $result = array();
        while ($r = mysqli_fetch_assoc($sqlResult)) {
            $result[] = $r;
        }
        return $result;
    }
}