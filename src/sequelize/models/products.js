'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  products.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    shop_id: DataTypes.INTEGER,
    image_url: DataTypes.TEXT,
    image_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'products',
    underscored: true,
  });
  return products;
};