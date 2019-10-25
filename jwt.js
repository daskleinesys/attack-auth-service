const fs = require('fs');
const jwt = require('jsonwebtoken');

// PAYLOAD
const payload = {};

// PRIVATE and PUBLIC key
const privateKEY = fs.readFileSync('./private.key', 'utf8');
const publicKEY = fs.readFileSync('./public.key', 'utf8');
const issuer = 'Attack Auth Service';
const subject = 'daskleinesys';
const audience = 'http://localhost:8080';

// SIGNING OPTIONS
const signOptions = {
    issuer,
    subject,
    audience,
    expiresIn: '12h',
    algorithm: 'RS256',
};

const token = jwt.sign(payload, privateKEY, signOptions);

const verifyOptions = {
    algorithm: ['RS256'],
};
const legit = jwt.verify(token, publicKEY, verifyOptions);

module.exports = function () {
    return token;
};
