const MAX_NAME_AND_PASS_LENGTH = 24;

/* Validates input on typing */
const validateOnType = (input) => {
    input.keyup(() => {
        if (input.length > 0 || input.length <= MAX_NAME_AND_PASS_LENGTH) {
            input.removeClass('invalid-input');
        } else {
            input.addClass('invalid-input');
        }
    });
};

/* Validates the log-in form */
const focusOutValidationOn = (name, pass) => {
    name.focusout(() => {
        if (name.val().length > 0) {
            name.removeClass('invalid-input');
        } else {
            name.addClass('invalid-input');
        }
        validateOnType(name);
    });
    pass.focusout(() => {
        if (pass.val().length > 0) {
            pass.removeClass('invalid-input');
        } else {
            pass.addClass('invalid-input');
        }
        validateOnType(pass);
    });
};

/* Posts login-form data to server, processes server's result.
 * Downloads and shows the chat on success, or error messages on fail.
 */
const listenSubmitLogin = ($name, $pass) => {
    const $form = $('form');
    $form.submit(function (e) {
        e.preventDefault();
        const data = {name: $name.val(), pass: $pass.val()};
        $.post('index.php', data, function (result) {
            result = JSON.parse(result);
            if (result[0].length > 0 || result[1].length > 0) {
                $("label[for='name'] span").html(result[0]);
                $("label[for='pass'] span").html(result[1]);
                return;
            }
            $.ajax({
                url: "content/chat.php",
                success: function (data) {
                    $('.container').html(data);
                }
            });
            // $.getScript('js/chat.js');
        });
    });
};

/* jQuery functions */
$(document).ready(function () {
    const $name = $('#name');
    const $pass = $('#pass');
    focusOutValidationOn($name, $pass);
    listenSubmitLogin($name, $pass);
});
