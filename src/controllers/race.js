module.exports.getRaces = async (req, res) => {
  try {
    if (!!req.params.id) {
      const race = await Race.findById(req.params.id);

      res.status(200).json({ payload: race });
    } else {
      const races = await Race.find({});

      res.status(200).json({ payload: races });
    }
  } catch (e) {
    res.status(400).json({ message: "Error: " + e });
  }
};