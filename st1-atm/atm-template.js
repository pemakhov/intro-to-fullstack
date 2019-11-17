const ATM = {
    isAuth: false,
    currentUser: {},
    // all cash available in ATM
    cash: 2000,
    // all available users
    users: [
        {id: "0000", pin: "000", debet: 0, type: "admin"}, // EXTENDED
        {id: "0025", pin: "123", debet: 675, type: "user"}
    ],
    // logs of the operations
    logs: [],
    // authorization
    auth(id, pin) {
        if (this.isAuth) {
            this.logs.unshift("An attempt authorize during the authorized session.");
            console.log("You are already authorized.");
            return;
        }
        if (typeof id !== 'string' || typeof pin !== 'string') {
            this.logs.unshift("Using forbidden characters during authorization.");
            console.log("Please, use quotation marks: \"yourId\", \"yourPin\"");
            return;
        }
        const tempUser = this.users.find(user => {
            return user.id === id
        });
        if (!tempUser) {
            this.logs.unshift("An attempt to authorize using wrong id.");
            console.log("There is no user with this id.");
            return;
        }
        if (pin !== tempUser.pin) {
            this.logs.unshift("Wrong pin during authorization.");
            console.log("Wrong pin.");
            return;
        }
        this.currentUser = tempUser;
        this.isAuth = true;
        this.logs.unshift("User (" + this.currentUser.type + ") with id " + this.currentUser.id + " authenticated.");
        console.log("Hello, " + this.currentUser.type + ", you are authorized now.");
    },
    // check current debet
    check() {
        if (!this.isAuth) {
            this.logs.unshift("An attempt to check balance from an unauthorized user.");
            console.log("You're not an authorized user.");
            return;
        }
        if (this.currentUser.type !== 'user') {
            this.logs.unshift("An attempt to check balance from not user.");
            console.log("Only users can check their balance. You are not a user.");
            return;
        }
        this.logs.unshift("User with id " + this.currentUser.id + " checked the balance.");
        console.log("You have $" + this.currentUser.debet + " on your balance.");
        return this.currentUser.debet;
    },
    // get cash - available for user only
    getCash(amount) {
        if (!this.isAuth) {
            this.logs.unshift("An unauthorized user tried to check the balance.");
            console.log("You're not an authorized user.");
            return;
        }
        if (this.currentUser.type !== 'user') {
            this.logs.unshift("Not user with id " + this.currentUser.id + " tried to withdraw money.");
            console.log("Only users can withdraw money. You are not a user.");
            return;
        }
        amount = parseInt(amount);
        if (typeof amount !== 'number' || amount <= 0) {
            this.logs.unshift("User with id " + this.currentUser.id + " made wrong input.");
            console.log("Please, input a valid amount.");
            return;
        }
        if (this.currentUser.debet < amount) {
            this.logs.unshift("User with id " + this.currentUser.id + " tried to withdraw more than on the debet.");
            console.log("You don't have enough money on your balance.");
            return;
        }
        this.currentUser.debet -= amount;
        this.cash -= amount;
        this.logs.unshift("User with id " + this.currentUser.id + " withdrew $" + amount);
        console.log("Take your money and don't forget your card!");
    },
    // load cash - available for user only
    loadCash(amount) {
        if (!this.isAuth) {
            this.logs.unshift("An unauthorized user tried to load cash.");
            console.log("You're not an authorized user.");
            return;
        }
        if (this.currentUser.type !== 'user') {
            this.logs.unshift("Not a user tried to load cash.");
            console.log("Only users can put the money on their balance. You are not a user.");
            return;
        }
        amount = parseInt(amount);
        if (typeof amount !== 'number' || amount <= 0) {
            this.logs.unshift("An attempt to load invalid amount of cash on a user's account.");
            console.log("Please, input a valid amount.");
            return;
        }
        this.currentUser.debet += amount;
        this.cash += amount;
        this.logs.unshift("User with id " + this.currentUser.id + " put $" + amount +
            " on his balance.");
        console.log("Operation is successful.");
    },
    // load cash to ATM - available for admin only - EXTENDED
    loadAtmCash(amount) {
        if (!this.isAuth) {
            this.logs.unshift("An unauthorized user tried to load ATM cash.");
            console.log("You're not authorized.");
            return;
        }
        if (this.currentUser.type !== 'admin') {
            this.logs.unshift("Not admin tried to load ATM cash.");
            console.log("Only admin can load money in ATM.");
            return;
        }
        amount = parseInt(amount);
        if (typeof amount !== 'number' || amount <= 0) {
            this.logs.unshift("An attempt to load invalid amount of ATM cash.");
            console.log("Please, input a valid amount.");
            return;
        }
        this.cash += amount;
        this.logs.unshift("Admin with id " + this.currentUser.id + " loaded $" + amount +
            "into ATM.");
        console.log("Operation is successful.");
    },
    // get cash actions logs - available for admin only - EXTENDED
    getLogs() {
        if (!this.isAuth) {
            this.logs.unshift("An unauthorized user tried to get logs.");
            console.log("You're not authorized.");
            return;
        }
        if (this.currentUser.type !== 'admin') {
            this.logs.unshift("Not admin tried to get logs.");
            console.log("Only admin can see logs.");
            return;
        }
        if (this.logs.length <= 0) {
            this.logs.unshift("An attempt to get logs, logs are empty.");
            console.log("There are no records in the database.");
            return;
        }
        const logsToShow = 5;
        let index = 0;
        const numberOfRecords = this.logs.length;
        for (const record of this.logs) {
            while (index < logsToShow || index < numberOfRecords) {
                console.log(this.logs[index]);
                index++;
            }
        }
        this.logs.unshift("Logs are got.");
    },
    // log out
    logout() {
        if (!this.isAuth) {
            this.logs.unshift("An attempt to log out by an unauthorized user.");
            console.log("You are not authorized.");
            return;
        }
        this.isAuth = false;
        this.currentUser = {};
        console.log("Good bye.");
        this.logs.unshift("User (" + this.currentUser.type + ") with id " + this.currentUser.id + " logged out.");
    },
};
