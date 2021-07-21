import { ObjectId } from "mongodb";
export declare class CharacterError {
    field: string;
    error: string;
}
declare class Traits {
    gender: String;
    pronoun: String;
    age: String;
    eyes: String;
    weight: String;
    hair: String;
    skin: String;
    height: String;
}
declare class CharacterPersonality {
    personalityTraits: String;
    ideals: String;
    bonds: String;
    flaws: String;
}
declare class CharacterBackground {
    name: String;
    description: String;
    trait: String;
}
declare class CharacterRace {
    name: String;
    description: String;
    subrace: [Subrace];
}
declare class Subrace {
    name: String;
    description: String;
}
declare class CharacterAbilityScores {
    strength: Number;
    dexterity: Number;
    constitution: Number;
    intelligence: Number;
    wisdom: Number;
    charisma: Number;
}
declare class CharacterSkills {
    acrobatics: [CharacterSkill];
    animal_handling: [CharacterSkill];
    arcana: [CharacterSkill];
    athletics: [CharacterSkill];
    deception: [CharacterSkill];
    history: [CharacterSkill];
    insight: [CharacterSkill];
    intimidation: [CharacterSkill];
    investigation: [CharacterSkill];
    medicine: [CharacterSkill];
    nature: [CharacterSkill];
    perception: [CharacterSkill];
    performance: [CharacterSkill];
    persuasion: [CharacterSkill];
    religion: [CharacterSkill];
    sleight_of_hand: [CharacterSkill];
    stealth: [CharacterSkill];
    survival: [CharacterSkill];
}
declare class CharacterSkill {
    name: String;
    modifier: String;
    proficient: Boolean;
    expertise: Boolean;
    description: String;
}
declare class CharacterHitpoints {
    hp_current: Number;
    hp_max: Number;
}
declare class CharacterAction {
    name: String;
    description: String;
}
declare class CharacterAttack {
    name: String;
    proficient: Boolean;
    data: [CharacterAttackData];
}
declare class CharacterAttackData {
    damage: [CharacterAttackDamage];
    properties: [String];
    type: String;
    range: String;
}
declare class CharacterAttackDamage {
    die: String;
    type: String;
    properties: String;
}
declare class CharacterEquipment {
    items: [CharacterItems];
    armor: [CharacterItems];
    magicItems: [CharacterItems];
    weapons: [CharacterItems];
    vehicles: [CharacterItems];
    rations: Number;
    waterskin: Number;
}
declare class CharacterItems {
    id: String;
    equipped: Boolean;
    quantity: Number;
}
declare class CharacterSavingThrow {
    proficient: Boolean;
    expertise: Boolean;
}
declare class CharacterSavingThrows {
    strength: CharacterSavingThrow;
    dexterity: CharacterSavingThrow;
    constitution: CharacterSavingThrow;
    intelligence: CharacterSavingThrow;
    wisdom: CharacterSavingThrow;
    charisma: CharacterSavingThrow;
}
declare class CharacterClasses {
    className: String;
    subclassName: String;
    classLevel: Number;
    hitDie: Number;
    classId: String;
    subclassDescription: String;
}
declare class CharacterSpells {
    spellId: String;
    prepared: Boolean;
}
declare class CharacterPortrait {
    avatar?: String;
    token?: String;
    original: String;
}
declare class CharacterFlavor {
    faction: String;
    traits: Traits;
    description: String;
    personality: [CharacterPersonality];
    portrait: CharacterPortrait;
    psychologicalDescription: String;
    physicalDescription: String;
    backstory: String;
    class: String;
}
declare class CharacterStats {
    aligment: String;
    background: CharacterBackground;
    race: CharacterRace;
    armorClass: Number;
    speed: Number;
    abilityScores: [CharacterAbilityScores];
    proficiencyBonus: Number;
    skills: [CharacterSkills];
    hitPoints: [CharacterHitpoints];
    initiativeBonus: Number;
    passivePerception: Number;
    experience: Number;
    actions: [CharacterAction];
    bonusActions: [CharacterAction];
    attacks: [CharacterAttack];
    additionalAbilities: [CharacterAction];
    reactions: [CharacterAction];
    spells: [CharacterSpells];
    equipment: [CharacterEquipment];
    proficiencies: String;
    savingThrows: [CharacterSavingThrows];
    classes: [CharacterClasses];
    stress: Number;
}
declare class Character {
    _id?: ObjectId;
    player: String;
    flavor: CharacterFlavor;
    stats: CharacterStats;
    name: String;
    type: String;
}
export declare class CharacterResponse {
    errors?: CharacterError[];
    characters?: Character[];
}
export {};
