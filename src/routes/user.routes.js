const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const secret = process.env.SECRET_KEY;
const bcrypt = require("bcrypt");
const discordUtils = require("../utils/discord");
const utils = require("../utils/utils");

let User = require("../models/user");

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (user) {
            bcrypt.compare(password, user.password, (err) => {
                if (err) return res.status(403).json({ message: "Contraseña incorrecta" });

                const payload = {
                    userId: user._id,
                    role: user.role,
                    isActive: user.isActive,
                };

                const token = jwt.sign(payload, secret, { expiresIn: "10d" });

                res.status(200).json({ payload: { token } });
            });
        } else {
            res.status(403).json({ message: "Nombre de usuario incorrecto" });
        }
    } catch (e) {
        res.status(400).json({ message: "Error: " + e });
    }
});

router.post("/login/google", async (req, res) => {
    try {
        const { username, id } = req.body;
        const checkUser = await User.findById(id);

        if (checkUser) {
            const user = checkUser;

            const payload = {
                userId: user._id,
                role: user.role,
                isActive: user.isActive,
            };

            const token = jwt.sign(payload, secret, { expiresIn: "15d" });

            res.status(200).json({ payload: { token } });
        } else {
            const newUser = new User({
                _id: id,
                username,
                metadata,
                isActive: true,
                role: process.env.DEFAULT_ROLE,
            });

            newUser.save(function (err) {
                if (err) return res.status(500).json({ message: err });

                const payload = {
                    userId: id,
                    role: process.env.DEFAULT_ROLE,
                    isActive: user.isActive,
                };

                const token = jwt.sign(payload, secret, { expiresIn: "15d" });

                res.status(200).json({ payload: { token } });
            });
        }
    } catch (e) {
        res.status(400).json({ message: "Error: " + e });
    }
});

router.post("/register", async (req, res) => {
    try {
        const { username, password, metadata } = req.body;
        const checkUser = await User.findOne({ username });

        if (checkUser) return res.status(403).json({ message: "Usuario ya registrado" });

        bcrypt.hash(password, 10, (_, hash) => {
            const newUser = new User({
                username,
                password: hash,
                metadata,
                role: process.env.DEFAULT_ROLE,
            });

            newUser.save(function (err) {
                if (err) return res.status(500).json({ message: err });

                res.status(500).json({ message: "Error en la creación de cuenta: " + err });
            });
        });
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

router.post("/activate/:token", async (req, res) => {
    try {
        const token = req.params.token;

        jwt.verify(token, secret, function (_, data) {
            if (!data) return res.status(500).json({ message: "Token de activación inválido" });

            User.findByIdAndUpdate(data._id, { isActive: true }, function (err) {
                if (err) return res.status(403).json({ message: "No se ha podido activar la cuenta especificada" });

                res.status(200).json({ message: "La cuenta ha sido activada correctamente" });
            });
        });
    } catch (err) {
        res.status(400).json({ message: "Error: " + err });
    }
});

router.post("/recover-password/:token?", async (req, res) => {
    try {
        const token = req.params.token;

        if (token) {
            jwt.verify(token, secret, (err, data) => {
                if (err) return res.status(401).json({ message: "Token inválido." });

                if (data._id) {
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        if (err) return res.status(400).json({ message: "Error: " + err });

                        User.findByIdAndUpdate(data._id, { password: hash }, (err) => {
                            if (err)
                                return res.status(403).json({ message: "No se ha podido actualizar la contraseña" });

                            res.status(200).json({ message: "Se ha modificado la contraseña." });
                        });
                    });
                }
            });
        } else {
            const email = req.body.email;

            if (email) {
                User.findOne({ "metadata.email": email }, (err, data) => {
                    if (err) return res.status(400).json({ message: "No se ha podido activar la cuenta especificada" });

                    const token = jwt.sign(
                        {
                            _id: data._id,
                            username: data.username,
                        },
                        secret,
                        {
                            expiresIn: "24h",
                        },
                    );

                    return res.status(200).json({ url: `recover/${token}` });
                });
            }
        }
    } catch (e) {
        res.status(400).json({ message: e });
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
            res.status(401).json({
                message,
            });
        }
    } catch (e) {
        res.status(400).json({
            message: "Error: " + e,
        });
    }
});

