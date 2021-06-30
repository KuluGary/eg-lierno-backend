import { Ctx, Query, Resolver, Arg } from "type-graphql";
import CharacterModel from "../../models/character";
import campaignController from "../../controllers/campaign";
import { CharacterResponse } from "../schema/character";

@Resolver()
export class CharacterResolver {
    @Query(() => CharacterResponse)
    async get_user_characters(@Ctx() { req }) {
        if (!req.session.userId) {
            return {
                errors: [{ field: "login", error: "No está logueado" }],
            };
        }

        const characters = await CharacterModel.find({
            player: req.session.userId,
        });

        return { characters };
    }

    @Query(() => CharacterResponse)
    async get_dm_characters(@Ctx() { req }) {
        if (!req.session.userId) {
            return {
                errors: [{ field: "login", error: "No está logueado" }],
            };
        }

        const campaigns = await campaignController.getCampaigns({
            dm: req.session.userId,
        });

        const campaignCharacters = [...new Set(campaigns.map((campaign) => campaign.characters).flat())];

        const characters = await CharacterModel.find({
            $and: [{ _id: { $in: campaignCharacters } }, { player: { $ne: req.session.userId } }],
        });

        return { characters };
    }

    @Query(() => CharacterResponse)
    async get_characters_by_id(
        @Arg("characterIds", () => [String], { nullable: true }) characterIds: [String] | null,
        @Ctx() { req },
    ) {
        if (!req.session.userId) {
            return {
                errors: [{ field: "login", error: "No está logueado" }],
            };
        }

        const characters = await CharacterModel.find({ _id: { $in: characterIds } });

        return { characters };
    }
}
