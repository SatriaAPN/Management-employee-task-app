'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ TaskModel }) {
      // define association here

      this.hasMany(TaskModel, { foreignKey: 'employeeId', as: 'tasks' })
    }
  };
  User.init({
    uuid: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'article cant generate uuid'},
        notEmpty: { msg: 'article cant generate uuid'}
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have a name'},
        notEmpty: { msg: 'Name must not empty' }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have an email'},
        notEmpty: { msg: 'Email must not empty' },
        isEmail: { msg: 'Must be valid email'}
      }
    },
    hashed: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have a password'},
        notEmpty: { msg: 'password must not empty' }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'employee'
    },
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'UserModel',
  });
  return User;
};