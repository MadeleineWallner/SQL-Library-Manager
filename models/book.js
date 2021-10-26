'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Book.init({
    title:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        //Messages for if the title field is empty 
        notNull: {
          msg: '"Title" can not be empty'
        },
        notEmpty: '"Title" can not be empty'
      }
    }, 
    author:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          //Messages for if the author field is empty 
          msg: '"Author" can not be empty'
        },
        notEmpty: '"Author" can not be empty'
      }
    },
    genre: DataTypes.STRING,
    year: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};