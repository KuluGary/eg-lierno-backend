import { ObjectId } from "mongodb";
declare class MonsterError {
    field: string;
    error: string;
}
declare class MonsterCampaign {
    campaignId: String;
    unlocked: Boolean;
}
declare class MonsterPersonality {
    perosnality: String;
    physical: String;
    backstory: String;
}
declare class MonsterSavingThrows {
    ability: String;
    proficient: Boolean;
    modifier: number;
    modifierStr: String;
}
declare class MonsterSkills {
    ability: String;
    proficient: Boolean;
}
declare class MonsterAbilities {
    name: String;
    description: String;
}
declare class MonsterAbilityScoreModifiers {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
}
declare class MonsterStats {
    size: String;
    race: String;
    alignment: String;
    armorClass: number;
    hitDieSize: number;
    proficiencyBonus: number;
    speed: String;
    abilityScores: MonsterAbilityScoreModifiers;
    savingThrows: [MonsterSavingThrows];
    skills: [MonsterSkills];
    damageVulnerabilities: [String];
    damageResistances: [String];
    damageImmunities: [String];
    conditionImmunities: [String];
    senses: [String];
    langages: [String];
    additionalAbilities: [MonsterAbilities];
    challengeRating: number;
    experiencePoints: number;
    actions: [MonsterAbilities];
    reactions: [MonsterAbilities];
    legendaryActions: [MonsterAbilities];
    legendaryActionsPerRound: number;
    abilityScoreModifiers: MonsterAbilityScoreModifiers;
    armorType: String;
    hitPoints: number;
    extraHealthFromConstitution: number;
    hitPointsStr: String;
    armorTypeStr: String;
    legendaryActionsDescription: String;
    challengeRatingStr: String;
}
declare class MonsterFlavor {
    faction: String;
    gender: String;
    pronoun: String;
    environment: String;
    description: String;
    nameIsProper: Boolean;
    imageUrl: String;
    class: String;
    campaign: [MonsterCampaign];
    personality: [MonsterPersonality];
}
declare class Monster {
    _id: ObjectId;
    name: String;
    flavor: MonsterFlavor;
    stats: MonsterStats;
    createdBy: String;
}
export declare class MonsterResponse {
    errors?: MonsterError[];
    monsters?: Monster[];
}
export {};
