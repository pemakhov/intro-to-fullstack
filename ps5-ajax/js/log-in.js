/* Validates input on typing */
const validateOnType = (input) => {
    input.keyup(() => {
        if (input.length > 0) {
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
        $.post('app/user-manager.php', data, function (result) {
            console.log(result);
        });
        // $.ajax({
        //     url: "content/chat.php", success: function (data) {
        //         $('.container').html(result);
        //     }
        // })
    });
});
