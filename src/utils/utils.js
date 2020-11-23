const jwt = require('jsonwebtoken');
const secret = require('../configs/config');

const validateToken = (authorization) => {
    if (authorization) {
        const token = authorization.split(" ")[1];

        return jwt.verify(token, secret.key, function (err, data) {
            if (!data) {
                return {
                    valid: false,
                    message: "Token de autorización inválido"
                }
            }

            return {
                valid: true,
                decoded: data
            }
        });

    } else {
        return {
            valid: false,
            message: "Tienes que proveer un token de autorización"
        }
    }
}

const validateOwnership = (user, owner) => {
    return user === owner;
}

module.exports = { validateToken, validateOwnership }