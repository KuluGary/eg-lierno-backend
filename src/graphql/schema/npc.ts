import { Field, ID, ObjectType } from "type-graphql";
import { ObjectId } from "mongodb";

@ObjectType()
class NpcError {
    @Field()
    field: string;

    @Field()
    error: string;
}

@ObjectType()
class NpcCampaign {
    @Field()
    campaignId: String;

    @Field()
    unlocked: Boolean;
}

@ObjectType()
class NpcPersonality {
    @Field()
    perosnality: String;

    @Field()
    physical: String;

    @Field()
    backstory: String;
}

@ObjectType()
class NpcSavingThrows {
    @Field()
    ability: String;

    @Field()
    proficient: Boolean;

    @Field()
    modifier: number;

    @Field()
    modifierStr: String;
}

@ObjectType()
class NpcSkills {
    @Field()
    ability: String;

    @Field()
    proficient: Boolean;
}

@ObjectType()
class NpcAbilities {
    @Field()
    name: String;

    @Field()
    description: String;
}

@ObjectType()
class NpcAbilityScoreModifiers {
    @Field()
    strength: number;

    @Field()
    dexterity: number;

    @Field()
    constitution: number;

    @Field()
    intelligence: number;

    @Field()
    wisdom: number;

    @Field()
    charisma: number;
}

@ObjectType()
class NpcStats {
    @Field()
    size: String;

    @Field()
    race: String;

    @Field()
    alignment: String;

    @Field()
    armorClass: number;

    @Field()
    hitDieSize: number;

    @Field()
    proficiencyBonus: number;

    @Field()
    speed: String;

    @Field()
    abilityScores: NpcAbilityScoreModifiers;

    @Field(() => [NpcSavingThrows])
    savingThrows: [NpcSavingThrows];

    @Field(() => [NpcSkills])
    skills: [NpcSkills];

    @Field(() => [String])
    damageVulnerabilities: [String];

    @Field(() => [String])
    damageResistances: [String];

    @Field(() => [String])
    damageImmunities: [String];

    @Field(() => [String])
    conditionImmunities: [String];

    @Field(() => [String])
    senses: [String];

    @Field(() => [String])
    langages: [String];

    @Field(() => [NpcAbilities])
    additionalAbilities: [NpcAbilities];

    @Field()
    challengeRating: number;

    @Field()
    experiencePoints: number;

    @Field(() => [NpcAbilities])
    actions: [NpcAbilities];

    @Field(() => [NpcAbilities])
    reactions: [NpcAbilities];

    @Field(() => [NpcAbilities])
    legendaryActions: [NpcAbilities];

    @Field()
    legendaryActionsPerRound: number;

    @Field()
    abilityScoreModifiers: NpcAbilityScoreModifiers;

    @Field()
    armorType: String;

    @Field()
    hitPoints: number;

    @Field()
    extraHealthFromConstitution: number;

    @Field()
    hitPointsStr: String;

    @Field()
    armorTypeStr: String;

    @Field()
    legendaryActionsDescription: String;

    @Field()
    challengeRatingStr: String;
}

@ObjectType()
class NpcFlavor {
    @Field()
    faction: String;

    @Field()
    gender: String;

    @Field()
    pronoun: String;

    @Field()
    environment: String;

    @Field()
    description: String;

    @Field()
    nameIsProper: Boolean;

    @Field()
    imageUrl: String;

    @Field()
    class: String;

    @Field(() => [NpcCampaign])
    campaign: [NpcCampaign];

    @Field(() => [NpcPersonality])
    personality: [NpcPersonality];
}

@ObjectType()
class Npc {
    @Field((_) => ID)
    _id: ObjectId;

    @Field()
    name: String;

    @Field(() => NpcFlavor)
    flavor: NpcFlavor;

    @Field(() => NpcStats)
    stats: NpcStats;

    @Field()
    createdBy: String;
}

@ObjectType()
export class NpcResponse {
    @Field(() => [NpcError], { nullable: true })
    errors?: NpcError[];

    @Field(() => [Npc], { nullable: true })
    npcs?: Npc[];
}
