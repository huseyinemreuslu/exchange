const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

class Transaction extends Model {}

Transaction.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  shareId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'shares',
      key: 'id',
    },
  },
  type: {
    type: DataTypes.ENUM('BUY', 'SELL'),
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Transaction',
  tableName: 'transactions',
  schema: 'public',
});

module.exports = Transaction;
