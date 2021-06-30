// const Npc = require("../../models/npc");
// const Controller = require("../../controllers/npc")
// const { ApolloError } = require('apollo-server-express');

import Npc from "../../models/npc";
import { Ctx, Query, Resolver, Arg } from "type-graphql";
import { NpcResponse } from "../schema/npc";

// module.exports = {
//     getAllNpcs: () => Npc.find({ }),
//     getNpcsById: (_, { npcIds }) => {
//         try {
//             return Npc.find({ "_id": { $in: npcIds } });
//         } catch (error) {
//             throw new ApolloError(`Error al recuperar los personajes.`)
//         }
//     },
//     getPublicNpcs: () => {
//         try {
//             return Controller.getPublicNpc()
//         } catch(e)  {
//             throw new ApolloError(`Error al recuperar los personajes.`)
//         }
//     }
// }

@Resolver()
export class NpcResolver {
    @Query(() => NpcResponse)
    async get_npcs_by_id(
        @Ctx() { req },
        @Arg("npcIds", () => [String], { nullable: true }) npcIds: [String] | null
    ) {
        if (!req.session.userId) {
            return {
                errors: [{ field: "login", error: "No está logueado" }],
            };
        }

        const npcs = await Npc.find({ _id: { $in: npcIds } });

        return { npcs }
    }
}
