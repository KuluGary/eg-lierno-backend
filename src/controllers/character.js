const Character = require("../models/character");
const User = require("../models/user");
const Item = require("../models/item");
const Spell = require("../models/spell");

const PDFDocument = require("pdf-lib").PDFDocument;
const utils = require("../utils/utils");
const axios = require("axios");
const fs = require("fs");
const { convert: convertHtmlToString } = require("html-to-text");

module.exports.getCharacters = async (req, res) => {
  try {
    if (!!req.params.id) {
      const character = await Character.findById(req.params.id);

      res.status(200).json({ payload: character });
    } else {
      const { valid, decoded, message } = utils.validateToken(req.headers.authorization);

      if (valid) {
        let characters, total;
        const { skip, limit, qs } = req.query;

        if (decoded.role === "SUPER_ADMIN") {
          characters = await Character.find({});
        } else {
          const parsedQs = new RegExp(qs, "i");
          total = await Character.find({ name: parsedQs, createdBy: decoded.userId }).count();

          characters = await Character.find(
            { name: parsedQs, createdBy: decoded.userId },
            {
              name: 1,
              "flavor.portrait.avatar": 1,
              "flavor.traits.pronoun": 1,
              "stats.classes": 1,
              "stats.race": 1,
              createdBy: 1,
            }
          )
            .limit(parseInt(limit) ?? 0)
            .skip(parseInt(skip) ?? 0);
        }

        res.status(200).json({ payload: { data: characters, total } });
      } else {
        res.status(401).json({ message });
      }
    }
  } catch (error) {
    res.status(403).json({ message: "Error: " + error });
  }
};

module.exports.getDmCharacters = async (req, res) => {
  try {
    const { valid, decoded, message } = utils.validateToken(req.headers.authorization);

    if (valid) {
      let campaignsDm = await Campaign.find({ dm: decoded.userId });
      let campaignCharacters = [];
      campaignsDm.forEach((campaign) => campaignCharacters.push(...campaign.toJSON()["characters"]));

      let characters = await Character.find({
        $and: [{ _id: { $in: campaignCharacters } }, { createdBy: { $ne: decoded.userId } }],
      });

      res.status(200).json({ payload: characters });
    } else {
      res.status(401).json({ message });
    }
  } catch (error) {
    res.status(403).json({ message: "Error: " + error });
  }
};

module.exports.putCharacters = async (req, res) => {
  try {
    const { valid, message } = utils.validateToken(req.headers.authorization);

    if (valid) {
      await Character.findByIdAndUpdate(req.params.id, req.body, function (err) {
        if (err) {
          return res.status(403).json({ message: "El personaje no ha podido ser modificado." });
        }
        req.app.io.emit("updatedCharacter", { id: req.params.id });
        return res.status(200).json({ message: "Personaje modificado" });
      });
    } else {
      res.status(401).json({ message });
    }
  } catch (error) {
    res.status(400).json({ message: "Error: " + error });
  }
};

module.exports.deleteCharacters = async (req, res) => {
  try {
    const { valid, decoded, message } = utils.validateToken(req.headers.authorization);

    if (valid) {
      const character = await Character.findById(req.params.id);

      if (utils.validateOwnership(decoded.userId, character.createdBy)) {
        await Character.findByIdAndDelete(req.params.id, function (err) {
          if (err) return res.status(500).json({ message: "Error: " + err });

          res.status(200).json({ message: "El personaje ha sido eliminado" });
        });
      } else {
        res.status(401).json({ message: "Este personaje no es de tu propiedad." });
      }
    } else {
      res.status(401).json({ message });
    }
  } catch (error) {
    res.status(400).json({ message: "Error: " + error });
  }
};

module.exports.postCharacters = async (req, res) => {
  try {
    const { valid, decoded, message } = utils.validateToken(req.headers.authorization);

    if (valid) {
      const character = req.body;
      character["createdBy"] = decoded["userId"];
      const newCharacter = new Character(character);

      newCharacter.save(function (err) {
        if (err) return res.status(403).json({ message: "Error: " + err });

        res.status(200).json({ payload: newCharacter._id });
      });
    } else {
      res.status(401).json({ message });
    }
  } catch (error) {
    res.status(400).json({ message: "Error: " + error });
  }
};

module.exports.getCharacterInfo = async (req, res) => {
  try {
    const { characterIds } = req.body;

    const characters = await Character.find({ _id: { $in: characterIds } });

    const payload = { characters };

    res.status(200).json({ payload });
  } catch (e) {
    res.status(400).json({ message: "Error: " + e });
  }
};

