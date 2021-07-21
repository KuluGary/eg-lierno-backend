// const Npc = require("../../models/npc");
// const Controller = require("../../controllers/npc")
// const { ApolloError } = require('apollo-server-express');

import Npc from "../../models/npc";
import User from "../../models/user";
import { Ctx, Query, Resolver, Arg } from "type-graphql";
import { NpcResponse } from "../schema/npc";

@Resolver()
export class NpcResolver {
  @Query(() => NpcResponse)
  async get_npcs_by_id(@Ctx() { req }, @Arg("npcIds", () => [String], { nullable: true }) npcIds: [String] | null) {
    if (!req.session.userId) {
      return {
        errors: [{ field: "login", error: "No está logueado" }],
      };
    }

    const npcs = await Npc.find({ _id: { $in: npcIds } });

    return { npcs };
  }

  @Query(() => NpcResponse)
  async get_favorite_npcs(@Ctx() { req }) {
    if (!req.session.userId) {
      return {
        errors: [{ field: "login", error: "No está logueado" }],
      };
    }

    const user = await User.findById(req.session.userId);

    if (user.favorites?.npcs) {
      const npcs = await Npc.find({ _id: { $in: user.favorites?.npcs } });

      return { npcs };
    } else {
      return { npcs: [] };
    }
  }
}
