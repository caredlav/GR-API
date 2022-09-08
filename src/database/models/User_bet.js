module.exports=(sequelize, dataTypes)=>{
    const User_bet=sequelize.define('User_bet',{
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER(11)
        },
        odd:{
            type: dataTypes.DECIMAL(4,1),
            allowNull: false,        
        },
        amount:{
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        state:{
            type: dataTypes.STRING(45),
            allowNull: false
        }
    },{
            tableName: 'user_bets',
            timeStamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at'
    });

    User_bet.associate=function(models){
        User_bet.belongsTo(models.Bet,{
            as: "bets",
            foreignKey: "bets_id"
        });
    }

    User_bet.associate=function(models){
        User_bet.belongsTo(models.User,{
            as: "users",
            foreignKey: "users_id"
        });
    }

    return User_bet;
}