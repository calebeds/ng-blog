const isAuthenticated = require('./isAuthenticated');

module.exports = (app, sql) => {
    app.get('/dashboard/overview', isAuthenticated, (req, res) => {
        sql.getDashboardArticles(result => {
            res.send(result);
        });
    });

    app.put('/dashboard/article/publish', isAuthenticated, (req, res) => {
        const id = req.body.id;
        const published = req.body.published;
        sql.updateArticlePublishState({
            id, published
        }, article => {
            res.send(article);
        })
    });

    app.get('/dashboard/article/:key', isAuthenticated, (req, res) => {
        sql.getDashboardArticleByKey(req.params.key, article => {
            res.send(article);
        });
    });

    app.put('/dashboard/article', isAuthenticated, (req, res) => {
        sql.updateArticle(req.body, (result) => {
            res.send(result);
        });
    });

    app.delete('/dashboard/article/:id', isAuthenticated, (req, res) => {
        sql.deleteArticle(req.params.id, result => {
            if(result != null) {
                res.send(result);
            } else {
                res.status(400).send({ message: 'Article could not be deleted!' });
            }
        });
    });

    app.post('/dashboard/article', isAuthenticated, (req,res) => {
        sql.createArticle(req.body, (result) => {
            res.send(result);
        });
    });
}