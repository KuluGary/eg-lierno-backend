const Npc = require("../models/npc");
const Class = require("../models/class");
const Spell = require("../models/spell");
const Faction = require("../models/faction");
const Tier = require("../models/tier");

const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const utils = require("../utils/utils");
const nodeHtmlToImage = require("node-html-to-image");
const {
  getSpeedString,
  getAbilitiesString,
  getSavingThrowString,
  getAttackStrings,
  getSpellcastingName,
  getSpellStrings,
} = require("@lierno/dnd-helpers");

const experienceByCr = {
  0: 10,
  0.125: 25,
  0.25: 50,
  0.5: 100,
  1: 200,
  2: 450,
  3: 700,
  4: 1100,
  5: 1800,
  6: 2300,
  7: 2900,
  8: 3900,
  9: 5000,
  10: 5900,
  11: 7200,
  12: 8400,
  13: 10000,
  14: 11500,
  15: 13000,
  16: 15000,
  17: 18000,
  18: 20000,
  19: 22000,
  20: 25000,
  21: 33000,
  22: 41000,
  23: 50000,
  24: 62000,
  25: 75000,
  26: 90000,
  27: 105000,
  28: 120000,
  29: 135000,
  30: 155000,
};

module.exports.getNpc = async (req, res) => {
  try {
    const { valid, decoded, message } = utils.validateToken(req.headers.authorization);

    if (valid) {
      if (!!req.params.id) {
        /** Check if user has access to the NPC  */

        const npc = await Npc.findById(req.params.id);

        res.status(200).json({ payload: npc });
      } else {
        const { skip, limit, qs } = req.query;
        const parsedQs = new RegExp(qs, "i");

        let total = await Npc.aggregate([
          { $match: { name: { $regex: parsedQs }, createdBy: decoded.userId } },
          {
            $group: {
              _id: { $ifNull: ["$flavor.group", "$_id"] },
              id: { $first: "$_id" },
              name: { $first: "$name" },
              personality: { $first: "$flavor.personality" },
              avatar: { $first: "$flavor.portrait.avatar" },
              count: { $sum: 1 },
            },
          },
        ]);

        let npcs = await Npc.aggregate([
          { $match: { name: { $regex: parsedQs }, createdBy: decoded.userId } },
          {
            $group: {
              _id: { $ifNull: ["$flavor.group", "$_id"] },
              id: { $first: "$_id" },
              name: { $first: "$name" },
              personality: { $first: "$flavor.personality" },
              avatar: { $first: "$flavor.portrait.avatar" },
              count: { $sum: 1 },
            },
          },
          { $sort: { name: 1 } },
          { $skip: parseInt(skip) ?? 0 },
          { $limit: parseInt(limit) ?? 0 },
        ]);

        res.status(200).json({ payload: { data: npcs, total: total.length } });
      }
    } else {
      res.status(401).json({ message });
    }
  } catch (e) {
    res.status(400).json({ message: "Error: " + e });
  }
};

module.exports.postNpc = async (req, res) => {
  try {
    const { valid, decoded, message } = utils.validateToken(req.headers.authorization);

    if (valid) {
      const npc = req.body;
      npc["createdBy"] = decoded["userId"];
      const newNpc = new Npc(npc);

      newNpc.save(function (err) {
        if (err) return res.status(403).json({ message: "Error: " + err });

        res.status(200).json({ payload: newNpc._id });
      });
    } else {
      res.status(401).json({ message });
    }
  } catch (err) {
    res.status(400).json({ message: "Error: " + err });
  }
};

module.exports.putNpc = async (req, res) => {
  try {
    const { valid, message } = utils.validateToken(req.headers.authorization);

    if (valid) {
      Npc.findByIdAndUpdate(req.body._id, req.body, function (err, npc) {
        if (err) {
          return res.status(401).json({ message: "Error: " + err });
        }
        return res.status(200).json({ message: "Npc modificado" });
      });
    } else {
      res.status(400).json({ message });
    }
  } catch (e) {
    res.status(400).json({ message: "Error: " + e });
  }
};

