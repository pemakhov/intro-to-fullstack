const MAX_NAME_AND_PASS_LENGTH = 24;
let userName = '';

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
const validateForm = (name, pass) => {
    name.focusout(() => {
        if (name.val().length > 0) {
            name.removeClass('invalid-input');
        } else {
            name.addClass('invalid-input');
            console.log('hello');
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

const isValidInput = (name, pass) => {
    return name.val().length > 0 && pass.val().length > 0;
};

/* jQuery functions */
$(document).ready(function () {
    const $form = $('form');
    const $name = $('#name');
    const $pass = $('#pass');
    validateForm($name, $pass);
    $form.submit(function (e) {
        e.preventDefault();
        if (!isValidInput($name, $pass)) {
            return;
        }
        const data = {name: $name.val(), pass: $pass.val()};
        $.post('index.php', data, function (result) {
            console.log(result);
            if (result[0].length > 0 || result[1].length > 0) {
                $("label[for='name'] span").html(result[0]);
                $("label[for='pass'] span").html(result[1]);
                return;
            }
            if ($name.val() !== result[2]) {
                $("label[for='name'] span").html('A very strange error');
            }
            userName = result[2];
        });
        // $.ajax({
        //     url: "content/chat.php", success: function (data) {
        //         $('.container').html(result);
        //     }
        // })
    });
});
