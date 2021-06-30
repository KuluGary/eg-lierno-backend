// const { gql } = require('apollo-server-express');

// module.exports = gql`
//      extend type Query {
//         getAllMonsters: [Monster]      
//         getMonstersById(monsterIds: [String]): [Monster],
//         getPublicMonsters: [Monster]
//      }     
//  `


import { Field, ID, ObjectType } from "type-graphql";
import { ObjectId } from "mongodb";

@ObjectType()
class MonsterError {
    @Field()
    field: string;

    @Field()
    error: string;
}

@ObjectType()
class MonsterCampaign {
    @Field()
    campaignId: String;

    @Field()
    unlocked: Boolean;
}

@ObjectType()
class MonsterPersonality {
    @Field()
    perosnality: String;

    @Field()
    physical: String;

    @Field()
    backstory: String;
}

@ObjectType()
class MonsterSavingThrows {
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
class MonsterSkills {
    @Field()
    ability: String;

    @Field()
    proficient: Boolean;
}

@ObjectType()
class MonsterAbilities {
    @Field()
    name: String;

    @Field()
    description: String;
}

@ObjectType()
class MonsterAbilityScoreModifiers {
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
class MonsterStats {
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
    abilityScores: MonsterAbilityScoreModifiers;

    @Field(() => [MonsterSavingThrows])
    savingThrows: [MonsterSavingThrows];

    @Field(() => [MonsterSkills])
    skills: [MonsterSkills];

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

    @Field(() => [MonsterAbilities])
    additionalAbilities: [MonsterAbilities];

    @Field()
    challengeRating: number;

    @Field()
    experiencePoints: number;

    @Field(() => [MonsterAbilities])
    actions: [MonsterAbilities];

    @Field(() => [MonsterAbilities])
    reactions: [MonsterAbilities];

    @Field(() => [MonsterAbilities])
    legendaryActions: [MonsterAbilities];

    @Field()
    legendaryActionsPerRound: number;

    @Field()
    abilityScoreModifiers: MonsterAbilityScoreModifiers;

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
class MonsterFlavor {
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

    @Field(() => [MonsterCampaign])
    campaign: [MonsterCampaign];

    @Field(() => [MonsterPersonality])
    personality: [MonsterPersonality];
}

@ObjectType()
class Monster {
    @Field((_) => ID)
    _id: ObjectId;

    @Field()
    name: String;

    @Field(() => MonsterFlavor)
    flavor: MonsterFlavor;

    @Field(() => MonsterStats)
    stats: MonsterStats;

    @Field()
    createdBy: String;
}

@ObjectType()
export class MonsterResponse {
    @Field(() => [MonsterError], { nullable: true })
    errors?: MonsterError[];

    @Field(() => [Monster], { nullable: true })
    monsters?: Monster[];
}
