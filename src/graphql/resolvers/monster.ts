// const Monster = require("../../models/monster");
// const Controller = require("../../controllers/monster");
// const { ApolloError } = require('apollo-server-express');

import Monster from "../../models/monster";
import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { MonsterResponse } from "../schema/monster";

// module.exports = {
//     getAllMonsters: () => Monster.find({ }),
//     getMonstersById: (_, { monsterIds }) => {
//         try {
//             return Monster.find({ "_id": { $in: monsterIds } });
//         } catch (error) {
//             throw new ApolloError(`Error al recuperar los monstruos.`)
//         }
//     },
//     getPublicMonsters: () => {
//         try {
//             return Controller.getPublicMonster();
//         } catch (error) {
//             throw new ApolloError(`Error al recuperar los monstruos.`)
//         }
//     }
// }


@Resolver()
export class MonsterResolver {
    @Query(() => MonsterResponse)
    async get_monsters_by_id(
        @Ctx() { req },
        @Arg("monsterIds", () => [String], { nullable: true }) monsterIds: [String] | null,
    ) {
        if (!req.session.userId) {
            return {
                errors: [{ field: "login", error: "No está logueado" }],
            };
        }

        const monsters = await Monster.find({ _id: { $in: monsterIds } });

        return { monsters };
    }
}
