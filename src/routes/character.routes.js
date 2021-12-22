const express = require("express");
const router = express.Router();
const fs = require("fs");
const PDFDocument = require("pdf-lib").PDFDocument;
const axios = require("axios");
const utils = require("../utils/utils");
const jwt = require("jsonwebtoken");

let Character = require("../models/character");
let Campaign = require("../models/campaign");
let Item = require("../models/item");
let Spell = require("../models/spell");
let User = require("../models/user");

router.get("/characters", async (req, res) => {
  try {
    const { valid, decoded, message } = utils.validateToken(req.headers.authorization);

    if (valid) {
      let characters;

      if (decoded.role === "SUPER_ADMIN") {
        characters = await Character.find({});
      } else {
        characters = await Character.find(
          { createdBy: decoded.userId },
          { name: 1, "flavor.personality": 1, "flavor.portrait.avatar": 1 }
        );
      }

      res.status(200).json({ payload: characters });
    } else {
      res.status(401).json({ message });
    }
  } catch (error) {
    res.status(403).json({ message: "Error: " + error });
  }
});

router.get("/dm-characters", async (req, res) => {
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
});

router.put("/characters/:id", async (req, res) => {
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
});

router.get("/characters/:id", async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);

    res.status(200).json({ payload: character });
  } catch (error) {
    res.status(403).json({ message: "Error: " + error });
  }
});

router.delete("/characters/:id", async (req, res) => {
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
        res.status(401).json({ message: "Este personaje no es de tu propiedad.." });
      }
    } else {
      res.status(401).json({ message });
    }
  } catch (error) {
    res.status(400).json({ message: "Error: " + error });
  }
});

router.post("/characters", async (req, res) => {
  try {
    const { valid, decoded, message } = utils.validateToken(req.headers.authorization);

    if (valid) {
      const character = req.body;
      character["createdBy"] = decoded["userId"];
      const newCharacter = new Character(character);

      newCharacter.save(function (err) {
        if (err) {
          return res.status(403).json({ message: "Error: " + err });
        }

        res.status(200).json({ payload: newCharacter._id });
      });
    } else {
      res.status(401).json({ message });
    }
  } catch (error) {
    res.status(400).json({ message: "Error: " + error });
  }
});

router.get("/alignments", async (req, res) => {
  try {
    const { valid, message } = utils.validateToken(req.headers.authorization);

    if (valid) {
      const alignments = {
        advanced: [
          [
            { friendlyName: "Lawful Good", stat: 0 },
            { friendlyName: "Social Good", stat: 1 },
            { friendlyName: "Neutral Good", stat: 2 },
            { friendlyName: "Rebel Good", stat: 3 },
            { friendlyName: "Chaotic Good", stat: 4 },
          ],
          [
            { friendlyName: "Lawful Moral", stat: 5 },
            { friendlyName: "Social Moral", stat: 6 },
            { friendlyName: "Neutral Moral", stat: 7 },
            { friendlyName: "Rebel Moral", stat: 8 },
            { friendlyName: "Chaotic Moral", stat: 9 },
          ],
          [
            { friendlyName: "Lawful Neutral", stat: 10 },
            { friendlyName: "Social Neutral", stat: 11 },
            { friendlyName: "True Neutral", stat: 12 },
            { friendlyName: "Rebel Neutral", stat: 13 },
            { friendlyName: "Chaotic Neutral", stat: 14 },
          ],
          [
            { friendlyName: "Lauwful Impure", stat: 15 },
            { friendlyName: "Social Impure", stat: 16 },
            { friendlyName: "Neutral Impure", stat: 17 },
            { friendlyName: "Rebel Impure", stat: 18 },
            { friendlyName: "Chaotic Impure", stat: 19 },
          ],
          [
            { friendlyName: "Lawful Evil", stat: 20 },
            { friendlyName: "Social Evil", stat: 21 },
            { friendlyName: "Neutral Evil", stat: 22 },
            { friendlyName: "Rebel Evil", stat: 23 },
            { friendlyName: "Chaotic Evil", stat: 24 },
          ],
        ],
        simple: [
          [
            { friendlyName: "Lawful Good", stat: 0 },

            { friendlyName: "Neutral Good", stat: 2 },

            { friendlyName: "Chaotic Good", stat: 4 },
          ],
          [
            { friendlyName: "Lawful Neutral", stat: 10 },

            { friendlyName: "True Neutral", stat: 12 },

            { friendlyName: "Chaotic Neutral", stat: 14 },
          ],
          [
            { friendlyName: "Lawful Evil", stat: 20 },

            { friendlyName: "Neutral Evil", stat: 22 },

            { friendlyName: "Chaotic Evil", stat: 24 },
          ],
        ],
      };

      res.status(200).json({ payload: alignments });
    } else {
      res.status(401).json({ message });
    }
  } catch (error) {
    res.status(400).json({ message: "Error: " + error });
  }
});