module.exports.deleteNpc = async (req, res) => {
  try {
    const { valid, decoded, message } = utils.validateToken(req.headers.authorization);

    if (valid) {
      const npc = await Npc.findById(req.params.id);

      if (utils.validateOwnership(decoded.userId, npc.createdBy)) {
        await Npc.findByIdAndDelete(req.params.id, function (err) {
          if (err) return res.status(403).json({ message: "Error: " + err });
          return res.status(200).json({ message: "El PNJ ha sido eliminado" });
        });
      } else {
        res.status(401).json({ message: "Este PNJ no es de tu propiedad." });
      }
    } else {
      res.status(401).json({ message });
    }
  } catch (error) {
    res.status(400).json({ message: "Error: " + error });
  }
};

module.exports.postNpcInfo = async (req, res) => {
  try {
    const { npcIds } = req.body;

    const npcs = await Npc.find({ _id: { $in: npcIds } });

    const payload = { npcs };

    res.status(200).json({ payload });
  } catch (e) {
    res.status(400).json({ message: "Error: " + e });
  }
};

module.exports.getCampaignNpcs = async (req, res) => {
  try {
    const { valid, message } = utils.validateToken(req.headers.authorization);

    if (valid) {
      const { skip, limit, qs } = req.query;
      const parsedQs = new RegExp(qs, "i");

      let total = await Npc.aggregate([
        { $match: { name: { $regex: parsedQs }, "flavor.campaign": { $elemMatch: { campaignId: req.params.id } } } },
        {
          $group: {
            _id: { $ifNull: ["$flavor.group", "$_id"] },
            id: { $first: "$_id" },
            name: { $first: "$name" },
            personality: { $first: "$flavor.personality" },
            avatar: { $first: "$flavor.portrait.avatar" },
            count: { $sum: 1 },
          },
        },
      ]);

      const npcs = await Npc.aggregate([
        { $match: { name: { $regex: parsedQs }, "flavor.campaign": { $elemMatch: { campaignId: req.params.id } } } },
        {
          $group: {
            _id: { $ifNull: ["$flavor.group", "$_id"] },
            id: { $first: "$_id" },
            name: { $first: "$name" },
            personality: { $first: "$flavor.personality" },
            avatar: { $first: "$flavor.portrait.avatar" },
            count: { $sum: 1 },
          },
        },
        { $sort: { name: 1 } },
        { $skip: parseInt(skip) ?? 0 },
        { $limit: parseInt(limit) ?? 0 },
      ]);

      res.status(200).json({ payload: { data: npcs, total: total.length } });
    } else {
      res.status(401).json({ message });
    }
  } catch (e) {
    res.status(400).json({ message: "Error: " + e });
  }
};

module.exports.getFactionNpcs = async (req, res) => {
  try {
    const { valid, message } = utils.validateToken(req.headers.authorization);
    const faction = await Faction.findById(req.params.id);
    const npcsToFind = faction?.members?.npcs?.map((npc) => npc.id);

    const npcs = await Npc.find({ _id: { $in: npcsToFind } });

    res.status(200).json({ payload: npcs });
    if (valid) {
    } else {
      res.status(401).json({ message });
    }
  } catch (e) {}
};

