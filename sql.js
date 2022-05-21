const Sequelize = require('sequelize');

const sequelize = new Sequelize('ngBlogDb', 'root', 'root', {
    host: 'localhost',
    dialect: 'mariadb',
    port: 3306,
    dialectOptions: {
        timezone: process.env.db_timezone
    }
});//Connection with the database

const Article = sequelize.define('article', {
    title: { type: Sequelize.STRING },
    key: { type: Sequelize.STRING },
    date: { type: Sequelize.DATE },
    content: { type: Sequelize.TEXT },
    description: { type: Sequelize.TEXT },
    imageUrl: { type: Sequelize.STRING }
});

init = function() {
    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        }).catch( err => {
            console.error('Unable to connect to the database.', err);
        });

    Article.sync();
}; 

module.exports.init = init;