router.post("/characterinfo", async (req, res) => {
  try {
    const { characterIds } = req.body;

    const characters = await Character.find({ _id: { $in: characterIds } });

    const payload = { characters };

    res.status(200).json({ payload });
  } catch (e) {
    res.status(400).json({ message: "Error: " + e });
  }
});

router.post("/usercharacter/", async (req, res) => {
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
});

router.get("/user/:id/characters", async (req, res) => {
  try {
    const { valid, message } = utils.validateToken(req.headers.authorization);

    if (valid) {
      const userId = req.params.id;

      const character = await Character.find({ createdBy: userId }, { name: 1 });

      res.status(200).json({ payload: character })
    } else {
      res.status(401).json({ message });
    }
  } catch (error) {
    res.status(400).json({ message: "Error: " + error });
  }
})

router.get("/characters/sheet/pdf/:id", async (req, res) => {
  try {
    const { valid, decoded, message } = utils.validateToken(req.headers.authorization);

    if (valid) {
      const characterId = req.params.id;

      const character = await Character.findOne({ _id: characterId, createdBy: decoded.userId });

      if (!!character) {
        const formPdfBytes = await fs.promises.readFile("./src/assets/pdf/character-sheet-Copiar.pdf");
        const pdfDoc = await PDFDocument.load(formPdfBytes);

        const form = pdfDoc.getForm();

        form.getTextField("Text10.0").setText(character["name"]);
        form.getTextField("Text10.1.0").setText(character["name"]);
        form.getTextField("Text2.0.1").setText(character.flavor.background.name ?? "");
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

        form.getTextField("Text5.0").setText(`${character["stats"]["armorClass"]}`);
        form.getTextField("Text5.1").setText(`${character["stats"]["initiativeBonus"]}`);
        form.getTextField("Text5.2").setText(`${character["stats"]["speed"]["land"]}`);
        form.getTextField("Text7").setText(`${character["stats"]["hitPoints"]["max"]}`);
        form.getTextField("Text1.0.1.0").setText(`${character["stats"]["passivePerception"]}`);
        form.getTextField("Text14.0").setText(character["stats"]["proficiencies"]);
        form.getTextField("Text1.0.1.1").setText(`${character["stats"]["proficiencyBonus"]}`);

        // CLASSES
        const charClassArray = [];
        character["stats"]["classes"].forEach((charClass) => {
          let string = `${charClass.className} (${charClass.classLevel})`;

          if (!!charClass.subclassName) {
            string += ` ${charClass.subclassName}`;
          }

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

        // const traits = character["flavor"]["personality"];

        // !!traits["personalityTraits"] && form.getTextField("Text9.0").setText(traits["personalityTraits"]);
        // !!traits["ideals"] && form.getTextField("Text9.1").setText(traits["ideals"]);
        // !!traits["bonds"] && form.getTextField("Text9.2").setText(traits["bonds"]);
        // !!traits["flaws"] && form.getTextField("Text9.3").setText(traits["flaws"]);

        !!character["flavor"]["backstory"] &&
          form.getTextField("Text15.1.0.0.1").setText(character["flavor"]["backstory"].replace(/<br\/>/g, "\n"));

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

          const damages = (Object.values(attack.data.damage ?? {}) || [])
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
});

module.exports = router;
