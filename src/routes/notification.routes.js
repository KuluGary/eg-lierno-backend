const express = require("express");
const router = express.Router();
const utils = require("../utils/utils");

let Npc = require("../models/npc");
let Monster = require("../models/monster");
let Character = require("../models/character");
let Spell = require("../models/spell");

router.post("/characters/like", async (req, res) => {
  try {
    const { valid, decoded, message } = utils.validateToken(req.headers.authorization);

    if (valid) {
    } else {
      res.status(401).json({ message });
    }
  } catch (error) {
    res.status(403).json({ message: "Error: " + error });
  }
});

router.get("/update-npc", async (req, res) => {
  try {
    const npcs = await Npc.find({});

    npcs.forEach((npc) => {
      npc.flavor.traits = {
        gender: npc.flavor.gender ?? "",
        pronoun: npc.flavor.pronoun ?? "El",
        nameIsProper: npc.flavor.nameIsProper ?? true,
      };

      npc.stats.hitDie = { num: parseInt(npc.stats.numHitDie ?? 0), size: parseInt(npc.stats.hitDieSize) };
      npc.stats.equipment = { items: npc.stats.items };

      // Parsing int
      npc.stats.armorClass = parseInt(npc.stats.armorClass);
      npc.stats.challengeRating = parseInt(npc.stats.challengeRating);
      npc.stats.proficiencyBonus = parseInt(npc.stats.proficiencyBonus);

      Object.entries(npc.stats.abilityScores ?? {}).forEach(
        ([key, value]) => (npc.stats.abilityScores[key] = parseInt(value))
      );

      // Renaming
      npc.flavor.appearance = npc.flavor.personality.physical ?? "";
      npc.flavor.backstory = npc.flavor.personality.backstory ?? "";
      npc.flavor.personality = npc.flavor.personality.personalityTrait1 ?? npc.flavor.personality.personality ?? "";
      npc.flavor.alignment = npc.stats.alignment ?? "";
      npc.stats.hitPoints = { current: npc.stats.hitPoints, max: npc.stats.hitPoints };
      npc.stats.race = { name: npc.stats.race ?? "", size: npc.stats.size ?? "" };
      npc.stats.speed = { land: parseInt(npc.stats.speed.replace(/\D/g, "")) };

      const skills = {};
      const savingThrows = {};

      npc.stats.skills.forEach((skill) => {
        const { id, proficient, expertise, modifier } = skill;

        skills[id] = { proficient, expertise, modifier };
      });

      npc.stats.skills = skills;

      npc.stats.savingThrows.forEach((savingThrow) => {
        const { ability, proficient } = savingThrow;

        savingThrows[ability] = { proficient };
      });

      npc.stats.savingThrows = savingThrows;

      // Deleting
      delete npc.flavor.gender;
      delete npc.flavor.pronoun;
      delete npc.flavor.owner;
      delete npc.flavor.nameIsProper;

      delete npc.stats.size;
      delete npc.stats.items;
      delete npc.stats.hitDieSize;
      delete npc.stats.numHitDie;
      delete npc.stats.abilityScoreModifiers;
      delete npc.stats.armorType;
      delete npc.stats.armorTypeStr;
      delete npc.stats.challengeRatingStr;
      delete npc.stats.alignment;
      delete npc.stats.experiencePoints;
      delete npc.stats.extraHealthFromConstitution;
      delete npc.stats.hitPointsStr;
      delete npc.stats.languages;

      Npc.findByIdAndUpdate(npc._id, npc, function (err) {
        if (err) return res.status(500).send(err.message);
      });
    });

    res.status(200).send("Npcs updated");
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get("/update-character", async (req, res) => {
  try {
    const spellAllData = await Spell.find({});
    const characters = await Character.find({});

    characters.forEach((character) => {
      character.flavor.personality = character.flavor.psychologicalDescription;
      character.flavor.appearance = character.flavor.physicalDescription;
      character.flavor.alignment = character.stats.alignment;
      character.flavor.background = character.stats.background;
      character.stats.hitPoints = {
        max: character.stats.hitPoints.hp_max,
        current: character.stats.hitPoints.hp_current ?? character.stats.hitPoints.hp_max,
      };
      character.stats.speed = {
        land: character.stats.speed,
      };
      character.stats.passivePerception = parseInt(character.stats.passivePerception);
      character.createdBy = character.player;

      Object.entries(character.stats.abilityScores ?? {}).forEach(
        ([key, value]) => (character.stats.abilityScores[key] = parseInt(value))
      );

      Object.values(character.stats.skills).forEach((skill) => {
        delete skill.name;
        delete skill.description;
      });

      const spellById = {};

      character.stats.spells.forEach(({ spellId }) => {
        const spellData = spellAllData.find((a) => a._id == spellId);

        if (spellData?.stats?.level in spellById) {
          spellById[spellData.stats.level].push({ spellId });
        } else {
          spellById[spellData?.stats?.level] = [{ spellId }];
        }
      });

      const spellcastingLookup = {
        STR: "strength",
        DEX: "dexterity",
        CON: "constitution",
        INT: "intelligence",
        WIS: "wisdom",
        CHA: "charisma",
      };

      character.stats.spells = [
        {
          modifier: spellcastingLookup[character.stats.spellcastingAbility ?? "INT"],
          caster: "",
          spells: spellById,
        },
      ];

      if (typeof character.flavor.portrait === "string") {
        character.flavor.portrait = {
          original: character.flavor.portrait,
        };
      }

      delete character.player;
      delete character.flavor.psychologicalDescription;
      delete character.flavor.physicalDescription;
      delete character.stats.alignment;
      delete character.stats.subrace;
      delete character.stats.background;
      delete character.stats.spellcastingAbility;
      delete character.type;

      Character.findByIdAndUpdate(character._id, character, function (err) {
        if (err) return res.status(500).send(err.message);
      });
    });

    res.status(200).send("Characters updated");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/update-monster", async (req, res) => {
  try {
    const monsters = await Monster.find({});

    monsters.forEach((monster) => {
      monster.flavor.traits = {
        gender: monster.flavor.gender ?? "",
        pronoun: monster.flavor.pronoun ?? "",
        nameIsProper: monster.flavor.nameIsProper ?? "",
      };

      monster.stats.hitDie = {
        num: parseInt(monster.stats.numHitDie ?? 0),
        size: parseInt(monster.stats.hitDieSize ?? 0),
      };
      monster.stats.equipment = { items: monster.stats.items };

      monster.flavor.portrait = {
        original: monster.flavor.imageUrl
      }

      // Parsing int
      monster.stats.armorClass = parseInt(monster.stats.armorClass);
      monster.stats.challengeRating = parseInt(monster.stats.challengeRating);
      monster.stats.proficiencyBonus = parseInt(monster.stats.proficiencyBonus);

      Object.entries(monster.stats.abilityScores ?? {}).forEach(
        ([key, value]) => (monster.stats.abilityScores[key] = parseInt(value))
      );

      // Renaming
      monster.flavor.alignment = monster.stats.alignment ?? "";
      monster.stats.hitPoints = { curent: monster.stats.hitPoints, max: monster.stats.hitPoints };
      monster.stats.race = { name: monster.stats.race ?? "", size: monster.stats.size ?? "" };
      monster.stats.speed = { land: parseInt(monster.stats.speed.replace(/\D/g, "")) };

      const skills = {};
      const savingThrows = {};

      monster.stats.skills.forEach((skill) => {
        const { id, proficient, expertise, modifier } = skill;

        skills[id] = { proficient, expertise, modifier };
      });

      monster.stats.skills = skills;

      monster.stats.savingThrows.forEach((savingThrow) => {
        const { ability, proficient } = savingThrow;

        savingThrows[ability] = { proficient };
      });

      monster.stats.savingThrows = savingThrows;

      // Deleting
      delete monster.flavor.gender;
      delete monster.flavor.pronoun;
      delete monster.flavor.owner;
      delete monster.flavor.nameIsProper;
      delete monster.flavor.imageUrl;

      delete monster.stats.size;
      delete monster.stats.items;
      delete monster.stats.hitDieSize;
      delete monster.stats.numHitDie;
      delete monster.stats.abilityScoreModifiers;
      delete monster.stats.armorType;
      delete monster.stats.armorTypeStr;
      delete monster.stats.challengeRatingStr;
      delete monster.stats.alignment;
      delete monster.stats.experiencePoints;
      delete monster.stats.extraHealthFromConstitution;
      delete monster.stats.hitPointsStr;
      delete monster.stats.languages;
      delete monster.stats.abilityScoreStrs;

      Monster.findByIdAndUpdate(monster._id, monster, function (err) {
        if (err) return res.status(500).send(err.message);
      });
    });

    res.status(200).send("Monsters updated");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
