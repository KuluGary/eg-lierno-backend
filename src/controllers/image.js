const imageHelper = require("../utils/image");
const imgurUploader = require("imgur-uploader");

module.exports.postImage = async (req, res) => {
  try {
    let { original, crop } = req.files;

    original = original[0];
    crop = crop[0];

    const originalName = original.originalName || original.originalname || "";

    const token = await imageHelper.createToken(crop.buffer);
    const avatar = await imageHelper.getSmallImage(crop.buffer);

    const uploadImage = (image, title = "test", type) => {
      return new Promise((resolve, reject) => {
        imgurUploader(image, { title }, process.env.IMGUR_CLIENT_ID)
          .then(({ link }) => resolve({ type, link }))
          .catch((err) => reject(err));
      });
    };

    Promise.all([
      uploadImage(original.buffer, originalName, "original"),
      uploadImage(token, originalName, "token"),
      uploadImage(avatar, originalName, "avatar"),
    ])
      .then((images) => {
        res.status(200).json({ images });
      })
      .catch((err) => {
        res.status(500).json({ error: "Err: " + err });
      });
  } catch (e) {
    res.status(500).json({ message: "Error " + e });
  }
};