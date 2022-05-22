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
    imageUrl: { type: Sequelize.STRING },
    viewCount: { type: Sequelize.INTEGER }
});

const init = function() {
    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        }).catch( err => {
            console.error('Unable to connect to the database.', err);
        });

    Article.sync({force: true}).then(() => {//THe force:true drops and creates the table again
        Article.create({
            title: 'My first article',
            content: '<p>TLorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquet placerat purus, in ullamcorper ipsum facilisis in. Suspendisse potenti. Nam tristique aliquet lectus ut venenatis. Quisque luctus ornare est, sit amet tempus ligula blandit a. In tempor laoreet ipsum, et fermentum ligula lobortis quis. Duis elit nibh, dapibus vel rutrum eu, aliquam lobortis nunc. Aliquam sagittis id dui eu fringilla. Nulla in turpis eget nunc elementum fermentum. Nam in justo sapien. Mauris imperdiet ultricies ex in molestie. Fusce nibh leo, posuere non est pretium, hendrerit cursus metus. Phasellus convallis tortor enim, a luctus arcu malesuada et. Etiam nisl quam, commodo et ex ac, imperdiet pharetra neque. Suspendisse ut luctus ante. Donec sit amet diam fringilla, elementum ex sed, ultrices enim. Nullam eget diam ut ipsum volutpat eleifend in id nibh.</p><p>Praesent tempus, odio vel tempus iaculis, purus mi facilisis ipsum, sed finibus metus nisl malesuada quam. Curabitur accumsan felis pulvinar mauris scelerisque maximus. Cras nec eleifend metus. Proin ac lorem nec arcu efficitur aliquet. Nulla eget ultrices quam, eget lacinia quam. Phasellus accumsan est non fringilla porta. Integer magna elit, semper sit amet elit vitae, semper posuere nulla.</p><p>Cras sed augue metus. Mauris tellus est, malesuada id felis vel, tincidunt rutrum libero. Nulla in eros nisl. Sed condimentum facilisis velit sed semper. Proin mollis mi at iaculis dignissim. Aenean non velit tristique sem bibendum tempus. Sed enim eros, tincidunt aliquam pharetra ut, sodales sit amet nibh. Nullam eu mi pharetra, dictum libero id, molestie ante. Fusce tempor neque eu lectus viverra efficitur.</p>',
            description: 'This is my first article! It\'s great. Please read it. :)',
            key: 'my-first-article',
            date: new Date(),
            imageUrl: 'http://angular.io/assets/images/logos/angular/angular.png'
        });
        Article.create({
            title: 'The second article',
            content: '<p>TLorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquet placerat purus, in ullamcorper ipsum facilisis in. Suspendisse potenti. Nam tristique aliquet lectus ut venenatis. Quisque luctus ornare est, sit amet tempus ligula blandit a. In tempor laoreet ipsum, et fermentum ligula lobortis quis. Duis elit nibh, dapibus vel rutrum eu, aliquam lobortis nunc. Aliquam sagittis id dui eu fringilla. Nulla in turpis eget nunc elementum fermentum. Nam in justo sapien. Mauris imperdiet ultricies ex in molestie. Fusce nibh leo, posuere non est pretium, hendrerit cursus metus. Phasellus convallis tortor enim, a luctus arcu malesuada et. Etiam nisl quam, commodo et ex ac, imperdiet pharetra neque. Suspendisse ut luctus ante. Donec sit amet diam fringilla, elementum ex sed, ultrices enim. Nullam eget diam ut ipsum volutpat eleifend in id nibh.</p><p>Praesent tempus, odio vel tempus iaculis, purus mi facilisis ipsum, sed finibus metus nisl malesuada quam. Curabitur accumsan felis pulvinar mauris scelerisque maximus. Cras nec eleifend metus. Proin ac lorem nec arcu efficitur aliquet. Nulla eget ultrices quam, eget lacinia quam. Phasellus accumsan est non fringilla porta. Integer magna elit, semper sit amet elit vitae, semper posuere nulla.</p><p>Cras sed augue metus. Mauris tellus est, malesuada id felis vel, tincidunt rutrum libero. Nulla in eros nisl. Sed condimentum facilisis velit sed semper. Proin mollis mi at iaculis dignissim. Aenean non velit tristique sem bibendum tempus. Sed enim eros, tincidunt aliquam pharetra ut, sodales sit amet nibh. Nullam eu mi pharetra, dictum libero id, molestie ante. Fusce tempor neque eu lectus viverra efficitur.</p>',
            description: 'A Marvelous article',
            key: 'the-second-article',
            date: new Date(),
            imageUrl: 'http://angular.io/assets/images/logos/angular/angular_solidBlack.png'
        });
    });
}; 

const getArticles = function(callback) {
    Article.findAll({order: sequelize.literal('date DESC')}).then(articles => {callback(articles)});
}

const getArticleByKey = (options ,callback) => {
    Article.findOne({where: {key: options.key}}).then(
        article => {
            if(article != null) {
                article.update({
                    viewCount: ++article.viewCount
                });
            }
            callback(article)
        } 
    )
}

module.exports.init = init;
module.exports.getArticles = getArticles;
module.exports.getArticleByKey = getArticleByKey;
