const Npc = require("../models/npc");
const Class = require("../models/class");
const Spell = require("../models/spell");
const Faction = require("../models/faction");

const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const utils = require("../utils/utils");
const nodeHtmlToImage = require("node-html-to-image");

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

const statLabels = {
  strength: "Fuerza",
  dexterity: "Destreza",
  constitution: "Constitución",
  intelligence: "Inteligencia",
  wisdom: "Sabiduría",
  charisma: "Carisma",
};

const skillsJson = {
  acrobatics: {
    name: "Acrobacias",
    description:
      "Tu prueba de Destreza (Acrobacias) abarca tu intento por mantenerte en pie en situaciones difíciles, como cuando estás intentado correr sobre una capa de hielo, mantener el equilibrio en una cuerda floja o mantenerte recto sobre la borda de un barco que se balancea.",
  },
  "animal-handling": {
    name: "T.con Animales",
    description:
      "Cuando hay cualquier duda sobre si puedes calmar a un animal doméstico, evitar que una montura se asuste o intuir las intenciones de un animal, el director de juego puede pedir una prueba de Sabiduría (Trato con Animales). También puedes hacerla para controlar a tu montura cuando haces una maniobra arriesgada.",
  },
  arcana: {
    name: "C.Arcano",
    description:
      "Tu prueba de Inteligencia (Arcana) mide tu capacidad para recordar conocimiento sobre conjuros, objetos mágicos, símbolos sobrenaturales, tradiciones mágicas, los planos de existencia y los habitantes de dichos planos",
  },
  athletics: {
    name: "Atletismo",
    description: "Tu prueba de Fuerza (Atletismo) cubre situaciones difíciles mientras escalas, saltas o nadas",
  },
  deception: {
    name: "Engaño",
    description:
      "Una prueba de Carisma (Engañar) determina si puedes esconder la verdad de manera convincente, ya sea verbalmente o a través de las acciones. Este engaño puede abarcar cualquier cosa, desde liar a alguien siendo ambiguo hasta mentir. Situaciones típicas son camelarse a un guardia, estafar a un mercader, ganar dinero con las apuestas, disfrazarse para hacerse pasar por otro, engañar a alguien suspicaz con afirmaciones falsas o mantener el rosto impávido mientras mientes descaradamente.",
  },
  history: {
    name: "Historia",
    description:
      "Tu prueba de Inteligencia (Historia) mide tu capacidad para recordar eventos históricos, gente legendaria, reinos antiguos, disputas pasadas, guerras recientes y civilizaciones perdidas",
  },
  insight: {
    name: "Perspicacia",
    description:
      "Una prueba de Sabiduría (Perspicacia) determina si puedes conocer las verdaderas intenciones de una criatura, como cuando sospechas que te están mintiendo o predices el siguiente movimiento de alguien. Esto implica analizar el lenguaje corporal, la forma de hablar y los cambios en la gesticulación.",
  },
  intimidation: {
    name: "Intimidación",
    description:
      "Cuando intentas influenciar a alguien a través de una amenaza, acciones hostiles o violencia física, el director de juego puede pedirte hacer una prueba de Carisma (Intimidar). Algunos ejemplos son intentar sonsacar información a un prisionero, convencer a unos matones de que se echen atrás en una confrontación o usar una botella rota para convencer a un visir despreciable de que reconsidere una decisión.",
  },
  investigation: {
    name: "Investigación",
    description:
      "Cuando miras a tu alrededor en busca de pistas y haces deducciones basándote en dichas pistas, haces una prueba de Inteligencia (Investigación). Puedes deducir dónde se encuentra un objeto escondido, discernir qué tipo de arma infligió una herida dependiendo de su apariencia o determinar el punto débil de un túnel que podría provocar un colapso. Estudiar detenidamente pergaminos antiguos en busca de conocimiento oculto también puede requerir una prueba de Inteligencia",
  },
  medicine: {
    name: "Medicina",
    description:
      "Una prueba de Sabiduría (Medicina) te permite intentar estabilizar a un compañero moribundo o diagnosticar una enfermedad.",
  },
  nature: {
    name: "Naturaleza",
    description:
      "Una prueba de Inteligencia (Naturaleza) mide tu capacidad para recordar conocimiento sobre terrenos, plantas, animales, el clima y los ciclos naturales.",
  },
  perception: {
    name: "Percepción",
    description:
      "Una prueba de Sabiduría (Percepción) te permite ver, oír o detectar de otro modo la presencia de algo. Mide tu percepción general sobre lo que te rodea y la agudeza de tus sentidos.",
  },
  performance: {
    name: "Interpretación",
    description:
      "Una prueba de Carisma (Interpretación) determina si consigues deleitar a una audiencia con música, baile, actuación, cuentacuentos o alguna otra forma de entretenimiento.",
  },
  persuasion: {
    name: "Persuasión",
    description:
      "Cuando intentas influenciar a alguien o a un grupo de personas con tacto, cortesía o buen talante, el director de juego puede pedirte que hagas una prueba de Carisma (Persuasión). Normalmente usa persuasión cuando actúes de buena fe, para hacer amigos, hacer sugerencias cordiales o exhibir una etiqueta correcta. Ejemplos de persuadir a otros son convencer a un chambelán de que deje a tu grupo ver al rey, negociar la paz entre dos tribus en guerra o inspirar a una multitud de pueblerinos.",
  },
  religion: {
    name: "Religión",
    description:
      "Una prueba de Inteligencia (Religión) mide tu capacidad para recordar conocimiento sobre deidades, ritos y oraciones, jerarquías religiosas, símbolos sagrados y las prácticas de cultos secretos.",
  },
  "sleight-of-hand": {
    name: "Juego de Manos",
    description:
      "Cuando hagas un acto de prestidigitación o un movimiento rápido con las manos, como pasarle algo a alguien u ocultar algo en tu cuerpo, haz una prueba de Destreza (Juego de Manos)",
  },
  stealth: {
    name: "Sigilo",
    description:
      "Haz una tirada de Destreza (Sigilo) cuando intentes ocultarte de tus enemigos, escabullirte de unos guardias, escaquearte sin que te perciban o acercarte sigilosamente a alguien sin que te vean ni oigan",
  },
  survival: {
    name: "Supervivencia",
    description:
      "El director de juego puede pedirte hacer una prueba de Sabiduría (Supervivencia) para seguir huellas, cazar, guiar a tu grupo por un yermo helado, identificar signos de osos lechuza que viven cerca, predecir el clima o evitar arenas movedizas u otros peligros naturales.",
  },
};

