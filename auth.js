const jwtUtil = require('./jwtUtil');
const crypto = require('crypto');

module.exports = (app, sql) => {
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
            if(!result) {
                res.sendStatus(401);
            } else {
                let token = jwtUtil.signJwt(name);
                res.send(token);
            }
        })
    });
}