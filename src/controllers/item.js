const Item = require("../models/item");
const utils = require("../utils/utils");

module.exports.getItems = async (req, res) => {
  try {
    if (!!req.params.id) {
      const item = await Item.findById(req.params.id);

      res.status(200).json({ payload: item });
    } else {
      const items = await Item.find({});

      res.status(200).json({ payload: items });
    }
  } catch (error) {
    res.status(400).json({ message: "Error: " + error });
  }
};

module.exports.postItems = async (req, res) => {
  try {
    const itemsIds = req.body;
    const items = await Item.find({ _id: { $in: itemsIds } });

    res.status(200).json({ payload: items });
  } catch (error) {
    res.status(400).json({ message: "Error: " + error });
  }
};

module.exports.postItem = async (req, res) => {
  try {
    const { valid, decoded, message } = utils.validateToken(req.headers.authorization);

    if (valid) {
      const item = req.body;
      item["createdBy"] = decoded["userId"];
      const newItem = new Item(item);

      newItem.save(function (err) {
        if (err) {
          return res.status(403).json({ message: "Error: " + err });
        }

        res.status(200).json({ payload: newItem._id });
      });
    } else {
      res.status(401).json({ message });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
