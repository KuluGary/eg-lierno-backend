import { ObjectId } from "mongodb";
declare class NpcError {
    field: string;
    error: string;
}
declare class NpcCampaign {
    campaignId: String;
    unlocked: Boolean;
}
declare class NpcPersonality {
    perosnality: String;
    physical: String;
    backstory: String;
}
declare class NpcSavingThrows {
    ability: String;
    proficient: Boolean;
    modifier: number;
    modifierStr: String;
}
declare class NpcSkills {
    ability: String;
    proficient: Boolean;
}
declare class NpcAbilities {
    name: String;
    description: String;
}
declare class NpcAbilityScoreModifiers {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
}
export declare class NpcStats {
    size: String;
    race: String;
    alignment: String;
    armorClass: number;
    hitDieSize: number;
    proficiencyBonus: number;
    speed: String;
    abilityScores: NpcAbilityScoreModifiers;
    savingThrows: [NpcSavingThrows];
    skills: [NpcSkills];
    damageVulnerabilities: [String];
    damageResistances: [String];
    damageImmunities: [String];
    conditionImmunities: [String];
    senses: [String];
    langages: [String];
    additionalAbilities: [NpcAbilities];
    challengeRating: number;
    experiencePoints: number;
    actions: [NpcAbilities];
    reactions: [NpcAbilities];
    legendaryActions: [NpcAbilities];
    legendaryActionsPerRound: number;
    abilityScoreModifiers: NpcAbilityScoreModifiers;
    armorType: String;
    hitPoints: number;
    extraHealthFromConstitution: number;
    hitPointsStr: String;
    armorTypeStr: String;
    legendaryActionsDescription: String;
    challengeRatingStr: String;
}
declare class NpcPortrait {
    avatar?: String;
    token?: String;
    original: String;
}
export declare class NpcFlavor {
    faction: String;
    gender: String;
    pronoun: String;
    environment: String;
    description: String;
    nameIsProper: Boolean;
    class: String;
    campaign: [NpcCampaign];
    personality: [NpcPersonality];
    portrait: NpcPortrait;
}
declare class Npc {
    _id: ObjectId;
    name: String;
    flavor: NpcFlavor;
    stats: NpcStats;
    createdBy: String;
}
export declare class NpcResponse {
    errors?: NpcError[];
    npcs?: Npc[];
}
export {};
