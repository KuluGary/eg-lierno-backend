import Spell from "../../models/spell";
import { Ctx, Query, Resolver } from "type-graphql";
import { SpellResponse } from "../schema/spell";

@Resolver()
export class SpellResolver {
    @Query(() => SpellResponse)
    async get_spells(@Ctx() { req }) {
        if (!req.session.userId)
            return { errors: [{ field: "login", error: "No está logueado" }] };

        const spells = await Spell.find({});

        return { spells };
    }
}
