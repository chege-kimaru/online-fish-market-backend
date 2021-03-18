'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('shops', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      latitude: {
        type: Sequelize.DECIMAL(20, 2),
      },
      longitude: {
        type: Sequelize.DECIMAL(20, 2),
      },
      location: {
        type: Sequelize.STRING,
      },
      county: {
        type: Sequelize.STRING,
      },
      image_id: {
        type: Sequelize.STRING,
      },
      image_url: {
        type: Sequelize.TEXT,
      },
      seller_id: {
        type: Sequelize.INTEGER,
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('shops');
  },
};
