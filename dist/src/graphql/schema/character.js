"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterResponse = exports.CharacterError = void 0;
const type_graphql_1 = require("type-graphql");
const mongodb_1 = require("mongodb");
let CharacterError = class CharacterError {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CharacterError.prototype, "field", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CharacterError.prototype, "error", void 0);
CharacterError = __decorate([
    type_graphql_1.ObjectType()
], CharacterError);
exports.CharacterError = CharacterError;
let Traits = class Traits {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Traits.prototype, "gender", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Traits.prototype, "pronoun", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Traits.prototype, "age", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Traits.prototype, "eyes", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Traits.prototype, "weight", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Traits.prototype, "hair", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Traits.prototype, "skin", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Traits.prototype, "height", void 0);
Traits = __decorate([
    type_graphql_1.ObjectType()
], Traits);
let CharacterPersonality = class CharacterPersonality {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CharacterPersonality.prototype, "personalityTraits", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CharacterPersonality.prototype, "ideals", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CharacterPersonality.prototype, "bonds", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CharacterPersonality.prototype, "flaws", void 0);
CharacterPersonality = __decorate([
    type_graphql_1.ObjectType()
], CharacterPersonality);
let CharacterBackground = class CharacterBackground {
};
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], CharacterBackground.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], CharacterBackground.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], CharacterBackground.prototype, "trait", void 0);
CharacterBackground = __decorate([
    type_graphql_1.ObjectType()
], CharacterBackground);
let CharacterRace = class CharacterRace {
};
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], CharacterRace.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], CharacterRace.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(() => [Subrace]),
    __metadata("design:type", Array)
], CharacterRace.prototype, "subrace", void 0);
CharacterRace = __decorate([
    type_graphql_1.ObjectType()
], CharacterRace);
let Subrace = class Subrace {
};
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], Subrace.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], Subrace.prototype, "description", void 0);
Subrace = __decorate([
    type_graphql_1.ObjectType()
], Subrace);
let CharacterAbilityScores = class CharacterAbilityScores {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], CharacterAbilityScores.prototype, "strength", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], CharacterAbilityScores.prototype, "dexterity", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], CharacterAbilityScores.prototype, "constitution", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], CharacterAbilityScores.prototype, "intelligence", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], CharacterAbilityScores.prototype, "wisdom", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], CharacterAbilityScores.prototype, "charisma", void 0);
CharacterAbilityScores = __decorate([
    type_graphql_1.ObjectType()
], CharacterAbilityScores);
let CharacterSkills = class CharacterSkills {
};
__decorate([
    type_graphql_1.Field(() => [CharacterSkill]),
    __metadata("design:type", Array)
], CharacterSkills.prototype, "acrobatics", void 0);
__decorate([
    type_graphql_1.Field(() => [CharacterSkill]),
    __metadata("design:type", Array)
], CharacterSkills.prototype, "animal_handling", void 0);
__decorate([
    type_graphql_1.Field(() => [CharacterSkill]),
    __metadata("design:type", Array)
], CharacterSkills.prototype, "arcana", void 0);
__decorate([
    type_graphql_1.Field(() => [CharacterSkill]),
    __metadata("design:type", Array)
], CharacterSkills.prototype, "athletics", void 0);
__decorate([
    type_graphql_1.Field(() => [CharacterSkill]),
    __metadata("design:type", Array)
], CharacterSkills.prototype, "deception", void 0);
__decorate([
    type_graphql_1.Field(() => [CharacterSkill]),
    __metadata("design:type", Array)
], CharacterSkills.prototype, "history", void 0);
__decorate([
    type_graphql_1.Field(() => [CharacterSkill]),
    __metadata("design:type", Array)
], CharacterSkills.prototype, "insight", void 0);
__decorate([
    type_graphql_1.Field(() => [CharacterSkill]),
    __metadata("design:type", Array)
], CharacterSkills.prototype, "intimidation", void 0);
__decorate([
    type_graphql_1.Field(() => [CharacterSkill]),
    __metadata("design:type", Array)
], CharacterSkills.prototype, "investigation", void 0);
__decorate([
    type_graphql_1.Field(() => [CharacterSkill]),
    __metadata("design:type", Array)
], CharacterSkills.prototype, "medicine", void 0);
__decorate([
    type_graphql_1.Field(() => [CharacterSkill]),
    __metadata("design:type", Array)
], CharacterSkills.prototype, "nature", void 0);
__decorate([
    type_graphql_1.Field(() => [CharacterSkill]),
    __metadata("design:type", Array)
], CharacterSkills.prototype, "perception", void 0);
__decorate([
    type_graphql_1.Field(() => [CharacterSkill]),
    __metadata("design:type", Array)
], CharacterSkills.prototype, "performance", void 0);
__decorate([
    type_graphql_1.Field(() => [CharacterSkill]),
    __metadata("design:type", Array)
], CharacterSkills.prototype, "persuasion", void 0);
__decorate([
    type_graphql_1.Field(() => [CharacterSkill]),
    __metadata("design:type", Array)
], CharacterSkills.prototype, "religion", void 0);
__decorate([
    type_graphql_1.Field(() => [CharacterSkill]),
    __metadata("design:type", Array)
], CharacterSkills.prototype, "sleight_of_hand", void 0);
__decorate([
    type_graphql_1.Field(() => [CharacterSkill]),
    __metadata("design:type", Array)
], CharacterSkills.prototype, "stealth", void 0);
__decorate([
    type_graphql_1.Field(() => [CharacterSkill]),
    __metadata("design:type", Array)
], CharacterSkills.prototype, "survival", void 0);
CharacterSkills = __decorate([
    type_graphql_1.ObjectType()
], CharacterSkills);
let CharacterSkill = class CharacterSkill {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CharacterSkill.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CharacterSkill.prototype, "modifier", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], CharacterSkill.prototype, "proficient", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], CharacterSkill.prototype, "expertise", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CharacterSkill.prototype, "description", void 0);
CharacterSkill = __decorate([
    type_graphql_1.ObjectType()
], CharacterSkill);
let CharacterHitpoints = class CharacterHitpoints {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], CharacterHitpoints.prototype, "hp_current", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], CharacterHitpoints.prototype, "hp_max", void 0);
CharacterHitpoints = __decorate([
    type_graphql_1.ObjectType()
], CharacterHitpoints);
let CharacterAction = class CharacterAction {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CharacterAction.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CharacterAction.prototype, "description", void 0);
CharacterAction = __decorate([
    type_graphql_1.ObjectType()
], CharacterAction);
let CharacterAttack = class CharacterAttack {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CharacterAttack.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], CharacterAttack.prototype, "proficient", void 0);
__decorate([
    type_graphql_1.Field(() => [CharacterAttackData]),
    __metadata("design:type", Array)
], CharacterAttack.prototype, "data", void 0);
CharacterAttack = __decorate([
    type_graphql_1.ObjectType()
], CharacterAttack);
let CharacterAttackData = class CharacterAttackData {
};
__decorate([
    type_graphql_1.Field(() => [CharacterAttackDamage]),
    __metadata("design:type", Array)
], CharacterAttackData.prototype, "damage", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], CharacterAttackData.prototype, "properties", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CharacterAttackData.prototype, "type", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CharacterAttackData.prototype, "range", void 0);
CharacterAttackData = __decorate([
    type_graphql_1.ObjectType()
], CharacterAttackData);
let CharacterAttackDamage = class CharacterAttackDamage {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CharacterAttackDamage.prototype, "die", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CharacterAttackDamage.prototype, "type", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CharacterAttackDamage.prototype, "properties", void 0);
CharacterAttackDamage = __decorate([
    type_graphql_1.ObjectType()
], CharacterAttackDamage);
let CharacterEquipment = class CharacterEquipment {
};
__decorate([
    type_graphql_1.Field(() => [CharacterItems]),
    __metadata("design:type", Array)
], CharacterEquipment.prototype, "items", void 0);
__decorate([
    type_graphql_1.Field(() => [CharacterItems]),
    __metadata("design:type", Array)
], CharacterEquipment.prototype, "armor", void 0);
__decorate([
    type_graphql_1.Field(() => [CharacterItems]),
    __metadata("design:type", Array)
], CharacterEquipment.prototype, "magicItems", void 0);
__decorate([
    type_graphql_1.Field(() => [CharacterItems]),
    __metadata("design:type", Array)
], CharacterEquipment.prototype, "weapons", void 0);
__decorate([
    type_graphql_1.Field(() => [CharacterItems]),
    __metadata("design:type", Array)
], CharacterEquipment.prototype, "vehicles", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], CharacterEquipment.prototype, "rations", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], CharacterEquipment.prototype, "waterskin", void 0);
CharacterEquipment = __decorate([
    type_graphql_1.ObjectType()
], CharacterEquipment);
let CharacterItems = class CharacterItems {
};
__decorate([
    type_graphql_1.Field((_) => type_graphql_1.ID),
    __metadata("design:type", String)
], CharacterItems.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], CharacterItems.prototype, "equipped", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], CharacterItems.prototype, "quantity", void 0);
CharacterItems = __decorate([
    type_graphql_1.ObjectType()
], CharacterItems);
let CharacterSavingThrow = class CharacterSavingThrow {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], CharacterSavingThrow.prototype, "proficient", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], CharacterSavingThrow.prototype, "expertise", void 0);
CharacterSavingThrow = __decorate([
    type_graphql_1.ObjectType()
], CharacterSavingThrow);
let CharacterSavingThrows = class CharacterSavingThrows {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", CharacterSavingThrow)
], CharacterSavingThrows.prototype, "strength", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", CharacterSavingThrow)
], CharacterSavingThrows.prototype, "dexterity", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", CharacterSavingThrow)
], CharacterSavingThrows.prototype, "constitution", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", CharacterSavingThrow)
], CharacterSavingThrows.prototype, "intelligence", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", CharacterSavingThrow)
], CharacterSavingThrows.prototype, "wisdom", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", CharacterSavingThrow)
], CharacterSavingThrows.prototype, "charisma", void 0);
CharacterSavingThrows = __decorate([
    type_graphql_1.ObjectType()
], CharacterSavingThrows);
let CharacterClasses = class CharacterClasses {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CharacterClasses.prototype, "className", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CharacterClasses.prototype, "subclassName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], CharacterClasses.prototype, "classLevel", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], CharacterClasses.prototype, "hitDie", void 0);
__decorate([
    type_graphql_1.Field((_) => type_graphql_1.ID),
    __metadata("design:type", String)
], CharacterClasses.prototype, "classId", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CharacterClasses.prototype, "subclassDescription", void 0);
CharacterClasses = __decorate([
    type_graphql_1.ObjectType()
], CharacterClasses);
let CharacterSpells = class CharacterSpells {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CharacterSpells.prototype, "spellId", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], CharacterSpells.prototype, "prepared", void 0);
CharacterSpells = __decorate([
    type_graphql_1.ObjectType()
], CharacterSpells);
let CharacterPortrait = class CharacterPortrait {
};
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], CharacterPortrait.prototype, "avatar", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], CharacterPortrait.prototype, "token", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CharacterPortrait.prototype, "original", void 0);
CharacterPortrait = __decorate([
    type_graphql_1.ObjectType()
], CharacterPortrait);
let CharacterFlavor = class CharacterFlavor {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CharacterFlavor.prototype, "faction", void 0);
__decorate([
    type_graphql_1.Field(() => Traits, { nullable: true }),
    __metadata("design:type", Traits)
], CharacterFlavor.prototype, "traits", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], CharacterFlavor.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(() => [CharacterPersonality]),
    __metadata("design:type", Array)
], CharacterFlavor.prototype, "personality", void 0);
__decorate([
    type_graphql_1.Field(() => CharacterPortrait, { nullable: true }),
    __metadata("design:type", CharacterPortrait)
], CharacterFlavor.prototype, "portrait", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], CharacterFlavor.prototype, "psychologicalDescription", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], CharacterFlavor.prototype, "physicalDescription", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], CharacterFlavor.prototype, "backstory", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], CharacterFlavor.prototype, "class", void 0);
CharacterFlavor = __decorate([
    type_graphql_1.ObjectType()
], CharacterFlavor);
let CharacterStats = class CharacterStats {
};
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], CharacterStats.prototype, "aligment", void 0);
__decorate([
    type_graphql_1.Field(() => CharacterBackground, { nullable: true }),
    __metadata("design:type", CharacterBackground)
], CharacterStats.prototype, "background", void 0);
__decorate([
    type_graphql_1.Field(() => CharacterRace, { nullable: true }),
    __metadata("design:type", CharacterRace)
], CharacterStats.prototype, "race", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], CharacterStats.prototype, "armorClass", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], CharacterStats.prototype, "speed", void 0);
__decorate([
    type_graphql_1.Field(() => [CharacterAbilityScores]),
    __metadata("design:type", Array)
], CharacterStats.prototype, "abilityScores", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], CharacterStats.prototype, "proficiencyBonus", void 0);
__decorate([
    type_graphql_1.Field(() => [CharacterSkills]),
    __metadata("design:type", Array)
], CharacterStats.prototype, "skills", void 0);
__decorate([
    type_graphql_1.Field(() => [CharacterHitpoints]),
    __metadata("design:type", Array)
], CharacterStats.prototype, "hitPoints", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], CharacterStats.prototype, "initiativeBonus", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], CharacterStats.prototype, "passivePerception", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], CharacterStats.prototype, "experience", void 0);
__decorate([
    type_graphql_1.Field(() => [CharacterAction]),
    __metadata("design:type", Array)
], CharacterStats.prototype, "actions", void 0);
__decorate([
    type_graphql_1.Field(() => [CharacterAction]),
    __metadata("design:type", Array)
], CharacterStats.prototype, "bonusActions", void 0);
__decorate([
    type_graphql_1.Field(() => [CharacterAttack]),
    __metadata("design:type", Array)
], CharacterStats.prototype, "attacks", void 0);
__decorate([
    type_graphql_1.Field(() => [CharacterAction]),
    __metadata("design:type", Array)
], CharacterStats.prototype, "additionalAbilities", void 0);
__decorate([
    type_graphql_1.Field(() => [CharacterAction]),
    __metadata("design:type", Array)
], CharacterStats.prototype, "reactions", void 0);
__decorate([
    type_graphql_1.Field(() => [CharacterSpells]),
    __metadata("design:type", Array)
], CharacterStats.prototype, "spells", void 0);
__decorate([
    type_graphql_1.Field(() => [CharacterEquipment]),
    __metadata("design:type", Array)
], CharacterStats.prototype, "equipment", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CharacterStats.prototype, "proficiencies", void 0);
__decorate([
    type_graphql_1.Field(() => [CharacterSavingThrows]),
    __metadata("design:type", Array)
], CharacterStats.prototype, "savingThrows", void 0);
__decorate([
    type_graphql_1.Field(() => [CharacterClasses], { nullable: true }),
    __metadata("design:type", Array)
], CharacterStats.prototype, "classes", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], CharacterStats.prototype, "stress", void 0);
CharacterStats = __decorate([
    type_graphql_1.ObjectType()
], CharacterStats);
let Character = class Character {
};
__decorate([
    type_graphql_1.Field((_) => type_graphql_1.ID),
    __metadata("design:type", typeof (_a = typeof mongodb_1.ObjectId !== "undefined" && mongodb_1.ObjectId) === "function" ? _a : Object)
], Character.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field((_) => type_graphql_1.ID),
    __metadata("design:type", String)
], Character.prototype, "player", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", CharacterFlavor)
], Character.prototype, "flavor", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", CharacterStats)
], Character.prototype, "stats", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Character.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Character.prototype, "type", void 0);
Character = __decorate([
    type_graphql_1.ObjectType()
], Character);
let CharacterResponse = class CharacterResponse {
};
__decorate([
    type_graphql_1.Field(() => [CharacterError], { nullable: true }),
    __metadata("design:type", Array)
], CharacterResponse.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(() => [Character], { nullable: true }),
    __metadata("design:type", Array)
], CharacterResponse.prototype, "characters", void 0);
CharacterResponse = __decorate([
    type_graphql_1.ObjectType()
], CharacterResponse);
exports.CharacterResponse = CharacterResponse;
//# sourceMappingURL=character.js.map