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
            console.log("You are already authorized.");
            return;
        }
        if (typeof id !== 'string' || typeof pin !== 'string') {
            console.log("Please, use quotation marks: \"yourId\", \"yourPin\"");
            return;
        }
        const tempUser = this.users.find(user => {return user.id === id});
        if (pin !== tempUser.pin) {
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
            console.log("You're not an authorized user.");
            return;
        }
        if (this.currentUser.type !== 'user') {
            console.log("Only users can check their balance. You are not a user.");
            return;
        }
        this.logs.unshift("User with id " + this.currentUser.id + " checked the balance.");
        console.log("You have $" + this.currentUser.debet + " on your balance.");

    },
    // get cash - available for user only
    getCash(amount) {
        if (!this.isAuth) {
            console.log("You're not an authorized user.");
            return;
        }
        if (this.currentUser.type !== 'user') {
            console.log("Only users can withdraw money. You are not a user.");
            return;
        }
        amount = parseInt(amount);
        if (typeof amount !== 'number' || amount <= 0) {
            console.log("Please, input a valid amount.");
            return;
        }
        if (this.currentUser.debet < amount) {
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
            console.log("You're not an authorized user.");
            return;
        }
        if (this.currentUser.type !== 'user') {
            console.log("Only users can put the money on their balance. You are not a user.");
            return;
        }
        amount = parseInt(amount);
        if (typeof amount !== 'number' || amount <= 0) {
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
            console.log("You're not authorized.");
            return;
        }
        if (this.currentUser.type !== 'admin') {
            console.log("Only admin can load money in ATM.");
            return;
        }
        amount = parseInt(amount);
        if (typeof amount !== 'number' || amount <= 0) {
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
            console.log("You're not authorized.");
            return;
        }
        if (this.currentUser.type !== 'admin') {
            console.log("Only admin can see logs.");
            return;
        }
        if (this.logs.length <= 0) {
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
    },
    // log out
    logout() {
        if (!this.isAuth) {
            console.log("You are not authorized.");
            return;
        }
        this.isAuth = false;
        this.currentUser = {};
        console.log("Good bye.");
        this.logs.unshift("User (" + this.currentUser.type + ") with id " + this.currentUser.id + " logged out.");
    },
};
