const chat = {
    userName: '',
    postLifeTerm: 3600000, // one hour
    removeOldPostsTerm: 3600, // one minute
    refreshPause: 1000, // one second
    postNumber: 0,
    posts: [],
    /* Sends last information of the posts number on the server
     * and receives the array with new number of posts in
     * first cell and new posts.
     */
    pullNewPosts(postNumber) {
        $.post('index.php', {pullPosts: postNumber}, function (result) {
            if (result[0] === this.postNumber) {
                return;
            }
            this.postNumber = result.shift();
            this.posts = this.posts.concat(result);
        });
    },

    publishNewPosts() {
        const reducer = (acc, curVal) => acc.concat(curVal);
        $('.chat__messages').html(
            posts.map(post => `<span class="time">${post.time} </span>` +
                `<span class="author">${post.author}</span>` +
                `<span class="message">${post.message}</span>`
            ).reduce(reducer)
        )
    },

    getUserName() {
        console.log(this);
        $.post('index.php', 'getName', function (result) {
            console.log(result);
            chat.userName = result;
        });
    },

    updateChat() {
        this.pullNewPosts();
        if (this.posts.length > 0) {
            this.publishNewPosts();
        }
        setTimeout(this.updateChat, this.refreshPause);
    },

    removeOldPosts() {
        const timeBorder = Date.now() - this.postLifeTerm;
        this.posts = posts.filter(post => post.time > timeBorder);
        setTimeout(this.removeOldPosts, this.removeOldPostsTerm);
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
        const newPost = chat.makePost($userInput);
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
    // chat.updateChat();
    // chat.removeOldPosts();
    listenLogOut();
    listenChatSubmit();
});