const fullcaster = {
  1: {
    spellSlots: [2],
  },
  2: {
    spellSlots: [3],
  },
  3: {
    spellSlots: [4, 2],
  },
  4: {
    spellSlots: [4, 3],
  },
  5: {
    spellSlots: [4, 3, 2],
  },
  6: {
    spellSlots: [4, 3, 3],
  },
  7: {
    spellSlots: [4, 3, 3, 1],
  },
  8: {
    spellSlots: [4, 3, 3, 2],
  },
  9: {
    spellSlots: [4, 3, 3, 3, 1],
  },
  10: {
    spellSlots: [4, 3, 3, 3, 2],
  },
  11: {
    spellSlots: [4, 3, 3, 3, 2, 1],
  },
  12: {
    spellSlots: [4, 3, 3, 3, 2, 1],
  },
  13: {
    spellSlots: [4, 3, 3, 3, 2, 1, 1],
  },
  14: {
    spellSlots: [4, 3, 3, 3, 2, 1, 1],
  },
  15: {
    spellSlots: [4, 3, 3, 3, 2, 1, 1, 1],
  },
  16: {
    spellSlots: [4, 3, 3, 3, 2, 1, 1, 1],
  },
  17: {
    spellSlots: [4, 3, 3, 3, 2, 1, 1, 1, 1],
  },
  18: {
    spellSlots: [4, 3, 3, 3, 2, 1, 1, 1, 1],
  },
  19: {
    spellSlots: [4, 3, 3, 3, 2, 1, 1, 1, 1],
  },
  20: {
    spellSlots: [4, 3, 3, 3, 2, 1, 1, 1, 1],
  },
};

