const betsDb = require("../database/models");
const usersDb = require("../database/models");
const user_betDb = require("../database/models");
const transactionsDb = require("../database/models");

const betModel = {
    list: async () => {
        try {
            return await betsDb.Bet.findAll()
        } catch (error) {
            console.log(error);
        }
    },
    createBet: async (user, event, amount) => {
        try {
            const userIfExist = await usersDb.User.findByPk(user);
            let eventIfExist = await betsDb.Bet.findByPk(event);
            if (userIfExist) {
                if (eventIfExist && eventIfExist.status == "active") {
                    if (userIfExist.balance == 0) {
                        let error = {
                            status: false,
                            msg: "You don't have funds to make a bet."
                        }
                        return error;
                    } else if (amount > userIfExist.balance) {
                        let error = {
                            status: false,
                            msg: "The bet exceeds the funds you have right now."
                        }
                        return error;
                    } else {
                        await user_betDb.User_bet.create({
                            odd: eventIfExist.odd,
                            amount: parseInt(amount),
                            state: "active",
                            users_id: user,
                            bets_id: event
                        });

                        await usersDb.User.update({
                            balance: userIfExist.balance - parseInt(amount)
                        }, {
                            where: { id: user }
                        });                                        

                        await transactionsDb.Transaction.create({
                            amount: amount,
                            category: "bet",
                            status: "active",
                            users_id: user
                        });

                        let completed = {
                            status: true,
                            msg: "The bet was created with success."
                        }

                        return completed;
                    }
                } else {
                    let error = {
                        status: false,
                        msg: "The event doesn't exist or is no longer active. Please, check again."
                    }
                    return error;
                }
            } else {
                let error = {
                    status: false,
                    msg: "The user doesn't exist in our data base."
                }
                return error;
            }
        } catch (error) {
            return error;
        }
    }
}

module.exports = betModel;