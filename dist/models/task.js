'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ UserModel }) {
      // define association here

      this.belongsTo(UserModel, { foreignKey: 'employeeId', as: 'employee' })
    }
  };
  Task.init({
    uuid: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'article cant generate uuid'},
        notEmpty: { msg: 'article cant generate uuid'}
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have a title'},
        notEmpty: { msg: 'title must not empty' }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have an description'},
        notEmpty: { msg: 'description must not empty' }
      }
    },
  }, {
    sequelize,
    tableName: 'tasks',
    modelName: 'TaskModel',
  });
  return Task;
};