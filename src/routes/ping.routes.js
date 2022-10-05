const router = require("express").Router();
const { sendPing } = require("../controllers/ping");

router.get("/ping", sendPing);

module.exports = router;
