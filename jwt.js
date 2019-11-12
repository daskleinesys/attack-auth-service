const fs = require('fs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');

// PAYLOAD
const payload = {};

// PRIVATE and PUBLIC key
const privateKEY = fs.readFileSync('./private.key', 'utf8');
const issuer = 'Attack Auth Service';
const subject = '';
const audience = 'http://localhost:8080';

// SIGNING OPTIONS
const signOptions = {
    issuer,
    subject,
    audience,
    expiresIn: '12h',
    algorithm: 'RS256',
};

const verifyOptions = {
    algorithm: ['RS256'],
};

function signUser(subject) {
    return jwt.sign(payload, privateKEY, {
        ...signOptions,
        subject,
    });
}

module.exports = function (user, password) {
    return new Promise((resolve, reject) => {
        // create the connection to database
        const db = mysql.createConnection({
            host: 'attack-database',
            user: 'attack',
            password: 'attack',
            database: 'attack',
        });

        db.query(
            `SELECT login FROM user WHERE login = '${user}' AND password = SHA('${password}')`,
            function (err, results) {
                if (Array.isArray(results) && results.length === 1) {
                    resolve(signUser(results[0].login));
                } else {
                    reject();
                }
                db.close();
            }
        );
    });
};
