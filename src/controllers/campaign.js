const Campaign = require("../models/campaign");
const utils = require("../utils/utils");
const mailer = require("nodemailer");
const acceptInvitationAccount = require("../utils/email-templates/accept-invitation");

module.exports.getCampaigns = async (req, res) => {
  try {
    const { valid, decoded, message } = utils.validateToken(req.headers.authorization);

    if (valid) {
      if (!!req.params.id) {
        const campaign = await Campaign.findById(req.params.id);

        res.status(200).json({ payload: campaign });
      } else {
        if (decoded.role === "SUPER_ADMIN") {
          const campaigns = await Campaign.find({});

          return res.status(200).json({ payload: campaigns });
        }

        const campaigns = await Campaign.find({
          $or: [{ players: { $all: [decoded.userId] } }, { dm: decoded.userId }],
        });

        res.status(200).json({ payload: campaigns });
      }
    } else {
      res.status(401).json({ message });
    }
  } catch (e) {
    res.status(400).json({ message: "Internal server error: " + e });
  }
};

module.exports.postCampaigns = async (req, res) => {
  try {
    const { valid, decoded, message } = utils.validateToken(req.headers.authorization);

    if (valid) {
      const campaign = req.body;
      campaign["createdBy"] = decoded["userId"];

      const campaignPlayers = [...campaign.players];
      campaign.players = [];
      const newCampaign = new Campaign(campaign);

      if (campaignPlayers && campaignPlayers.length > 0) {
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

        for (const player of campaignPlayers) {
          const mailOptions = {
            from: process.env.G_EMAIL,
            to: player,
            subject: `Te han invitado a ${campaign.name}`,
            html: acceptInvitationAccount
              .replace("|USERNAME|", player)
              .replace("|CAMPAIGN|", `${campaign.name}`)
              .replace("|URL|", `${process.env.CLIENT_URL}/campaign/activate/${newCampaign._id}?user=${player}`)
              .replace("|DATE|", `${new Date().getFullYear()}`),
          };

          transporter.sendMail(mailOptions, (err) => {
            console.log(err);
            if (err) return res.status(500).json({ message: "Error en la aceptacion de campaña: " + err });
          });
        }
      }

      newCampaign.save(function (err) {
        if (err) {
          return res.json(500, { message: err });
        }

        return res.status(200).json({ message: "Campaña añadida correctamente" });
      });
    } else {
      res.status(401).json({ message });
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

module.exports.putCampaigns = async (req, res) => {
  try {
    const { valid, decoded, message } = utils.validateToken(req.headers.authorization);

    if (valid) {
      Campaign.findOneAndUpdate({ _id: req.params.id, dm: decoded.userId }, req.body, { upsert: true }, (err) => {
        if (err) return res.status(403).json({ message: "La campaña no ha podido ser modificada." });

        return res.status(200).json({ message: "Campaña modificada" });
      });
    } else {
      res.status(401).json({ message });
    }
  } catch (e) {
    res.status(400).json({
      message: "La campaña no ha podido ser modificada.",
    });
  }
};
