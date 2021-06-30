import { Field, ObjectType, ID } from "type-graphql";
import { ObjectId } from "mongodb";

@ObjectType()
class CampaignError {
  @Field()
  field: string;
  @Field()
  error: string;
}

@ObjectType()
class DiscordData {
  @Field()
  main: String;

  @Field(() => [String])
  privadas: [String];
}

@ObjectType()
class CampaignFlavor {
  @Field(() => String, { nullable: true })
  game: String;

  @Field(() => String, { nullable: true })
  synopsis: String;

  @Field((_) => [Diary], { nullable: true })
  diary?: [Diary];
}

@ObjectType()
class Diary {
  @Field()
  title: String;

  @Field()
  description: String;
}

@ObjectType()
class Campaign {
  @Field((_) => ID)
  _id: ObjectId;

  @Field()
  name: String;

  @Field()
  discordData: DiscordData;

  @Field(() => [String])
  players: [String];

  @Field(() => [String])
  characters: [String];

  @Field()
  dm: String;

  @Field()
  flavor: CampaignFlavor;

  @Field()
  completed: Boolean;
}

@ObjectType()
export class CampaignResponse {
  @Field(() => [CampaignError], { nullable: true })
  errors?: CampaignError[];

  @Field(() => [Campaign], { nullable: true })
  campaigns?: Campaign[];
}
