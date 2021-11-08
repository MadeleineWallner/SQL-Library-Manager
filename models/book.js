'use strict';
const {
  Model, Sequelize
} = require('sequelize');

module.exports = (sequelize) => {
  class Book extends Model {};
  Book.init({
    title:{
      type: Sequelize.STRING,
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
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          //Messages for if the author field is empty 
          msg: '"Author" can not be empty'
        },
        notEmpty: '"Author" can not be empty'
      }
    },
    genre: Sequelize.STRING,
    year: Sequelize.INTEGER
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};