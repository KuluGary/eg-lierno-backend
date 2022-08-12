const readline = require("readline");
const fs = require("fs");
const path = require("path");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Choose the new controller, route and model name: ", async (name) => {
  const parsedName = name[0].toUpperCase() + name.substring(1);

  Promise.all([createRoute(parsedName), createController(parsedName), createModel(parsedName)]).then((values) => {
    values.forEach((value) => console.log(value));

    rl.close();
  });
});

const createRoute = (name) => {
  return new Promise((resolve, reject) => {
    const fileName = name.toLowerCase();

    fs.writeFile(
      path.join(__dirname, `../src/routes/${fileName}.routes.js`),
      `const router = require("express").Router();
const { get${name}, post${name}, put${name}, delete${name} } = require("../controllers/${fileName}.js");

router.get("/${fileName}", get${name}s);

router.get("/${fileName}/:id", get${name});

router.post("/${fileName}/:id", post${name});

router.put("/${fileName}/:id", put${name});

router.delete("/${fileName}/:id", delete${name});

module.exports = router;`,
      (err) => {
        if (err) return reject(err);

        resolve(`Route ${fileName} created successfully!`);
      }
    );
  });
};

const createController = (name) => {
  return new Promise((resolve, reject) => {
    const fileName = name.toLowerCase();

    fs.writeFile(
      path.join(__dirname, `../src/controllers/${fileName}.js`),
      `const ${name} = require("../models/${fileName}");
      
module.exports.get${name} = async (req, res) => {};

module.exports.get${name}s = async (req, res) => {};

module.exports.post${name} = async (req, res) => {};

module.exports.put${name} = async (req, res) => {};

module.exports.delete${name} = async (req, res) => {};`,
      (err) => {
        if (err) return reject(err);

        resolve(`Controller ${fileName} created successfully!`);
      }
    );
  });
};

const createModel = (name) => {
  return new Promise((resolve, reject) => {
    const fileName = name.toLowerCase();

    fs.writeFile(
      path.join(__dirname, `../src/models/${fileName}.js`),
      `const mongoose = require("mongoose");
const { Schema } = mongoose;

const ${name}Schema = new Schema({}, { timestamp: true });

const ${name} = mongoose.model("${name}", ${name}Schema);

module.exports = ${name};`,
      (err) => {
        if (err) return reject(err);

        resolve(`Model ${name} created successfully`);
      }
    );
  });
};
