module.exports = function(app, sql) {
    app.get('/articles', function(request, response) {
        sql.getArticles(function(articles) {//Callback function that will be sent
            response.send(articles);
        });
    });

    app.get('/articles/:key', function(request, response) {
        sql.getArticleByKey({key: request.params.key}, article => {
            response.send(article);
        });
    });
}