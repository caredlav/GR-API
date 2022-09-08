module.exports=(sequelize, dataTypes)=>{
    const Transaction=sequelize.define('Transaction',{
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER(11)
        },
        amount: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        category: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        status: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
    },{
            tableName: 'transactions',
            timeStamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at'
    });

    Transaction.associate=function(models){
        Transaction.belongsTo(models.User,{
            as: "users",
            foreignKey: "users_id"
        });
    }
    
    return Transaction;
}