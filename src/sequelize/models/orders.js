'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  orders.init({
    buyer_id: DataTypes.INTEGER,
    shop_id: DataTypes.INTEGER,
    seller_id: DataTypes.INTEGER,
    status: DataTypes.STRING,
    total: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'orders',
    underscored: true,
  });
  return orders;
};