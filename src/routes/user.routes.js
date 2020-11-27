const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_KEY;
const bcrypt = require("bcrypt");
const discordUtils = require("../utils/discord");
const utils = require('../utils/utils')

let User = require("../models/user");

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    const payload = {
                        userId: user._id,
                        roles: user.roles,
                    };

                    const token = jwt.sign(payload, secret, {
                        expiresIn: "24h",
                    });

                    res.status(200).json({
                        status: "ok",
                        payload: {
                            token,
                        },
                    });
                } else {
                    res.status(500).json({
                        message: "Contraseña incorrecta",
                    });
                }
            });
        } else {
            res.status(500).json({
                message: "Nombre de usuario incorrecto",
            });
        }
    } catch (e) {
        console.log(e);
    }
});

router.post("/register", async (req, res) => {
    try {
        const { username, password, metadata } = req.body;
        const checkUser = await User.findOne({ username });

        if (checkUser) {
            res.status(400).json({
                message: "Usuario ya registrado",
            });
        } else {
            bcrypt.hash(password, 10, (err, hash) => {
                const newUser = new User({
                    username,
                    password: hash,
                    metadata,
                    roles: [
                        "CHARACTER_ACCESS",
                        "NPC_ACCESS",
                        "INITIATIVE_ACCESS",
                        "ALIGNMENT_ACCESS",
                        "BESTIARY_ACCESS",
                    ],
                });

                newUser.save(function (err) {
                    if (err) {
                        return res.status(500).json({ message: err });
                    }

                    res.status(200).json({ message: "Usuario creado correctamente" });
                });
            });
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

router.get("/me", async (req, res) => {
    try {
        const { valid, decoded, message } = utils.validateToken(req.headers.authorization);

        if (valid) {
            const user = await User.findById(decoded.userId);

            res.status(200).json({
                payload: user,
            });
        } else {
            res.status(500).json({
                message
            })
        }
    } catch (e) {
        res.status(500).json({
            message: "Error: " + e,
        });
    }
});

router.post("/players", async (req, res) => {
    try {
        const { valid } = utils.validateToken(req.headers.authorization);

        if (valid) {
            const { userIds, dmId } = req.body;

            const players = await User.find({ _id: { $in: userIds } });
            const dm = await User.findById(dmId);

            const payload = {
                dm: {
                    id: dm._id,
                    name: dm.username,
                    avatar: dm.metadata.avatar,
                    metadata: dm.metadata,
                },
                players: players.map((player) => ({
                    id: player._id,
                    name: player.username,
                    avatar: player.metadata.avatar,
                    metadata: player.metadata,
                })),
            };

            res.status(200).json({
                payload,
            });
        }
    } catch (e) {
        res.status(500).json({ message: "Error: " + e });
    }
});

router.post("/me/:id", async (req, res) => {
    try {
        const { valid, message } = utils.validateToken(req.headers.authorization);

        if (valid) {
            const { profile } = req.body;

            if (!profile) {
                res
                    .status(500)
                    .json({ message: "No se ha enviado un perfil actualizado." });
            }

            User.findById(req.params.id, (err, user) => {
                if (!user) {
                    return res.status(500).send({
                        message: "No hay usuario con el ID seleccionado.",
                    });
                }

                if (profile.discordName) {
                    if (user.metadata.discordName !== profile.discordName) {
                        profile["discordId"] = discordUtils.get_userid(profile.discordName);
                    }
                }

                user.metadata = profile;

                user.save();
                res.json(200).send({ message: "Usuario actualizado." });
            });
        } else {
            res.status(500).json({
                message
            })
        }
    } catch (e) { }
});

router.get("/roles", async (req, res) => {
    try {
        const roles = await User.distinct("roles");

        res.status(200).json({
            payload: roles.filter((role) => role !== "SUPER_ADMIN"),
        });
    } catch (e) {
        res.status(500).json({
            message: "No se han podido entregar los roles",
        });
    }
});

router.post("/reset", async (req, res) => {
    try {
        const { valid, message } = utils.validateToken(req.headers.authorization);

        if (valid) {
            const { email, password } = req.body;
            const hashPwd = await bcrypt.hash(password, 10);

            User.findOneAndUpdate(
                { "metadata.email": email },
                { $set: { password: hashPwd } },
                { new: true },
                (err, user) => {
                    if (err) {
                        res.status(500).json({ message: "Error: " + err });
                    } else {
                        res.json({
                            status: 200,
                            message: "Usuario " + email + " actualizado correctamente.",
                        });
                    }
                }
            );
        } else {
            res.status(500).json({ message })
        }
    } catch (e) {
        res.status(500).json({ message: "Error: " + e });
    }
});

router.get("/users", async (req, res) => {
    try {
        const type = req.query.type;
        const { valid, decoded, message } = utils.validateToken(req.headers.authorization);

        if (valid) {
            if (type === 'allUsers') {
                if (decoded.roles.includes("SUPER_ADMIN")) {
                    const users = await User.find({});

                    res.status(200).json({
                        payload: users
                    })
                } else {
                    res.status(500).json({
                        message: message
                    })
                }
            } else {
                const user = await User.findById(decoded.userId);
                const userFriendList = user.metadata.friendList;
                const friends = await User.find({ "_id": { $in: userFriendList } })

                res.status(200).json({
                    payload: friends
                })

            }
        } else {
            res.status(500).json({
                message: message
            })
        }
    } catch (error) {
        res.status(500).json({ message: "Error: " + error });
    }
});

module.exports = router;