const express = require("express");
const router = express.Router();
const Campaign = require("../models/campaign");
const utils = require("../utils/utils");

router.get("/campaigns", async (req, res) => {
  try {
    const { valid, decoded, message } = utils.validateToken(req.headers.authorization);

    if (valid) {
      if (decoded.role === "SUPER_ADMIN") {
        const campaigns = await Campaign.find({});

        return res.status(200).json({ payload: campaigns });
      }

      const campaigns = await Campaign.find({ $or: [{ players: { $all: [decoded.userId] } }, { dm: decoded.userId }] });

      res.status(200).json({ payload: campaigns });
    } else {
      res.status(401).json({ message });
    }
  } catch (e) {
    res.status(400).json({ message: "Internal server error: " + e });
  }
});

router.post("/campaigns", async (req, res) => {
  try {
    const { valid, decoded, message } = utils.validateToken(req.headers.authorization);

    if (valid) {
      const campaign = req.body;
      campaign["createdBy"] = decoded["userId"];

      const newCampaign = new Campaign(campaign);

      newCampaign.save(function (err) {
        if (err) {
          return res.json(500, { message: err });
        }

        res.status(200).json({ message: "Npc añadido correctamente" });
      });
    } else {
      res.status(401).json({ message });
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.get("/campaigns/:id", async (req, res) => {
  try {
    const { valid, message } = utils.validateToken(req.headers.authorization);

    if (valid) {
      const campaign = await Campaign.findById(req.params.id);

      res.status(200).json({ payload: campaign });
    } else {
      res.status(401).json({ message });
    }
  } catch (e) {
    res.status(400).json({ message: "Internal server error" });
  }
});

router.put("/campaigns/:id", async (req, res) => {
  try {
    const { valid, message } = utils.validateToken(req.headers.authorization);

    if (valid) {
      Campaign.findOneAndUpdate({
          _id: req.params.id,
          createdBy: req.session.userId,
        },
        req.body,
        null,
        function (err) {
          if (err)
            return res.status(403).json({
              message: "La campaña no ha podido ser modificada",
            });

          return res.status(200).json({ message: "Campaña modificada" });
        },
      );
    } else {
      res.status(401).json({ message });
    }
  } catch (e) {
    res.status(400).json({
      message: "La campaña no ha podido ser modificada.",
    });
  }
});

router.get("/optionalrules", async (req, res) => {
  try {
    res.status(200).json({
      payload: {
        classic: [
          {
            name: "Opciones de acción",
            quote: "DMG p271-272",
            description:
              "En 'Opciones de acción' se agrupan tres reglas opcionales diferentes diseñadas para dar más variedad al combate.",
            children: [
              {
                name: "Subirse a criaturas grandes",
                description: "Permite a un personaje pequeño o mediano escalar una criatura de tamaño adecuado.",
              },
              {
                name: "Desarmar",
                description:
                  "El atacante hace una tirada de ataque que es contestada por una tirada de Fuerza (Atletismo) o Destreza (Acrobacias). Si el atacante gana el defensor es desarmado y su arma cae a los pies del defensor. El atacante tiene tiene desventaja si el defensor usa una arma a dos manos.",
              },
              {
                name: "Invadir",
                description:
                  "Esta opción es usada para que el personaje pueda atravesar un espacio donde se encuentra una criatura hostil. Es una tirada contestada de Fuerza(Atletismo) o Destreza(Acrobacias).",
              },
            ],
          },
          {
            name: "Bonificaciones épicas",
            quote: "DMG p230",
            description:
              "Una vez alcances el nivel 20 en una clase, cada 30,000 XP que ganes te permitirá obtener una bonificación épica.",
          },
          {
            name: "Atravesando criaturas",
            quote: "DMG p272",
            description:
              "Esta regla establece que si tu ataque a melé reduce a una criatura sin dañar a 0 puntos de vida en un solo golpe, cualquier exceso de daño es pasado a una criatura dentro del alcance (siempre y cuando la tirada de ataque inicial fuese suficientemente alta para acertar al segundo objetivo).",
          },
          {
            name: "Creando objetos mágicos",
            quote: "DMG p128",
            description:
              "Se le permite a los personajes la creación de objetos mágicos, requiriendo una cierta cantidad de tiempo, dinero o elementos dependientes del DM.",
          },
          {
            name: "Carga",
            quote: "PHB p176",
            description:
              "La regla opcional de Carga complica la capacidad de cargar introduciendo un límite más realista en lo que los personajes pueden cargar consigo mismos.",
          },
          {
            name: "Tamaño de equipamiento",
            quote: "PHB p145",
            description:
              "Una regla opcional que establece que la armadura y ropajes que varian en tamaño no podrán ser usados por personajes de diferente tamaño.",
          },
          {
            name: "Miedo y Horror",
            quote: "DMG p266",
            description:
              "En caso de Miedo, el DM puede pedir una tirada de salvación de Sabiduría: en un fallo, se gana el estado Aterrorizado. En caso de Horror, el DM puede pedir una tirada de Carisma: en un fallo, se fana un punto de Locura (q.v.)",
          },
          {
            name: "Dotes",
            quote: "DMG p165",
            description:
              "Siempre que un personaje gane una subida de característica, en su lugar puede elegir una Dote de la lista de Dotes.",
          },
          {
            name: "Armas de fuego y explosivos",
            quote: "DMG p267-268",
            description: "Se permite la utilización de armas de fuego y explosivos en la campaña.",
          },
          {
            name: "Cobertura",
            quote: "DMG p272",
            description:
              "Cobertura es dada cuando cualquier objeto sustancial es colocado entre un atacante y su objetivo. Media cobertura otorga un bonus de +2 a CA, tres cuartos otorga un bonus de +5 a CA, y cobertura total impide atacar al objetivo.",
          },
          {
            name: "Heridas",
            quote: "DMG p272",
            description:
              "Siempre que un personaje sea reducido a 0 puntos de vida, debe tener éxito en una tirada de Constitución CD 10 o sufrir una Herida. Para determinar la herida, se tirará un d20 y se seleccionará de la tabla de Heridas.",
          },
          {
            name: "Inspiración",
            quote: "PHB p125; DMGp240",
            description:
              "Un DM puede recompensar a un personaje con Inspiración por jugar bien; ya sea a través de roleplay, ser heroico,...",
          },
          {
            name: "Niveles por Hitos",
            quote: "DMG p261",
            description:
              "En lugar de recompensar a los personajes con puntos de experiencia, los personajes ganan niveles en puntos específicos de la campaña, establecidos por el DM.",
          },
          {
            name: "Multiclases",
            quote: "PHB p163",
            description:
              "Esta regla permite que un personaje pueda tener más de una clase, siempre y cuando cumpla los requisitos mínimos de característica.",
          },
          {
            name: "Cordura",
            quote: "DMG p264",
            description:
              "Las reglas de Cordura establecen que un personaje puede ser llevado a la locura por hechizos, ver o cometer actos terribles, etc.",
          },
          {
            name: "Habilidades con diferentes Características",
            quote: "PHB p175",
            description:
              "Esta regla permite al DM o jugador sugerir una habilidad diferente cuando se hace una tirada de proficiencia.",
          },
          {
            name: "Curación natural lenta",
            quote: "DMG p267",
            description:
              "Con esta regla, un personaje no recupera puntos de vida durmiendo. La única forma de curarse es gastando dados de golpe durante un descanso corto o lago, y un kit de curandero.",
          },
          {
            name: "Unearthed Arcana",
            quote: "online",
            description:
              "Esta regla permite la utilización de los artículos de playtest de Unearthed Arcana en la campaña.",
          },
        ],
        "darker-dungeons": [
          {
            name: "Modo 1: Radiante",
            quote: "DD p6",
            description:
              "Las reglas Radiante pueden ser utilizadas en casi cualquier campaña sin cambios de tono significativos.",
            children: [
              {
                name: "Ammunition Dice",
                quote: "",
                description:
                  "Lleva la cuenta de la munición en términos abstractos con dados de munición en lugar de por cada flecha.",
              },
              {
                name: "Asistencia",
                quote: "",
                description:
                  "Permite a los personajes asistirse unos a otros con bonus pasivos y evita que los personajes repitan tiradas para múltiples intentos en la misma tarea.",
              },
              {
                name: "Engañar al destino",
                quote: "",
                description:
                  "Permite a los personajes escapar a la muerte con poco comunes y elusivos puntos de destino.",
              },
              {
                name: "Grados de éxito",
                quote: "",
                description: "Añade una opción de éxito-con-coste para hacer las tiradas fallidas más interesantes.",
              },
              {
                name: "Espacio de inventario",
                quote: "",
                description:
                  "Añade un inventario basado en espacios que se centra en tamaño y lugar de objeto, no en peso.",
              },
              {
                name: "Tiradas de conocimiento",
                quote: "",
                description:
                  "Como DM, haz tiradas de conocimiento de personaje en secreto para proveer falsa información y engañar si fallan.",
              },
              {
                name: "Viajes de larga distancia",
                quote: "",
                description:
                  "Haz viajes a larga distancia más interesantes con una Fase de viaje y responsabilidades de viaje",
              },
              {
                name: "Tiradas de habilidad abiertas",
                quote: "",
                description:
                  "Desacopla habilidades de características, permitiendo que una habilidad pueda ser utilizada con cualquier modificador relevante.",
              },
              {
                name: "Pociones, frascos y aceites",
                quote: "",
                description: "Añade nuevos consumibles para que los jugadores encuentren y compren en sus aventuras.",
              },
              {
                name: "Interacción social",
                quote: "",
                description:
                  "Permite que Inteligencia y Sabiduría puedan ser usadas apropiadamente en situaciones sociales, permitiendo a personajes con poco Carisma contribuir más.",
              },
              {
                name: "Herramientas",
                quote: "",
                description:
                  "Haz que las herramientas y las proficiencias sean más valiosas otorgando bonuses adicionales.",
              },
            ],
          },
          {
            name: "Oscuro",
            quote: "DD p6",
            description:
              "Las reglas Oscuro hacen el comabte más peligroso y la vida de los personajes más difícil en general.",
            children: [
              {
                name: "Magia peligrosa",
                quote: "",
                description:
                  "Haz que la magia sea más arriesgada para tus hechiceros con burnout mágico y consecuencias.",
              },
              {
                name: "Enfermedades mortales",
                quote: "",
                description:
                  "Haz que las plagas y enfermedades sean un riesgo serio con malestares que escalan y tiradas de contagio.",
              },
              {
                name: "Calidad del objeto",
                quote: "",
                description:
                  "Lleva la cuenta de la calidad de los objetos, afectando su valor y cómo son vistos por los PNJs.",
              },
              {
                name: "Heridas persistentes",
                quote: "",
                description:
                  "Añade heridas persistentes para asegurarte que llegar a 0 puntos de vida tiene un impacto persistente.",
              },
              {
                name: "Heridas mortales",
                quote: "",
                description: "Añade heridas mortales para hacer que tus personajes teman caer a 0 puntos de vida.",
              },
              {
                name: "Descanso y tiempo libre",
                quote: "",
                description:
                  "Añade una escala de tiempo más realista a tu campaña haciendo que un descanso largo dure toda una semana.",
              },
              {
                name: "Estrés y aflicciones",
                quote: "",
                description: "Lleva la cuenta del bienestar metnal de tus personajes.",
              },
              {
                name: "Condiciones de supervivencia",
                quote: "",
                description:
                  "Lleva la cuenta del estado físico de tus personajes para subrayar recursos tales como la comida o la bebida.",
              },
              {
                name: "Entrenamiento",
                quote: "",
                description: "Haz que tus personajes paguen oro y entrenen con un mentor si desean subir de nivel.",
              },
              {
                name: "Uso y desgaste",
                quote: "",
                description: "Lleva la cuenta del daño al equipamiento y permite a tus personajes repararlo.",
              },
            ],
          },
          {
            name: "Astral",
            quote: "DD p6",
            description: "Las reglas Astral modifican partes principales de la experiencia vainilla de D&D 5e.",
            children: [
              {
                name: "Defensa activa",
                quote: "",
                description:
                  "Reemplaza las tiradas de ataque de los monstruos con tiradas de defensa de los jugadores.",
              },
              {
                name: "Iniciativa activa",
                quote: "",
                description:
                  "Permite a tus jugadores elegir quien actúa a continuación para un combate más dinámico reemplazando la iniciativa basada en turnos.",
              },
              {
                name: "Experiencia activa",
                quote: "",
                description: "Recompensa a los jugadores con XP por encontrar tesoro y llevarlo de vuelta a la aldea.",
              },
              {
                name: "Cambios en rasgos y hechizos",
                quote: "",
                description:
                  "Cambia algunos rasgos, habilidades y hechizos paa modificar niveles de poder y soportar mejor un modo de juego de bajo poder.",
              },
              {
                name: "Iniciativa Inteligente",
                quote: "",
                description:
                  "Cambia la iniciativa para que use INT en lugar de DES para hacer que Inteligencia sea más relevante.",
              },
              {
                name: "Cambios en razas y clases",
                quote: "",
                description:
                  "Modifica las razas y clases con una variedad de pequeñas actualizaciones para soportar mejor los otros modos del suplemento.",
              },
              {
                name: "Generación de personajes aleatoria",
                quote: "",
                description: "Crea personajes aleatoriamente utilizando un d100, 3d6 y tablas aleatorias.",
              },
              {
                name: "Personajes novatos",
                quote: "",
                description: "Crea personajes novatos sin clase para una aventura peligrosa de bajo poder.",
              },
            ],
          },
        ],
      },
    });
  } catch (e) {
    res.status(400).json({ message: "Error: " + e });
  }
});

router.get("/discord/campaigns", async (req, res) => {
  try {
    const { valid, decoded, message } = utils.validateToken(req.headers.authorization);

    if (valid && decoded.role == "SUPER_ADMIN") {
      const campaigns = await Campaign.find({});

      return res.status(200).json({ payload: campaigns });
    } else {
      res.status(401).json({ message });
    }
  } catch (e) {
    res.status(400).json({ message: "Internal server error: " + e });
  }
});

module.exports = router;
