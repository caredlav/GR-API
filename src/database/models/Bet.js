module.exports=(sequelize, dataTypes)=>{
    const Bet=sequelize.define('Bet',{
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER(11)
        },
        bet_option: {
            type: dataTypes.INTEGER(11),
            allowNull: false 
        },
        sport:{
            type: dataTypes.STRING(45),
            allowNull: false
        },
        status:{
            type: dataTypes.STRING(45),
            allowNull: false
        },
        name:{
            type: dataTypes.STRING(45),
            allowNull: false
        },
        odd:{
            type: dataTypes.DECIMAL(4,1),
            allowNull: false
        },
        result: {
            type: dataTypes.STRING(45),
            allowNull: false
        }        
    },{
            tableName: 'bets',
            timeStamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at'
    });

    Bet.associate=function(models){
        Bet.hasMany(models.User_bet,{
         as:"user_bets",
         foreignKey: "bets_id"
        });
    }

    return Bet;
}