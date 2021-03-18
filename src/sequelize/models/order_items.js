'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  order_items.init({
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    product_price: DataTypes.DECIMAL,
    quantity: DataTypes.INTEGER,
    total: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'order_items',
    underscored: true,
  });
  return order_items;
};