module.exports.postUserCharacters = async (req, res) => {
  try {
    const { valid, message } = utils.validateToken(req.headers.authorization);

    if (valid) {
      const { userIds } = req.body;

      const characters = await Character.aggregate([
        { $match: { createdBy: { $in: userIds } } },
        { $unwind: "$flavor.traits.name" },
        { $project: { name: "$flavor.traits.name", _id: 1 } },
      ]);

      res.status(200).json({ payload: characters });
    } else {
      res.status(401).json({ message });
    }
  } catch (error) {
    res.status(400).json({ message: "Error: " + error });
  }
};

module.exports.getUserCharacters = async (req, res) => {
  try {
    const { valid, message } = utils.validateToken(req.headers.authorization);

    if (valid) {
      const userId = req.params.id;

      const character = await Character.find({ createdBy: userId }, { name: 1, createdBy: 1 });

      res.status(200).json({ payload: character });
    } else {
      res.status(401).json({ message });
    }
  } catch (error) {
    res.status(400).json({ message: "Error: " + error });
  }
};

module.exports.getCharacterSheet = async (req, res) => {
  try {
    const { valid, decoded, message } = utils.validateToken(req.headers.authorization);

    if (valid) {
      const characterId = req.params.id;

      const character = await Character.findOne({
        _id: characterId,
        createdBy: decoded.userId,
      });

      if (!!character) {
        const formPdfBytes = await fs.promises.readFile("./src/assets/pdf/character-sheet.pdf");
        const pdfDoc = await PDFDocument.load(formPdfBytes);

        const form = pdfDoc.getForm();

        form.getTextField("Text10.0").setText(character["name"]);
        form.getTextField("Text10.1.0").setText(character["name"]);
        form.getTextField("Text2.0.1").setText(character.flavor.background.name || "");
        form.getTextField("Text2.1.0").setText(character.stats.race.name);
        form.getTextField("Text2.1.1").setText(character.flavor.alignment);

        const user = await User.findById(character["createdBy"]);

        !!user && form.getTextField("Text2.0.2").setText(user["username"]);

        form.getTextField("Text2.0.0.1.0.0").setText(character["flavor"]["traits"]["age"]);
        form.getTextField("Text2.0.0.1.0.1").setText(character["flavor"]["traits"]["height"]);
        form.getTextField("Text2.0.0.1.0.2").setText(character["flavor"]["traits"]["weight"]);
        form.getTextField("Text2.0.0.1.1.0").setText(character["flavor"]["traits"]["eyes"]);
        form.getTextField("Text2.0.0.1.1.1").setText(character["flavor"]["traits"]["skin"]);
        form.getTextField("Text2.0.0.1.1.2").setText(character["flavor"]["traits"]["hair"]);

        if (character["flavor"]["portrait"]["original"]) {
          const imageUrl = character["flavor"]["portrait"]["original"];
          const imageBytes = (await axios({ url: imageUrl, responseType: "arraybuffer" })).data;

          let characterPortrait;
          if (imageUrl.includes(".png")) {
            characterPortrait = await pdfDoc.embedPng(imageBytes);
          } else if (imageUrl.includes(".jpg")) {
            characterPortrait = await pdfDoc.embedJpg(imageBytes);
          }

          if (!!characterPortrait) {
            form.getButton("Aspecto del personaje").setImage(characterPortrait);
          }
        }

        if (character["flavor"]["personality"]) {
          const parsedPersonality = convertHtmlToString(character["flavor"]["personality"], { wordwrap: null });

          const [firstPersonalityField, secondPersonalityField] = parsedPersonality.match(/[\s\S]{1,900}/g) || [];

          if (!!firstPersonalityField) form.getTextField("Text15.1.0.1.0.0.0").setText(firstPersonalityField);

          if (!!secondPersonalityField) form.getTextField("Text15.1.0.1.1").setText(secondPersonalityField);
        }

        if (character["flavor"]["appearance"]) {
          const parsedAppearance = convertHtmlToString(character["flavor"]["appearance"], { wordwrap: null });
          const [firstAppearanceField, secondAppearanceField] = parsedAppearance.match(/[\s\S]{1,700}/g) || [];

          if (!!firstAppearanceField) form.getTextField("Text15.1.0.1.0.1.0").setText(firstAppearanceField);

          if (!!secondAppearanceField) form.getTextField("Text15.1.0.1.0.1.1").setText(secondAppearanceField);
        }

        form.getTextField("Text5.0").setText(`${character["stats"]["armorClass"]}`);
        form.getTextField("Text5.1").setText(`${character["stats"]["initiativeBonus"]}`);
        form.getTextField("Text5.2").setText(`${character["stats"]["speed"]["land"]}`);
        form.getTextField("Text7").setText(`${character["stats"]["hitPoints"]["max"]}`);
        form.getTextField("Text1.0.1.0").setText(`${character["stats"]["passivePerception"]}`);
        form.getTextField("Text14.0").setText(convertHtmlToString(character["stats"]["proficiencies"]));
        form.getTextField("Text1.0.1.1").setText(`${character["stats"]["proficiencyBonus"]}`);

        // CLASSES
        const charClassArray = [];
        character["stats"]["classes"].forEach((charClass) => {
          let string = `${charClass.className} (${charClass.classLevel})`;

          charClassArray.push(string);
        });

        form.getTextField("Text2.0.0.0").setText(charClassArray.join(" / "));

        // STATS
        const stats = character["stats"]["abilityScores"];
        const getModifier = (stat) => Math.floor((stat - 10) / 2);

        Object.keys(stats).forEach((stat, index) => {
          form.getTextField(`Text4.${index}`).setText(`${stats[stat]}`);

          form.getTextField(`Text3.${index}`).setText(`${getModifier(stats[stat])}`);
        });

        // SAVING THROWS
        const savingThrows = character["stats"]["savingThrows"];
        const getSavingThrow = (check) => {
          let bonus = 0;

          if (savingThrows[check].expertise) {
            bonus = Math.floor((stats[check] - 10) / 2) + character["stats"]["proficiencyBonus"] * 2;
          } else if (savingThrows[check].proficient) {
            bonus = Math.floor((stats[check] - 10) / 2) + character["stats"]["proficiencyBonus"];
          } else {
            bonus = Math.floor((stats[check] - 10) / 2);
          }

          return bonus;
        };

        Object.keys(savingThrows).forEach((savingThrow, index) => {
          form.getTextField(`Text6.${index}`).setText(`${getSavingThrow(savingThrow)}`);

          if (savingThrows[savingThrow].expertise || savingThrows[savingThrow].proficient) {
            form.getCheckBox(`Check Box 23.${index + (index === 5 ? ".0" : "")}`).check();
          }
        });

        // SKILLS
        const skills = character["stats"]["skills"];
        const getSkill = (check, i) => {
          let bonus = 0;
          if (skills[check].expertise) {
            bonus = Math.floor((stats[skills[check].modifier] - 10) / 2) + character["stats"]["proficiencyBonus"] * 2;
            form.getCheckBox("Check Box 23.5.1." + i).check();
          } else if (skills[check].proficient) {
            bonus = Math.floor((stats[skills[check].modifier] - 10) / 2) + character["stats"]["proficiencyBonus"];
            form.getCheckBox("Check Box 23.5.1." + i).check();
          } else {
            bonus = Math.floor((stats[skills[check].modifier] - 10) / 2);
          }

          return bonus;
        };

        const skillKeys = [
          "acrobatics",
          "athletics",
          "arcana",
          "deception",
          "history",
          "performance",
          "intimidation",
          "investigation",
          "sleight-of-hand",
          "medicine",
          "nature",
          "perception",
          "insight",
          "persuasion",
          "religion",
          "stealth",
          "survival",
          "animal-handling",
        ];

        skillKeys.forEach((key, index) => {
          form.getTextField(`Text6.6.${index}`).setText(`${getSkill(key, index)}`);
        });

        // HIT DICE
        let maxDice = 0;

        character["stats"]["classes"].forEach((charClass) => (maxDice += charClass.classLevel));
        form.getTextField("Text13").setText(`${maxDice}`);

        // FLAVOR

        !!character["flavor"]["backstory"] &&
          form.getTextField("Text15.1.0.0.1").setText(convertHtmlToString(character["flavor"]["backstory"]));

        form
          .getTextField("Text12")
          .setText(
            [
              "==ACCIONES==",
              ...(character["stats"]["actions"] || []).map((el) => el.name),
              "==ACCIONES ADICIONALES==",
              ...(character["stats"]["bonusActions"] || []).map((el) => el.name),
              "==REACCIONES==",
              ...(character["stats"]["reactions"] || []).map((el) => el.name),
              "==OTRAS HABILIDADES==",
              ...(character["stats"]["additionalAbilities"] || []).map((el) => el.name),
            ].join("\n")
          );

        // ITEMS
        const itemIds = [
          ...(character["stats"]["equipment"]["items"] || []).map((item) => item.id),
          ...(character["stats"]["equipment"]["armor"] || []).map((armor) => armor.id),
          ...(character["stats"]["equipment"]["weapons"] || []).map((weapon) => weapon.id),
          ...(character["stats"]["equipment"]["vehicles"] || []).map((vehicle) => vehicle.id),
        ];

        const items = await Item.find({ _id: { $in: itemIds } });
        const itemDictionary = {};

        items.forEach((item) => {
          if (itemDictionary[item.type]) {
            itemDictionary[item.type].push(item.name);
          } else {
            itemDictionary[item.type] = [item.name];
          }
        });

        form
          .getTextField("Text14.1")
          .setText(
            [
              "==OBJETOS==",
              (itemDictionary["items"] || []).join(", "),
              "==ARMAS==",
              (itemDictionary["weapons"] || []).join(", "),
              "==ARMADURA==",
              (itemDictionary["armor"] || []).join(", "),
              "==VEHÍCULOS==",
              (itemDictionary["vehicles"] || []).join(", "),
            ].join("\n")
          );

        // ATTACKS
        const calculateToHitBonusStr = (attack) => {
          let toHitBonus = 0;
          let bonusStat = attack.data.modifier;

          toHitBonus =
            Math.floor((character["stats"].abilityScores[bonusStat] - 10) / 2) +
            (attack.proficient ? character["stats"].proficiencyBonus : 0);

          return "1d20 " + (toHitBonus >= 0 ? "+" : "") + " " + toHitBonus;
        };

        const calculateDamageBonusStr = (damage, attack) => {
          let damageBonus = 0;
          let bonusStat = attack.data.modifier;

          damageBonus = Math.floor((character["stats"].abilityScores[bonusStat] - 10) / 2);

          return `${damage.numDie}d${damage.dieSize} ${damageBonus >= 0 ? "+" : ""} ${damageBonus}`;
        };

        character["stats"]["attacks"].slice(0, 3).forEach((attack, index) => {
          form.getTextField(`Wpn Name.${index}.0`).setText(attack.name);

          form.getTextField(`Text1.${index + (index === 0 ? ".0" : "")}`).setText(calculateToHitBonusStr(attack));

          const damages = (Object.values(attack.data.damage || {}) || [])
            .map((damage) => calculateDamageBonusStr(damage, attack))
            .join(", ");

          form.getTextField(`Wpn Name.${index}.1`).setText(damages);
        });

        // SPELLS

        const spellIds = {};

        const spellTextFields = [
          "Text20.0.0",
          "Text20.1.0",
          "Text20.2.0",
          "Text20.0.1",
          "Text20.1.1",
          "Text20.2.1",
          "Text20.0.2",
          "Text20.1.2",
          "Text20.2.2.0",
          "Text20.2.2.1",
        ];

        character.stats["spells"].forEach((spellcasting) => {
          Object.keys(spellcasting.spells).forEach((spellLevel) => {
            spellIds[spellLevel] = spellcasting.spells[spellLevel].map(({ spellId }) => spellId);
          });
        });

        for (const spellLevel in spellIds) {
          let spells = await Spell.find({ _id: { $in: spellIds[spellLevel] } }, { _id: -1, name: 1 });

          spellIds[spellLevel] = spells;
        }

        spellTextFields.forEach((field, index) => {
          if (index in spellIds) {
            form.getTextField(field).setText(spellIds[index].map((spell) => spell.name).join("\n"));
          }
        });

        const spellcastingDictionary = {
          strength: "STR",
          dexterity: "DEX",
          constitution: "CON",
          intelligence: "INT",
          wisdom: "WIS",
          charisma: "CHA",
        };

        let spellcastingAbility = [];
        let spellBonus = [];
        let spellDC = [];

        character["stats"]["spells"].forEach((spellcasting) => {
          const abilityScoreModifier = Math.floor((character["stats"].abilityScores[spellcasting.modifier] - 10) / 2);

          spellcastingAbility.push(spellcastingDictionary[spellcasting.modifier]);
          spellDC.push(8 + character["stats"]["proficiencyBonus"] + abilityScoreModifier);
          spellBonus.push(abilityScoreModifier + character["stats"]["proficiencyBonus"]);
        });

        form.getField("Text18.0").setText(spellcastingAbility.join(" / "));
        form.getField("Text18.1").setText(spellDC.join(" / "));
        form.getField("Text18.2").setText(spellBonus.join(" / "));

        form.flatten({ updateFieldAppearances: true });

        const base64Url = await pdfDoc.saveAsBase64({ dataUri: true });

        res.status(200).json({ payload: base64Url });
      } else {
        res.status(400).json({ message: "No hay ningún personaje tuyo con este ID." });
      }
    } else {
      res.status(401).json({ message });
    }
  } catch (error) {
    res.status(400).json({ message: "Error: " + error });
  }
};
