module.exports = (app, sql) => {
    app.get('/dashboard/overview', (req, res) => {
        sql.getDashboardArticles(result => {
            res.send(result);
        });
    });
}