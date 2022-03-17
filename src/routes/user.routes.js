const router = require("express").Router();

const {
  signIn,
  signUp,
  postUserData,
  recoverPassword,
  getUserData,
  activateUser,
  getPlayers,
} = require("../controllers/user");

router.post("/signin", signIn);

router.post("/signup", signUp);

router.get("/user/:id?", getUserData);

router.post("/user/:id", postUserData);

router.post("/activate/:token", activateUser);

router.post("/recover-password/:token?", recoverPassword);

router.post("/players", getPlayers);

module.exports = router;
