module.exports = (app, sql) => {
    app.get('/dashboard/overview', (req, res) => {
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
}