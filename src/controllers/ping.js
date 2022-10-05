module.exports.sendPing = async (_, res) => {
  try {
    res.status(200).json("Pong!");
  } catch (e) {
    res.status(400).json({ message: "Error: " + e });
  }
};
