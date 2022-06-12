const jwtUtil = require('./jwtUtil');

module.exports = (app, sql) => {
    app.get('/dashboard/overview', (req, res) => {
        const token = req.get('Authorization');
        const verified = jwtUtil.verifyJwt(token);
        if(!verified) {
            res.sendStatus(401);
        }

        sql.getDashboardArticles(result => {
            res.send(result);
        });
    });

    app.put('/dashboard/article/publish', (req, res) => {
        const id = req.body.id;
        const published = req.body.published;
        sql.updateArticlePublishState({
            id, published
        }, article => {
            res.send(article);
        })
    });

    app.get('/dashboard/article/:key', (req, res) => {
        sql.getDashboardArticleByKey(req.params.key, article => {
            res.send(article);
        });
    });

    app.put('/dashboard/article', (req, res) => {
        sql.updateArticle(req.body, (result) => {
            res.send(result);
        });
    });

    app.delete('/dashboard/article/:id', (req, res) => {
        sql.deleteArticle(req.params.id, result => {
            if(result != null) {
                res.send(result);
            } else {
                res.status(400).send({ message: 'Article could not be deleted!' });
            }
        });
    });

    app.post('/dashboard/article', (req,res) => {
        sql.createArticle(req.body, (result) => {
            res.send(result);
        });
    });
}