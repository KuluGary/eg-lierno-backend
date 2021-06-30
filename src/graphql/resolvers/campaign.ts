import CampaignModel from "../../models/campaign";
import { Ctx, Query, Resolver } from "type-graphql";
import { CampaignResponse } from "../schema/campaign";

@Resolver()
export class CampaignResolver {
  @Query(() => CampaignResponse)
  async get_user_campaigns(@Ctx() { req }) {
    if (!req.session.userId) {
      return {
        errors: [{ field: "login", error: "No está logueado" }],
      };
    }

    const campaigns = await CampaignModel.find({
      $or: [
        { players: { $all: [req.session.userId] } },
        { dm: req.session.userId },
      ],
    });
    
    return { campaigns };
  }
}
