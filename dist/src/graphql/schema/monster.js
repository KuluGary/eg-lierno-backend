"use strict";
// const { gql } = require('apollo-server-express');
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
exports.MonsterResponse = void 0;
// module.exports = gql`
//      extend type Query {
//         getAllMonsters: [Monster]      
//         getMonstersById(monsterIds: [String]): [Monster],
//         getPublicMonsters: [Monster]
//      }     
//  `
const type_graphql_1 = require("type-graphql");
const mongodb_1 = require("mongodb");
let MonsterError = class MonsterError {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], MonsterError.prototype, "field", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], MonsterError.prototype, "error", void 0);
MonsterError = __decorate([
    type_graphql_1.ObjectType()
], MonsterError);
let MonsterCampaign = class MonsterCampaign {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], MonsterCampaign.prototype, "campaignId", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], MonsterCampaign.prototype, "unlocked", void 0);
MonsterCampaign = __decorate([
    type_graphql_1.ObjectType()
], MonsterCampaign);
let MonsterPersonality = class MonsterPersonality {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], MonsterPersonality.prototype, "perosnality", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], MonsterPersonality.prototype, "physical", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], MonsterPersonality.prototype, "backstory", void 0);
MonsterPersonality = __decorate([
    type_graphql_1.ObjectType()
], MonsterPersonality);
let MonsterSavingThrows = class MonsterSavingThrows {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], MonsterSavingThrows.prototype, "ability", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], MonsterSavingThrows.prototype, "proficient", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], MonsterSavingThrows.prototype, "modifier", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], MonsterSavingThrows.prototype, "modifierStr", void 0);
MonsterSavingThrows = __decorate([
    type_graphql_1.ObjectType()
], MonsterSavingThrows);
let MonsterSkills = class MonsterSkills {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], MonsterSkills.prototype, "ability", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], MonsterSkills.prototype, "proficient", void 0);
MonsterSkills = __decorate([
    type_graphql_1.ObjectType()
], MonsterSkills);
let MonsterAbilities = class MonsterAbilities {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], MonsterAbilities.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], MonsterAbilities.prototype, "description", void 0);
MonsterAbilities = __decorate([
    type_graphql_1.ObjectType()
], MonsterAbilities);
let MonsterAbilityScoreModifiers = class MonsterAbilityScoreModifiers {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], MonsterAbilityScoreModifiers.prototype, "strength", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], MonsterAbilityScoreModifiers.prototype, "dexterity", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], MonsterAbilityScoreModifiers.prototype, "constitution", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], MonsterAbilityScoreModifiers.prototype, "intelligence", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], MonsterAbilityScoreModifiers.prototype, "wisdom", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], MonsterAbilityScoreModifiers.prototype, "charisma", void 0);
MonsterAbilityScoreModifiers = __decorate([
    type_graphql_1.ObjectType()
], MonsterAbilityScoreModifiers);
let MonsterStats = class MonsterStats {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], MonsterStats.prototype, "size", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], MonsterStats.prototype, "race", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], MonsterStats.prototype, "alignment", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], MonsterStats.prototype, "armorClass", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], MonsterStats.prototype, "hitDieSize", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], MonsterStats.prototype, "proficiencyBonus", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], MonsterStats.prototype, "speed", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", MonsterAbilityScoreModifiers)
], MonsterStats.prototype, "abilityScores", void 0);
__decorate([
    type_graphql_1.Field(() => [MonsterSavingThrows]),
    __metadata("design:type", Array)
], MonsterStats.prototype, "savingThrows", void 0);
__decorate([
    type_graphql_1.Field(() => [MonsterSkills]),
    __metadata("design:type", Array)
], MonsterStats.prototype, "skills", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], MonsterStats.prototype, "damageVulnerabilities", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], MonsterStats.prototype, "damageResistances", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], MonsterStats.prototype, "damageImmunities", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], MonsterStats.prototype, "conditionImmunities", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], MonsterStats.prototype, "senses", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], MonsterStats.prototype, "langages", void 0);
__decorate([
    type_graphql_1.Field(() => [MonsterAbilities]),
    __metadata("design:type", Array)
], MonsterStats.prototype, "additionalAbilities", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], MonsterStats.prototype, "challengeRating", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], MonsterStats.prototype, "experiencePoints", void 0);
__decorate([
    type_graphql_1.Field(() => [MonsterAbilities]),
    __metadata("design:type", Array)
], MonsterStats.prototype, "actions", void 0);
__decorate([
    type_graphql_1.Field(() => [MonsterAbilities]),
    __metadata("design:type", Array)
], MonsterStats.prototype, "reactions", void 0);
__decorate([
    type_graphql_1.Field(() => [MonsterAbilities]),
    __metadata("design:type", Array)
], MonsterStats.prototype, "legendaryActions", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], MonsterStats.prototype, "legendaryActionsPerRound", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", MonsterAbilityScoreModifiers)
], MonsterStats.prototype, "abilityScoreModifiers", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], MonsterStats.prototype, "armorType", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], MonsterStats.prototype, "hitPoints", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], MonsterStats.prototype, "extraHealthFromConstitution", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], MonsterStats.prototype, "hitPointsStr", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], MonsterStats.prototype, "armorTypeStr", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], MonsterStats.prototype, "legendaryActionsDescription", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], MonsterStats.prototype, "challengeRatingStr", void 0);
MonsterStats = __decorate([
    type_graphql_1.ObjectType()
], MonsterStats);
let MonsterFlavor = class MonsterFlavor {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], MonsterFlavor.prototype, "faction", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], MonsterFlavor.prototype, "gender", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], MonsterFlavor.prototype, "pronoun", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], MonsterFlavor.prototype, "environment", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], MonsterFlavor.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], MonsterFlavor.prototype, "nameIsProper", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], MonsterFlavor.prototype, "imageUrl", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], MonsterFlavor.prototype, "class", void 0);
__decorate([
    type_graphql_1.Field(() => [MonsterCampaign]),
    __metadata("design:type", Array)
], MonsterFlavor.prototype, "campaign", void 0);
__decorate([
    type_graphql_1.Field(() => [MonsterPersonality]),
    __metadata("design:type", Array)
], MonsterFlavor.prototype, "personality", void 0);
MonsterFlavor = __decorate([
    type_graphql_1.ObjectType()
], MonsterFlavor);
let Monster = class Monster {
};
__decorate([
    type_graphql_1.Field((_) => type_graphql_1.ID),
    __metadata("design:type", typeof (_a = typeof mongodb_1.ObjectId !== "undefined" && mongodb_1.ObjectId) === "function" ? _a : Object)
], Monster.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Monster.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(() => MonsterFlavor),
    __metadata("design:type", MonsterFlavor)
], Monster.prototype, "flavor", void 0);
__decorate([
    type_graphql_1.Field(() => MonsterStats),
    __metadata("design:type", MonsterStats)
], Monster.prototype, "stats", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Monster.prototype, "createdBy", void 0);
Monster = __decorate([
    type_graphql_1.ObjectType()
], Monster);
let MonsterResponse = class MonsterResponse {
};
__decorate([
    type_graphql_1.Field(() => [MonsterError], { nullable: true }),
    __metadata("design:type", Array)
], MonsterResponse.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(() => [Monster], { nullable: true }),
    __metadata("design:type", Array)
], MonsterResponse.prototype, "monsters", void 0);
MonsterResponse = __decorate([
    type_graphql_1.ObjectType()
], MonsterResponse);
exports.MonsterResponse = MonsterResponse;
//# sourceMappingURL=monster.js.map