const innateSpellCastingLabels = {
  atWill: "A voluntad",
  perDay3: "3/día",
  perDay2: "2/día",
  perDay1: "1/día",
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
        const npcs = await Npc.find({ createdBy: decoded.userId });

        res.status(200).json({ payload: npcs });
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

        res.status(200).json({ value: newNpc._id });
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
      const npcs = await Npc.find({ "flavor.campaign": { $elemMatch: { campaignId: req.params.id } } });

      res.status(200).json({ payload: npcs });
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
      const modifier = (stat) => Math.floor((stat - 10) / 2);
      const getOperatorString = (modifier) => `${modifier > 0 ? "+" : ""}${modifier}`;
      const getSpeedString = (speed) => {
        const speedDictionary = { land: "en tierra", air: "en el aire", swim: "en el agua" };
        const speeds = Object.keys(speed)
          .filter((key) => speed[key] > 0)
          .map((key) => `${speed[key]}ft. (${speedDictionary[key]})`);

        return speeds.join(", ");
      };

      const getSavingThrowString = (abilityScores, savingThrows, proficiency) => {
        const modifiers = Object.keys(savingThrows ?? {})
          .filter((key) => savingThrows[key].proficient || savingThrows[key].expertise)
          .map((key) => {
            let modifier = Math.floor((abilityScores[key] - 10) / 2);

            if (savingThrows[key].expertise) {
              modifier += proficiency * 2;
            } else if (savingThrows[key].proficient) {
              modifier += proficiency;
            }
            return `${statLabels[key]} ${modifier}`;
          });

        return modifiers.join(", ");
      };

      const getAbilitiesString = (abilityScores, skills, proficiency) => {
        if (!!abilityScores && !!skills) {
          const modifiers = Object.entries(skills)
            .filter(([_, skill]) => skill.proficient || skill.expertise)
            .map(([name, skill]) => {
              let modifier = Math.floor((abilityScores[skill.modifier] - 10) / 2);

              if (skill.expertise) {
                modifier += parseInt(proficiency) * 2;
              } else if (skill.proficient) {
                modifier += parseInt(proficiency);
              }

              return `${skillsJson[name]?.name} ${modifier >= 0 ? "+" : "-"} ${modifier} (${
                statLabels[skill.modifier]
              })`;
            });

          return modifiers.join(", ");
        }

        return null;
      };

      const getAttackStrings = (attack, abilityScores, proficiency) => {
        const attackTypeDictionary = {
          melee: "melé",
          distance: "distancia",
        };

        let toHitBonus = 0;
        let damageBonus = 0;
        let bonusStat = attack.data.modifier ?? "strength";
        let type = [];
        let range = [];
        let indexes = [];

        Object.entries(attack.data.damage).forEach(([key, damage]) => {
          if (key in attackTypeDictionary) {
            type.push(attackTypeDictionary[key]);

            if (typeof damage.range === "object") {
              const { short, long } = damage.range;

              range.push(`${short}/${long} ft.`);
            } else range.push(`${damage.range} ft.`);
          }
        });

        type = `Ataque de arma ${type.join(" o ")}.`;
        range = range.join(" o ");

        toHitBonus = modifier(abilityScores[bonusStat]) + (attack.proficient ? proficiency : 0);

        damageBonus = modifier(abilityScores[bonusStat]);

        return `<em>${type}</em> 1d20 ${getOperatorString(toHitBonus)} al golpe, alcance ${range} Daño ${Object.entries(
          attack.data.damage
        )
          .filter(([_, value]) => {
            const die = `${value.numDie}d${value.dieSize}`;
            const isIn = !indexes.includes(die);

            indexes.push(die);
            return isIn;
          })
          .map(([key, dmg]) => {
            let rangeStr;

            if (key === "melee") {
              rangeStr = `melé`;
            }

            if (key === "distance") {
              if (rangeStr === "melé") {
                rangeStr += ` o distancia`;
              } else {
                rangeStr = `distancia`;
              }
            }

            if (key === "versatile") {
              return `${dmg.numDie}d${dmg.dieSize} ${
                damageBonus >= 0 ? "+" : ""
              }${damageBonus} ${dmg.type.toLowerCase()} si es usado con dos manos`;
            }

            if (key === "extraDamage") {
              const median = ((dmg.dieSize + 1) * dmg.numDie) / dmg.numDie;

              return `y ${median} (${dmg.numDie}d${dmg.dieSize}) ${dmg.type.toLowerCase()} de daño adicional`;
            }

            return `${dmg.numDie}d${dmg.dieSize} ${
              damageBonus >= 0 ? "+" : ""
            }${damageBonus} ${dmg.type.toLowerCase()}`;
          })
          .join(", ")}.`;
      };

      const getSpellcastingName = (caster, classes) => {
        if (caster === "00000") return "Lanzamiento de conjuros innato.";

        if (!!classes) {
          const className = classes.find((charClass) => charClass._id == caster)?.name?.toLowerCase();

          if (!!className) {
            return `Lanzamiento de conjuros de ${className}.`;
          }
        }

        return "Lanzamiento de conjuros.";
      };

      const getSpellSlots = (spellLevel, classes, spellcasting) => {
        if (classes.length > 10) {
          return fullcaster[spellcasting.level]?.spellSlots[spellLevel];
        } else {
          let classLevel = 0;

          classes?.forEach((charClass) => {
            if (casterType.fullcaster.includes(charClass.className)) {
              classLevel += charClass.classLevel;
            } else if (casterType.halfcaster.includes(charClass.className)) {
              classLevel += Math.floor(charClass.classLevel / 2);
            } else {
              classLevel += Math.floor(charClass.classLevel / 3);
            }
          });

          return fullcaster[classLevel]?.spellSlots[spellLevel];
        }
      };

      const getSpellStrings = (spellcasting, spellData, abilityScores, name, classes, proficiency) => {
        const { spells, modifier: mod, caster } = spellcasting;

        let spellDC = "N/A";
        let spellBonus = "N/A";

        const spellByLevel = {};

        Object.keys(spells).forEach((key) => {
          spells[key].forEach((spell) => {
            const element = spellData.find((spellDataElement) => spellDataElement._id == spell.spellId);

            if (key in spellByLevel) {
              spellByLevel[key].push(element.name);
            } else {
              spellByLevel[key] = [element.name];
            }
          });
        });

        if (!!mod) {
          const scoreModifier = modifier(abilityScores[mod]);

          spellDC = 8 + parseInt(proficiency) + parseInt(scoreModifier);
          spellBonus = parseInt(proficiency) + parseInt(scoreModifier);
        }

        const spellString = {
          description: `La habilidad de conjuración es ${
            statLabels[mod]
          } (salvación de conjuro CD ${spellDC}, ${getOperatorString(
            spellBonus
          )} al golpe con ataques de hechizo). Tiene los siguientes hechizos preparados:<ul>`,
        };

        Object.keys(spellByLevel).forEach((key) => {
          const spellStr = spellByLevel[key].map((i, index) => (index > 0 ? i.toLowerCase() : i)).join(", ");

          if (caster === "00000") {
            spellString.description += `<li><b>${innateSpellCastingLabels[key]}</b>: ${spellStr}</li>`;
          } else {
            spellString.description += `<li>${
              parseInt(key) === 0
                ? "<b>Trucos (a voluntad)</b>"
                : `<b>Nivel ${key} (${getSpellSlots(parseInt(key) - 1, classes, spellcasting)} huecos)</b>`
            }: ${spellStr}.</li>`;
          }
        });

        return spellString.description;
      };

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
            <p>${getAbilitiesString(
              npc["stats"]["abilityScores"],
              npc["stats"]["skills"],
              npc["stats"]["proficiencyBonus"]
            )}</p>
          </div>
        `);

        $("#properties-list").prepend(`
          <div class="property-line">
            <h4>Tiradas de salvación</h4>
            <p>${getSavingThrowString(npc.stats.abilityScores, npc.stats.savingThrows, npc.stats.proficiencyBonus)}</p>
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
                      <p>${getAttackStrings(
                        attack,
                        npc["stats"]["abilityScores"],
                        npc["stats"]["proficiencyBonus"]
                      )}</p>
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
          const spellData = await Spell.find({});

          npc["stats"]["spells"].forEach((spell) => {
            $("#traits-list-left").append(`
              <div class="property-block">
                <div>
                  <h4>${getSpellcastingName(spell.caster, classes)}</h4>
                  <p>
                    ${getSpellStrings(
                      spell,
                      spellData,
                      npc["stats"]["abilityScores"],
                      npc["name"],
                      classes,
                      npc["stats"]["proficiencyBonus"]
                    )}
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
