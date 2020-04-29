const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = require('../configs/config');
const bcrypt = require('bcrypt');

let User = require('../models/user');

router.get('/', async (req, res) => {
    res.json({
        status: 500,
        message: "Internal server error"
    )
})

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const users = await User.find({ username });

        if (users.length === 1) {
            const user = users[0];

            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    const payload = {
                        userId: user._id,
                        roles: user.roles
                    }

                    const token = jwt.sign(payload, secret.key, {
                        expiresIn: "24h"
                    });

                    res.json({
                        status: "ok",
                        code: 200,
                        payload: {
                            token
                        }
                    })
                } else {
                    res.json({ 
                        status: 400,
                        message: "Wrong credentials"
                    })
                }
            })
        } else {
            res.json({
                status: 500,
                message: "Internal server error"
            })
        }
    } catch (e) {
        console.log(e)
    }
})

router.post('/register', async (req, res) => {
    try {
        const { username, password, metadata } = req.body;
        const checkUser = await User.find({ username });

        if (checkUser.length > 0) {
            res.json({
                status: 400,
                message: "User already registered"
            })
        } else {
            bcrypt.hash(password, 10, (err, hash) => {
                const newUser = new User({
                    username,
                    password: hash,
                    metadata,
                    roles: [
                        "USER"
                    ]
                })

                newUser.save()
                    .then(() => res.json({ status: 200, message: "User registered" }))
                    .catch(err => res.status(400).json('Error: ' + err))
            })
        }
    } catch (e) { }
})

router.get('/me', async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, secret.key);

        const user = await User.find({ _id: decoded.userId });

        res.json({
            status: 200,
            payload: user[0]
        })
    } catch (e) { }

})


module.exports = router;

