const User = require("../models/user");
const bcrypt = require("bcrypt");
// const mailer = require("@sendgrid/mail");
const mailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const discordUtils = require("../utils/discord");
const utils = require("../utils/utils");
const secret = process.env.SECRET_KEY;
const activateAccountTemplate = require("../utils/email-templates/activate-account");

module.exports.signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (!result || err) return res.status(403).json({ message: "Contraseña incorrecta" });

        res
          .status(200)
          .json({ name: user.username, image: user.metadata.avatar, email: user.metadata.email, id: user._id });
      });
    } else {
      res.status(403).json({ message: "Nombre de usuario incorrecto" });
    }
  } catch (e) {
    res.status(400).json({ message: "Error: " + e });
  }
};

module.exports.signUp = async (req, res) => {
  try {
    const { username, password, metadata } = req.body;
    const checkUser = await /*User.findOne({ username });*/ User.findOne({
      $or: [{ username }, { "metadata.email": metadata.email }],
    });

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

        const token = jwt.sign(
          {
            _id: newUser._id,
            username: username,
            password: hash,
          },
          secret,
          {
            expiresIn: "24h",
          }
        );

        const transporter = mailer.createTransport({
          service: "gmail",
          auth: {
            type: "OAuth2",
            user: process.env.G_EMAIL,
            pass: process.env.G_PASS,
            clientId: process.env.G_OAUTH_CLIENT_ID,
            clientSecret: process.env.G_OAUTH_SECRET,
            refreshToken: process.env.G_OAUTH_REFRESH_TOKEN,
          },
        });

        const mailOptions = {
          from: process.env.G_EMAIL,
          to: metadata.email,
          subject: "Activación de cuenta en Lierno App ✔",
          html: activateAccountTemplate
            .replace("|USERNAME|", username)
            .replace("|URL|", `${process.env.SERVER_URL}/api/v1/auth/activate/${token}`)
            .replace("|DATE|", `${new Date().getFullYear()}`),
        };

        transporter.sendMail(mailOptions, (err) => {
          if (err) return res.status(500).json({ message: "Error en la creación de cuenta: " + err });

          return res
            .status(200)
            .json({ message: "Cuenta registrada. Se ha enviado un mail de activación a " + metadata.email });
        });
      });
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

module.exports.getUserData = async (req, res) => {
  try {
    if (!!req.params?.id) {
      const user = await User.findById(req.params.id, { username: 1, _id: 0 });

      res.status(200).json({ payload: user });
    } else {
      const { valid, decoded, message } = utils.validateToken(req.headers.authorization);
      if (valid) {
        const user = await User.findById(decoded.userId);

        res.status(200).json({ payload: user });
      } else {
        res.status(401).json({ message });
      }
    }
  } catch (e) {
    res.status(400).json({
      message: "Error: " + e,
    });
  }
};

module.exports.postUserData = async (req, res) => {
  try {
    const { valid, message } = utils.validateToken(req.headers.authorization);

    if (valid) {
      const { profile } = req.body;

      if (!profile) {
        res.status(400).json({ message: "No se ha enviado un perfil actualizado." });
      }

      User.findById(req.params.id, (_, user) => {
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
};

module.exports.activateUser = async (req, res) => {
  try {
    const token = req.params.token;

    jwt.verify(token, secret, function (_, data) {
      if (!data) return res.status(500).json({ message: "Token de activación inválido" });

      User.findByIdAndUpdate(data._id, { isActive: true }, function (err, data) {
        if (err) return res.status(403).json({ message: "No se ha podido activar la cuenta especificada" });

        res.redirect(process.env.CLIENT_URL + "/login");
      });
    });
  } catch (err) {
    res.status(400).json({ message: "Error: " + err });
  }
};

module.exports.recoverPassword = async (req, res) => {
  try {
    const token = req.params.token;

    if (token) {
      jwt.verify(token, secret, (err) => {
        if (err) return res.status(401).json({ message: "Token inválido." });

        if (data._id) {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) return res.status(400).json({ message: "Error: " + err });

            User.findByIdAndUpdate(data._id, { password: hash }, (err) => {
              if (err) return res.status(403).json({ message: "No se ha podido actualizar la contraseña" });

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

          mailer.setApiKey(process.env.SENDGRID_KEY);

          const token = jwt.sign(
            {
              _id: data._id,
              username: data.username,
            },
            secret,
            {
              expiresIn: "24h",
            }
          );

          const emailToSend = {
            to: email,
            from: process.env.SENDGRID_EMAIL,
            subject: "Recuperación de contraseña ✔",
            html: recoverPasswordTemplate
              .replace("|USERNAME|", data.username)
              .replace("|URL|", `${process.env.CLIENT_URL}recover/${token}`)
              .replace("|DATE|", `${new Date().getFullYear()}`),
          };

          mailer
            .send(emailToSend)
            .then(() => res.status(200).json({ message: "Se te ha enviado un mensaje de recuperación a " + email }))
            .catch((err) => res.status(400).json({ message: "Error: " + err }));
        });
      }
    }
  } catch (e) {
    res.status(400).json({ message: e });
  }
};

module.exports.getPlayers = async (req, res) => {
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
};
