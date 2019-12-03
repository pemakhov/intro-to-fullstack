const chat = {
    userName: '',
    postLifeTerm: 3600000, // one hour
    removeOldPostsTerm: 60000, // one minute
    refreshPause: 1000, // one second
    postNumber: 0,
    posts: [],
    /* Pulls the array with new number of posts in
     * first cell and new posts.
     */
    pullNewPosts(postNumber) {
        let that = this;
        $.post('index.php', {pullPosts: postNumber}, function (result) {
            result = JSON.parse(result);
            if (result[0] === that.postNumber) {
                return;
            }
            that.postNumber = result.shift();
            that.posts = result;
        });
    },

    publishNewPosts() {
        const reducer = (acc, curVal) => acc.concat(curVal);
        $('.chat__messages').html(
            this.posts.map(post => `<div class="post">` +
                `<span class="time">${post.time} </span>` +
                `<span class="author">${post.author} </span>` +
                `<span class="message">${post.message}</span>` +
                `</div>`
            ).reduce(reducer)
        )
    },

    getUserName() {
        let that = this;
        $.post('index.php', 'getName', function (result) {
            that.userName = result;
        });
    },

    updateChat() {
        this.pullNewPosts(this.postNumber);
        if (this.posts.length > 0) {
            this.publishNewPosts();
        }
        setTimeout(this.updateChat.bind(this), this.refreshPause);
    },

    removeOldPosts() {
        setTimeout(this.removeOldPosts.bind(this), this.removeOldPostsTerm);
        console.log('removing old posts');
        if (this.posts.length === 0) {
            return;
        }
        const timeBorder = Date.now() - this.postLifeTerm;
        this.posts = this.posts.filter(post => post.time > timeBorder);
    },

    makePost(message) {
        return {
            time: Date.now(),
            author: this.userName,
            message: message,
        }
    },
    sendPost() {
        const $userInput = $('.chat__input').val();
        if ($userInput.length === 0) {
            return;
        }
        const newPost = this.makePost($userInput);
        $.post('index.php', newPost);
    }
};

/* Logs out and shows log-in form */
const listenLogOut = () => {
    $('a.log-out').click(function () {
        $.post('index.php', 'logout', function (result) {
            $('.container').html(result);
        });
    });
};

const listenChatSubmit = () => {
    $('.chat__submit').click(function () {
        chat.sendPost();
        $('.chat__input').val('');
    });
};

$(document).ready(function () {
    chat.getUserName();
    chat.updateChat();
    chat.removeOldPosts();
    listenLogOut();
    listenChatSubmit();
});
