/* Easy Chat main object */
const chat = {
    /* The current user's name */
    userName: '',
    /* The period of update. */
    UPDATE_TERM: 1000,
    /* The period of update at active chatting. */
    UPDATE_QUICKLY_TERM: 100,
    /* The number of quick updates after a new message was published. */
    DEFAULT_QUICK_UPDATES: 600,
    quickUpdatesCounter: this.DEFAULT_QUICK_UPDATES,
    /* The number of posts in database.Needed for pulling only new posts at updates. */
    postNumber: 0,
    /* The array of pulled posts to be published. */
    posts: [],
    /* The sound to play at sending the post. */
    sound: new Audio('media/ding.wav'),

    /* The request for user name from the session on server. */
    getUserName() {
        let that = this;
        $.post('index.php', 'get-name', function (result) {
            that.userName = result;
        });
    },

    /* Pulls the array with new number of posts in
     * first cell and posts within last hour.
     */
    pullRecentPosts() {
        const that = this;
        $.post('index.php', 'pull-recent', function (result) {
            result = JSON.parse(result);
            that.postNumber = result.shift();
            that.posts = result;
        });
    },

    /* Pulls the array with new number of posts in
     * first cell and new posts.
     */
    pullNewPosts(postNumber) {
        const that = this;
        $.post('index.php', {'pull-new': postNumber}, function (result) {
            result = JSON.parse(result);
            if (result[0] === that.postNumber) {
                return;
            }
            that.postNumber = result.shift();
            that.posts = result;
        });
    },

    /* Publish pulled posts into the chat window. */
    publishPosts() {
        if (!this.posts.length) {
            return;
        }
        const reducer = (acc, curVal) => acc.concat(curVal);
        const $messagesBox = $('.chat__messages');
        $messagesBox.append(
            this.posts.map(post => `<div class="post">` +
                `<span class="time">${this.getTimeString(post.time)} </span>` +
                `<span class="author">${post.author}: </span>` +
                `<span class="message">${this.replaceSmiles(post.message)}</span>` +
                `</div>`
            ).reduce(reducer)
        );
        this.posts = [];
        $messagesBox.animate({scrollTop: $messagesBox.prop('scrollHeight')}, 500);
    },

    /* Replaces some text smiles with image html. */
    replaceSmiles(post) {
        const happyPattern = /(:\))/g;
        const sadPattern = /(:\()/g;
        const happySmile = '<img class="smile" src="img/happy.png" alt=":)">';
        const sadSmile = '<img class="smile" src="img/sad.png" alt=":(">';
        return post.replace(happyPattern, happySmile).replace(sadPattern, sadSmile);
    },

    /* Creates and returns the time of post creation from the time stamp. */
    getTimeString(timeStamp) {
        const time = new Date(parseInt(timeStamp));
        const addMissingZero = (part) => (part >= 0 && part <= 9) ? '0' + part : part;
        return `[${addMissingZero(time.getHours())}:${addMissingZero(time.getMinutes())}:` +
            `${addMissingZero(time.getSeconds())}]`;
    },

    /* Checks the server for new posts. */
    updateChat() {
        this.pullNewPosts(this.postNumber);
        if (this.posts.length > 0) {
            this.publishPosts();
            this.quickUpdatesCounter = this.DEFAULT_QUICK_UPDATES;
        }
        const delay = this.setDelay();
        setTimeout(this.updateChat.bind(this), delay);
    },

    /* Returns the term of milliseconds for update, according to the activity. */
    setDelay() {
        if (this.quickUpdatesCounter <= 0) {
            return this.UPDATE_TERM;
        }
        this.quickUpdatesCounter--;
        return this.UPDATE_QUICKLY_TERM;
    },

    /* Creates the post object. */
    makePost(message) {
        return {
            time: Date.now(),
            author: this.userName,
            message: message,
        }
    },

    /* Sends post on the server. */
    sendPost() {
        const $userInput = $('.chat__input').val();
        if ($userInput.length === 0) {
            return;
        }
        const newPost = this.makePost($userInput);
        $.post('index.php', newPost);
        this.sound.play();
    },
};

/* Logs out and shows log-in form */
const listenLogOut = () => {
    $('a.log-out').click(function () {
        $.post('index.php', 'logout', function (result) {
            $('.container').html(result);
        });
    });
};

/* Listens to the submit button. */
const listenChatSubmit = () => {
    $('.chat__submit').click(function () {
        chat.sendPost();
        $('.chat__input').val('');
    });
};

/* Listens to the enter key at cursor in the text field. */
const listenSubmitWithEnter = () => {
    $('.chat__input').keypress(function (e) {
        const key = e.which;
        if (key === 13) {
            chat.sendPost();
            $('.chat__input').val('');
        }
    })
};

chat.getUserName();
chat.pullRecentPosts();
chat.updateChat();
listenLogOut();
listenChatSubmit();
listenSubmitWithEnter();
