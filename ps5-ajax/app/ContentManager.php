<?php

/* The class containing static methods for getting proper content and script */

class ContentManager
{
    /* The path to content */
    const CONTENT_DIR = '../public/content/';

    /* Returns proper content for the page */
    public static function getContent()
    {
        if (!isset($_SESSION['userName']) || strlen($_SESSION['userName']) === 0) {
            return include_once self::CONTENT_DIR . "login-form.php";
        }
        return include_once self::CONTENT_DIR . "chat.php";
    }

    /* Returns proper script path */
    public static function getScriptPath()
    {
        if(!isset($_SESSION['userName']) || strlen($_SESSION['userName']) === 0) {
            return 'js/log-in.js';
        }

        return 'js/chat.js';
    }
}