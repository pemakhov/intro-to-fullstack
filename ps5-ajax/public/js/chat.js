let userName;

/* Logs out and shows log-in form */
const listenLogOut = () => {
    $('a.log-out').click(function () {
        $.post('index.php', 'logout', function (result) {
            $('.container').html(result);
        });
    });
};

const getUserName = () => {
    $.post('index.php', 'getName', function (result) {
        userName = result;
    });
};

const loadRecentMessages = () => {
    $.post('index.php', 'newWindow', function (result) {
        $('.chat__messages').html(result);
    });
};

const makeRecord = ($message, $userName) => {
    return {
        time: Date.now(),
        userName: $userName,
        message: $message,
    };
};

const pushMessage = (mes) => {
    $('.chat__messages').append(
        `<div>` +
        `<span class="timeStamp">${mes.time}</span>` +
        `<span class="userName">${mes.userName}</span>` +
        `<span class="message">${mes.message}</span>` +
        `</div>`
    )
};

const listenChatSubmit = () => {
    $('.chat__submit').click(function () {
        const $userInput = $('.chat__input').val();
        if ($userInput.length === 0) {
            return;
        }
        const message = makeRecord($userInput, userName);
        $.post('index.php', message);
        pushMessage(message);
    });
};

$(document).ready(function () {
    getUserName();
    loadRecentMessages();
    listenLogOut();
    listenChatSubmit();
});
