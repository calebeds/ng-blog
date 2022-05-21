const ARTICLES = require('./mock-article');

module.exports = function(app) {
    app.get('/articles', function(request, response) {
        response.send(ARTICLES);
    });
}