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
        notEmpty: '"Title" is required'
      }
    }, 
    author:{
      type: Sequelize.STRING,
      allowNull: false,
      validate: { 
        notEmpty: '"Author" is required'
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