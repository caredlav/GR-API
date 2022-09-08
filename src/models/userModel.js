const usersDb=require('../database/models');
const transactionsDb=require("../database/models");

const userModel={
    create: async(info)=>{
        try {
            await usersDb.User.create({
                role: "user",
                first_name: info.name,
                last_name: info.lastName,
                phone: info.phone,
                email: info.email,
                username: info.userName,
                address: info.address,
                gender: info.gender,
                birth_date: info.birthDate,
                country: info.country,
                city: info.city,
                category: info.category,
                user_state: "active"
            });
        } catch (error) {
            console.log(error);
        }
    },
    login: async(user)=>{
        try {
            const userIfWasFound=await usersDb.User.findOne({
            where: {
                email: user
            }
        });
        if (userIfWasFound) {
            return userIfWasFound;
        } else {
            return false;
        }
        } catch (error) {
            console.log(error);
        }        
    },
    update: async(user,info)=>{
        try {
            const userFound=await usersDb.User.findByPk(user);
        if (userFound) {
            await usersDb.User.update({
                first_name: info.name!='' || info.name!=null ? info.name : userFound.first_name,
                last_name: info.lastName!='' || info.lastName!=null ? info.lastName : userFound.last_name,
                phone: info.phone!='' || info.phone!=null ? info.phone : userFound.phone,
                email: info.email!='' || info.email!=null ? info.email : userFound.email,
                username: info.userName!='' || info.userName!=null ? info.userName : userFound.username,
                address: info.address!='' ||  info.address!=null ? info.address : userFound.address,
                gender: info.gender!='' || info.gender!=null ? info.gender : userFound.gender,
                birth_date: info.birthDate!='' || info.birthDate!=null ? info.birthDate : userFound.birth_date,
                country: info.country!='' || info.country!=null ? info.country : userFound.country,
                city: info.city!='' || info.city!=null ? info.city : userFound.city,
                category: info.category!='' || info.category!=null ? info.category : userFound.category                
            },{
                where: {id: user}
            });
            return true;
        } else {
            return false;
        }
        } catch (error) {
            console.log(error);
        }        
    },
    actualBalance: async(id)=>{
        try {
            const userIfExist=await usersDb.User.findByPk(id);
            if (userIfExist) {
                return userIfExist;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
        }
    },
    addMoney: async(id,amount)=>{
        try {
            const userIfExist=await usersDb.User.findByPk(id);
            
            if (userIfExist) {
                await usersDb.User.update({
                    balance: userIfExist.balance+parseInt(amount)
                },{
                    where: {id: id}
                });

                await transactionsDb.Transaction.create({
                    amount: amount,
                    category: "deposit",
                    status: "settled",
                    users_id: id
                });

                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
        }
    },
    takeMoney: async(id,amount)=>{
        try {
            const userIfExist=await usersDb.User.findByPk(id);
            if (userIfExist) {
                if (userIfExist.balance==0) {
                    let error={
                        status: false,
                        msg: `You don't have funds in your account.`
                    }
                    return error;
                } else if(amount>userIfExist.balance){
                    let error={
                        status: false,
                        msg: "It's not possible to withdraw the money because the amount requested exceeds the current balance"
                    }
                    return error;
                }else{
                    await usersDb.User.update({
                        balance: userIfExist.balance-parseInt(amount) 
                    },{
                        where: {id: id}
                    });
    
                    await transactionsDb.Transaction.create({
                        amount: amount,
                        category: "withdraw",
                        status: "settled",
                        users_id: id
                    });
                    let completed={
                        status: true,
                        msg:"You have withdrawn "+amount+" from your account."
                    }
                    return completed;
                }                
            } else {
                let error={
                    status: false,
                    msg: "The user isn't exist in our data base."
                }
                return error;
            }
        } catch (error) {
            return error;
        }
    },
    transactions: async(id,type)=>{
        try {
            const userIfExist=await usersDb.User.findByPk(id);
            if (userIfExist) {
                if (type) {
                    const usersTransactions=await transactionsDb.Transaction.findAll({
                        where: {
                            users_id: id,
                            category: type
                        }
                    });
                    return usersTransactions;
                } else {
                    const usersTransactions=await transactionsDb.Transaction.findAll({
                        where: {users_id: id}
                    });
                    return usersTransactions;
                }                
            } else {
                return false;
            }
        } catch (error) {
            return error;
        }
    }
}

module.exports=userModel;