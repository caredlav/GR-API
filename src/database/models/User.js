module.exports=(sequelize, dataTypes)=>{
    const User=sequelize.define('User',{
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER(11)
        },
        role: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        first_name:{
            type: dataTypes.STRING(45),
            allowNull: false
        },
        last_name:{
            type: dataTypes.STRING(45),
            allowNull: false
        },
        phone:{
            type: dataTypes.STRING(45),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        username: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        address:{
            type: dataTypes.STRING(45),
            allowNull: false
        },
        gender: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        birth_date:{
            type: dataTypes.DATE,
            allowNull: false
        },
        country:{
            type: dataTypes.STRING(45),
            allowNull: false
        },
        city:{
            type: dataTypes.STRING(45),
            allowNull: false
        },
        category:{
            type: dataTypes.STRING(45),
            allowNull: false
        },
        user_state:{
            type: dataTypes.STRING(10),
            allowNull: false
        },
        balance: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        }
    },{
            tableName: 'users',
            timeStamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at'
    });

    User.associate=function(models){
        User.hasMany(models.Transaction,{
            as: "transactions",
            foreignKey: "users_id"
        });
    }

    User.associate=function(models){
        User.hasMany(models.User_bet,{
            as: "user_bets",
            foreignKey: "users_id"
        });
    }

    return User;
}