import Item from "../../models/item";
import { Ctx, Query, Resolver } from "type-graphql";
import { ItemResponse } from "../schema/item";

@Resolver()
export class ItemResolver {
    @Query(() => ItemResponse)
    async get_items(@Ctx() { req }) {
        if (!req.session.userId)
            return {
                errors: [{ field: "login", error: "No está logueado" }],
            };

        const items = await Item.find({ type: "items" });

        return { items };
    }

    @Query(() => ItemResponse)
    async get_weapons(@Ctx() { req }) {
        if (!req.session.userId)
            return {
                errors: [{ field: "login", error: "No está logueado" }],
            };

        const items = await Item.find({ type: "weapons" });

        return { items };
    }

    @Query(() => ItemResponse)
    async get_vehicles(@Ctx() { req }) {
        if (!req.session.userId)
            return {
                errors: [{ field: "login", error: "No está logueado" }],
            };

        const items = await Item.find({ type: "vehicles" });

        return { items };
    }

    @Query(() => ItemResponse)
    async get_armor(@Ctx() { req }) {
        if (!req.session.userId)
            return {
                errors: [{ field: "login", error: "No está logueado" }],
            };

        const items = await Item.find({ type: "armor" });

        return { items };
    }
}