module.exports.getNpcStatBlock = async (req, res) => {
  try {
    const { valid } = utils.validateToken(req.headers.authorization);

    if (valid) {
      const npcId = req.params.id;

      const npc = await Npc.findOne({ _id: npcId });

      if (!!npc) {
        const $ = cheerio.load(fs.readFileSync(path.join(__dirname, "../assets/html/statblock.html")));

        $("#monster-name").text(npc.name);

        $("#monster-type").text(
          [npc.flavor.class, npc.stats.race.name, npc.flavor.alignment]
            .filter((el) => el && el.length > 0)
            .map((el, i) => (i > 0 ? el.toLowerCase() : el))
            .join(", ")
        );

        $("#hit-points").text(
          `${npc["stats"]["hitPoints"]["current"] ?? npc["stats"]["hitPoints"]["max"]} / ${
            npc["stats"]["hitPoints"]["max"]
          } (${npc["stats"]["hitDie"]["num"]}d${npc["stats"]["hitDie"]["size"]} + ${
            Math.floor((npc["stats"]["abilityScores"]["constitution"] - 10) / 2) * npc["stats"]["hitDie"]["num"]
          })`
        );

        $("#armor-class").text(getSpeedString(npc.stats.speed));

        $("#armor-class").text(`${npc["stats"]["armorClass"]}`);

        $("#properties-list").prepend(`
          <div class="property-line">
            <h4>Habilidades</h4>
            <p>${getAbilitiesString(npc)}</p>
          </div>
        `);

        $("#properties-list").prepend(`
          <div class="property-line">
            <h4>Tiradas de salvación</h4>
            <p>${getSavingThrowString(npc)}</p>
          </div>
        `);

        Object.entries(npc["stats"]["abilityScores"]).forEach(([key, value]) => {
          $(`#${key.substring(0, 3)}pts`).text(
            `${value.toString()} (${(Math.floor((value - 10) / 2) >= 0 ? "+" : "") + Math.floor((value - 10) / 2)})`
          );
        });

        $("#challenge-rating").text(
          `${npc["stats"]["challengeRating"]} (${
            experienceByCr[npc["stats"]["challengeRating"]]
          } puntos de experiencia)`
        );

        if (!!npc["stats"]["additionalAbilities"]?.length > 0) {
          npc["stats"]["additionalAbilities"].forEach((ability) => {
            $("#traits-list-left").append(`
              <div class="property-block">
                <div>
                  <h4>${ability.name}</h4>
                  <p>${ability.description}</p>
                </div>
              </div>
            `);
          });
        }

        if (!!npc["stats"]["actions"]?.length > 0) {
          $("#traits-list-left").append("<h3>Acciones</h3>");

          npc["stats"]["actions"].forEach((action) => {
            $("#traits-list-left").append(`
              <div class="property-block">
                <div>
                    <h4>${action.name}</h4>
                    <p>${action.description}</p>
                </div>
              </div>
            `);
          });

          if (!!npc["stats"]["attacks"]?.length > 0) {
            npc["stats"]["attacks"].forEach((attack) => {
              $("#traits-list-left").append(`
                <div class="property-block">
                  <div>
                      <h4>${attack.name}</h4>
                      <p>${getAttackStrings(npc)}</p>
                  </div>
                </div>
              `);
            });
          }
        }

        if (!!npc["stats"]["reactions"]?.length > 0) {
          $("#traits-list-left").append("<h3>Reacciones</h3>");

          npc["stats"]["reactions"].forEach((reaction) => {
            $("#traits-list-left").append(`
              <div class="property-block">
                <div>
                  <h4>${reaction.name}</h4>
                  <p>${reaction.description}</p>
                </div>
              </div>
            `);
          });
        }

        if (!!npc["stats"]["spells"]?.length > 0) {
          $("#traits-list-left").append("<h3>Hechizos</h3>");

          const classes = await Class.find({});
          let spellData = await Spell.find({});
          spellData = JSON.parse(JSON.stringify(spellData));

          npc["stats"]["spells"].forEach((spell) => {
            $("#traits-list-left").append(`
              <div class="property-block">
                <div>
                  <h4>${getSpellcastingName(spell.caster, classes)}</h4>
                  <p>
                    ${getSpellStrings(spell, spellData, npc)}
                  </p>
                </div>
              </div>
            `);
          });
        }

        $.html();

        if ($("#stat-block")?.html()?.length > 6000) {
          $("#stat-block").css("width", "800px");
          $(".section").css("column-count", 2);
        } else {
          $(".section").css("column-count", 1);
        }

        const image = await nodeHtmlToImage({
          html: $.html(),
          encoding: "base64",
          transparent: true,
        }).catch((err) => console.warn(err));

        res.status(200).json({ payload: "data:image/png;base64," + image });
      } else {
        res.status(400).json({ message: "No hay ningún NPC con este ID." });
      }
    }
  } catch (error) {
    res.status(400).json({ message: "Error: " + error });
  }
};
