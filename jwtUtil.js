const jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports = {
    signJwt: (userName) => {
        let payload = { name: userName };
        let privateKey = fs.readFileSync('./private.key', 'utf8');

        let signOptions = {
            expiresIn: '12h',
            algorithm:'RS256'
        };

        let token = jwt.sign(payload, privateKey, signOptions);
        return token;
    },
    verifyJwt: (token) => {
        let publicKey = fs.readFileSync('./public.key', 'utf8');

        let verifyOptions = {
            expiresIn: '12h',
            algorithm: ['RS256']
        };

        try {
            return jwt.verify(token, publicKey, verifyOptions)
        } catch(err) {
            return false;
        }
    }
}