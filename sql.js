const Sequelize = require('sequelize');

const sequelize = new Sequelize('ngBlogDb', 'root', 'root', {
    host: 'localhost',
    dialect: 'mariadb',
    port: 3306,
    dialectOptions: {
        timezone: process.env.db_timezone
    }
});//Connection with the database

init = function() {
    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        }).catch( err => {
            console.error('Unable to connect to the database.', err);
        });
}; 

module.exports.init = init;
