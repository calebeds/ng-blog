module.exports = (app, sql) => {
    const crypto = require('crypto');

    app.post('/user/register', (req, res) => {
        req.body.salt = crypto.randomBytes(16).toString('hex');//The salt will be randonly generated and stored on the database to future requests
        let passwordHash = crypto
            .pbkdf2Sync(req.body.password, req.body.salt, 1000, 64, 'sha512')
            .toString('hex');

        req.body.password = passwordHash;

        sql.addUser(req.body, (result) => {
            res.send(result);
        });
    });

    app.post('/user/login', (req, res) => {
        const name = req.body.name;
        const password = req.body.password;

        sql.login({ name, password }, result => {
            res.send(result);
        })
    });
}