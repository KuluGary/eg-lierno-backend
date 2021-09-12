const sharp = require("sharp");
const axios = require("axios");
const mask = process.env.SHARP_MASK_URL;
const template = process.env.SHARP_TEMPLATE_URL;
const token_size = process.env.TOKEN_SIZE || 260;

module.exports = {
  createToken: async (buffer) => {
    try {
      const maskFile = (await axios({ url: mask, responseType: "arraybuffer" })).data;
      const templateFile = (await axios({ url: template, responseType: "arraybuffer" })).data;

      return new Promise((resolve, reject) => {
        axios({ url: mask });
        sharp(buffer)
          .resize({ width: token_size })
          .composite([
            {
              input: maskFile,
              blend: "dest-in",
            },
            {
              input: templateFile,
            },
          ])
          .png()
          .toBuffer()
          .then((data) => resolve(data))
          .catch((err) => reject(err));
      });
    } catch (e) {
      console.error(e);
    }
  },
  getSmallImage: (buffer) => {
    try {
      return new Promise((resolve, reject) => {
        sharp(buffer)
          .resize({ width: token_size })
          .png()
          .toBuffer()
          .then((data) => resolve(data))
          .catch((err) => reject(err));
      });
    } catch (e) {
      console.error(e);
    }
  },
};