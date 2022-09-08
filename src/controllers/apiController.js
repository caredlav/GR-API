const userModel = require('../models/userModel');
const betModel = require('../models/betModel');

const apiController = {
    registerUser: (req, res) => {
        const userInfo = req.body;
        userModel.create(userInfo);
        res.status(200).json({
            status: 200,
            msg: "User created with success!."
        })
    },
    access: async (req, res) => {
        try {
            const user = req.body.email;
            const userFound = await userModel.login(user);

            if (userFound) {
                res.status(200).json({
                    status: 200,
                    msg: "Logged with success. Hello " + userFound.username + "!"
                })
            } else {
                res.status(500).json({
                    status: 500,
                    msg: "There's no user registered with that email."
                })
            }
        } catch (error) {
            console.log(error);
        }
    },
    getEvents: async (req, res) => {
        try {
            const events = await betModel.list();
            res.status(200).json({
                status: 200,
                meta: {
                    events
                }
            })
        } catch (error) {
            console.log(error);
        }
    },
    makeBet: async (req, res) => {
        try {
            const userId = req.params.id;
            const event = req.params.idevent;
            const bet = req.body.bet;
            const process = await betModel.createBet(userId, event, bet);
            if (process.status) {
                res.status(200).json({
                    status: 200,
                    msg: process.msg
                });
            } else {       
                console.log(process.status);         
                res.status(500).json({
                    status: 500,
                    msg: process.msg
                });
            }
        } catch (error) {
            console.log(error);
        }
    },
    updateUserInfo: async (req, res) => {
        try {
            const user = req.params.id;
            const info = req.body;
            const process = await userModel.update(user, info);
            if (process) {
                res.status(200).json({
                    status: 200,
                    msg: "The info was updated with success!"
                });
            } else {
                res.status(500).json({
                    status: 500,
                    msg: "The user you're trying to update isn't exist."
                })
            }
        } catch (error) {
            console.log(error);
        }
    },
    getBalance: async (req, res) => {
        try {
            const id = req.params.id;
            const usersBalance = await userModel.actualBalance(id);
            if (usersBalance) {
                res.status(200).json({
                    status: 200,
                    meta: {
                        username: usersBalance.username,
                        currentBalance: usersBalance.balance
                    }
                });
            } else {
                res.status(500).json({
                    status: 500,
                    msg: "The user isn't exist in our data base."
                });
            }
        } catch (error) {
            console.log(error);
        }
    },
    deposit: async (req, res) => {
        try {
            const user = req.params.id;
            const amount = req.body.amount;
            const process = await userModel.addMoney(user, amount);
            if (process) {
                res.status(201).json({
                    status: 201,
                    msg: "You have deposited " + amount + " to your balance."
                });
            } else {
                res.status(500).json({
                    status: 500,
                    msg: "The user isn't exist in our data base."
                })
            }
        } catch (error) {
            console.log(error);
        }
    },
    withdraw: async (req, res) => {
        try {
            const user = req.params.id;
            const amount = req.body.amount;
            const process = await userModel.takeMoney(user, amount);
            if (process.status) {
                res.status(200).json({
                    status: 200,
                    msg: process.msg
                })
            } else {
                res.status(500).json({
                    status: 500,
                    msg: process.msg
                })
            }
        } catch (error) {
            console.log(error);
        }
    },
    getTransactions: async (req, res) => {
        try {
            const user = req.params.id;
            const type = req.body.type;
            const transactions = await userModel.transactions(user,type);
            if (transactions) {
                res.status(200).json({
                    status: 200,
                    meta: {
                        transactions: transactions
                    }
                })
            } else {
                res.status(500).json({
                    status: 500,
                    msg: "The user isn't exist in our data base."
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = apiController;