router.post("/players", async (req, res) => {
    try {
        const { userIds, dmId } = req.body;

        const players = await User.find({ _id: { $in: userIds } });
        const payload = {
            players: players.map((player) => ({
                id: player._id,
                name: player.username,
                avatar: player.metadata.avatar,
                metadata: player.metadata,
            })),
        };

        if (dmId) {
            const dm = await User.findById(dmId);

            payload["dm"] = {
                id: dm._id,
                name: dm.username,
                avatar: dm.metadata.avatar,
                metadata: dm.metadata,
            };
        }

        res.status(200).json({
            payload,
        });
    } catch (e) {
        res.status(400).json({ message: "Error: " + e });
    }
});

router.post("/me/:id", async (req, res) => {
    try {
        const { valid, message } = utils.validateToken(req.headers.authorization);

        if (valid) {
            const { profile } = req.body;

            if (!profile) {
                res.status(400).json({ message: "No se ha enviado un perfil actualizado." });
            }

            User.findById(req.params.id, (err, user) => {
                if (!user) {
                    return res.status(404).send({
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
            res.status(401).json({
                message,
            });
        }
    } catch (e) {
        res.status(400).json({
            message: "Error: " + e,
        });
    }
});

router.get("/roles", async (req, res) => {
    try {
        const roles = await User.distinct("role");

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
                        res.status(400).json({ message: "Error: " + err });
                    } else {
                        res.json({
                            status: 200,
                            message: "Usuario " + email + " actualizado correctamente.",
                        });
                    }
                },
            );
        } else {
            res.status(401).json({ message });
        }
    } catch (e) {
        res.status(400).json({ message: "Error: " + e });
    }
});

router.get("/users", async (req, res) => {
    try {
        const type = req.query.type;
        const { valid, decoded, message } = utils.validateToken(req.headers.authorization);

        if (valid) {
            if (type === "allUsers") {
                if (decoded.role == "SUPER_ADMIN") {
                    const users = await User.find({});

                    res.status(200).json({
                        payload: users,
                    });
                } else {
                    res.status(401).json({
                        message: message,
                    });
                }
            } else {
                const user = await User.findById(decoded.userId);
                const userFriendList = user.metadata.friendList;
                const friends = await User.find({ _id: { $in: userFriendList } });

                res.status(200).json({
                    payload: friends,
                });
            }
        } else {
            res.status(401).json({
                message: message,
            });
        }
    } catch (error) {
        res.status(400).json({ message: "Error: " + error });
    }
});

router.get("/users/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id, { username: 1, _id: 0 });

        res.status(200).json({ payload: user });
    } catch (e) {
        res.status(400).json({ message: "Error: " + e });
    }
});

router.post("/passport/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err)
            res.status(500).json({
                message: err,
            });
        if (!user)
            res.status(400).json({
                message: "Nombre de usuario o contraseña incorrectos",
            });
        else {
            req.logIn(user, (err) => {
                if (err)
                    res.status(500).json({
                        message: err,
                    });
                res.status(200).json({
                    user: user,
                });
            });
        }
    })(req, res, next);
});

router.post("/passport/register", (req, res) => {
    console.log(req.body, req.headers);
});

router.get("/passport/user", (req, res) => {
    try {
        res.status(200).json({ id: req.user });
    } catch (e) {
        res.status(500).json({ message: "No hay una sesión de usuario iniciada." });
    }
});

router.get("/passport/logout", (req, res) => {
    req.session.destroy();
    req.logout();

    res.status(200).json({
        message: "Sesión finalizada correctamente.",
    });
});

module.exports = router;
