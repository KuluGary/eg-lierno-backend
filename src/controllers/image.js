const imageHelper = require("../utils/image");
const imgurUploader = require("imgur-uploader");
const supabase = require("../utils/supabase");
const { randomUUID } = require("crypto");

module.exports.postImage = async (req, res) => {
  try {
    let { original, crop } = req.files;

    original = original[0];
    crop = crop[0];

    const token = await imageHelper.createToken(crop.buffer);
    const avatar = await imageHelper.getSmallImage(crop.buffer);

    const uploadImage = (image, type) => {
      return new Promise(async (resolve, reject) => {
        const route = `/avatars/${type}s/${randomUUID()}.png`;

        let { error: uploadError } = await supabase.storage.from("creatures").upload(route, image);

        if (uploadError) return reject(uploadError);

        let { publicURL, error: getUrlError } = supabase.storage.from("creatures").getPublicUrl(route);

        if (getUrlError) return reject(getUrlError);

        return resolve({ type, link: publicURL });
      });
    };

    Promise.all([uploadImage(original.buffer, "original"), uploadImage(token, "token"), uploadImage(avatar, "avatar")])
      .then((images) => {
        res.status(200).json({ images });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  } catch (e) {
    res.status(500).json({ message: "Error " + e });
  }
};
