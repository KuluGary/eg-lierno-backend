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
exports.NpcResponse = exports.NpcFlavor = exports.NpcStats = void 0;
const type_graphql_1 = require("type-graphql");
const mongodb_1 = require("mongodb");
let NpcError = class NpcError {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NpcError.prototype, "field", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NpcError.prototype, "error", void 0);
NpcError = __decorate([
    type_graphql_1.ObjectType()
], NpcError);
let NpcCampaign = class NpcCampaign {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NpcCampaign.prototype, "campaignId", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], NpcCampaign.prototype, "unlocked", void 0);
NpcCampaign = __decorate([
    type_graphql_1.ObjectType()
], NpcCampaign);
let NpcPersonality = class NpcPersonality {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NpcPersonality.prototype, "perosnality", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NpcPersonality.prototype, "physical", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NpcPersonality.prototype, "backstory", void 0);
NpcPersonality = __decorate([
    type_graphql_1.ObjectType()
], NpcPersonality);
let NpcSavingThrows = class NpcSavingThrows {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NpcSavingThrows.prototype, "ability", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], NpcSavingThrows.prototype, "proficient", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], NpcSavingThrows.prototype, "modifier", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NpcSavingThrows.prototype, "modifierStr", void 0);
NpcSavingThrows = __decorate([
    type_graphql_1.ObjectType()
], NpcSavingThrows);
let NpcSkills = class NpcSkills {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NpcSkills.prototype, "ability", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], NpcSkills.prototype, "proficient", void 0);
NpcSkills = __decorate([
    type_graphql_1.ObjectType()
], NpcSkills);
let NpcAbilities = class NpcAbilities {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NpcAbilities.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NpcAbilities.prototype, "description", void 0);
NpcAbilities = __decorate([
    type_graphql_1.ObjectType()
], NpcAbilities);
let NpcAbilityScoreModifiers = class NpcAbilityScoreModifiers {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], NpcAbilityScoreModifiers.prototype, "strength", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], NpcAbilityScoreModifiers.prototype, "dexterity", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], NpcAbilityScoreModifiers.prototype, "constitution", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], NpcAbilityScoreModifiers.prototype, "intelligence", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], NpcAbilityScoreModifiers.prototype, "wisdom", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], NpcAbilityScoreModifiers.prototype, "charisma", void 0);
NpcAbilityScoreModifiers = __decorate([
    type_graphql_1.ObjectType()
], NpcAbilityScoreModifiers);
let NpcStats = class NpcStats {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NpcStats.prototype, "size", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NpcStats.prototype, "race", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NpcStats.prototype, "alignment", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], NpcStats.prototype, "armorClass", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], NpcStats.prototype, "hitDieSize", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], NpcStats.prototype, "proficiencyBonus", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NpcStats.prototype, "speed", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", NpcAbilityScoreModifiers)
], NpcStats.prototype, "abilityScores", void 0);
__decorate([
    type_graphql_1.Field(() => [NpcSavingThrows]),
    __metadata("design:type", Array)
], NpcStats.prototype, "savingThrows", void 0);
__decorate([
    type_graphql_1.Field(() => [NpcSkills]),
    __metadata("design:type", Array)
], NpcStats.prototype, "skills", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], NpcStats.prototype, "damageVulnerabilities", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], NpcStats.prototype, "damageResistances", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], NpcStats.prototype, "damageImmunities", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], NpcStats.prototype, "conditionImmunities", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], NpcStats.prototype, "senses", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], NpcStats.prototype, "langages", void 0);
__decorate([
    type_graphql_1.Field(() => [NpcAbilities]),
    __metadata("design:type", Array)
], NpcStats.prototype, "additionalAbilities", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], NpcStats.prototype, "challengeRating", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], NpcStats.prototype, "experiencePoints", void 0);
__decorate([
    type_graphql_1.Field(() => [NpcAbilities]),
    __metadata("design:type", Array)
], NpcStats.prototype, "actions", void 0);
__decorate([
    type_graphql_1.Field(() => [NpcAbilities]),
    __metadata("design:type", Array)
], NpcStats.prototype, "reactions", void 0);
__decorate([
    type_graphql_1.Field(() => [NpcAbilities]),
    __metadata("design:type", Array)
], NpcStats.prototype, "legendaryActions", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], NpcStats.prototype, "legendaryActionsPerRound", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", NpcAbilityScoreModifiers)
], NpcStats.prototype, "abilityScoreModifiers", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NpcStats.prototype, "armorType", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], NpcStats.prototype, "hitPoints", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], NpcStats.prototype, "extraHealthFromConstitution", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NpcStats.prototype, "hitPointsStr", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NpcStats.prototype, "armorTypeStr", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NpcStats.prototype, "legendaryActionsDescription", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NpcStats.prototype, "challengeRatingStr", void 0);
NpcStats = __decorate([
    type_graphql_1.ObjectType()
], NpcStats);
exports.NpcStats = NpcStats;
let NpcPortrait = class NpcPortrait {
};
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], NpcPortrait.prototype, "avatar", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], NpcPortrait.prototype, "token", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NpcPortrait.prototype, "original", void 0);
NpcPortrait = __decorate([
    type_graphql_1.ObjectType()
], NpcPortrait);
let NpcFlavor = class NpcFlavor {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NpcFlavor.prototype, "faction", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NpcFlavor.prototype, "gender", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NpcFlavor.prototype, "pronoun", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NpcFlavor.prototype, "environment", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NpcFlavor.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], NpcFlavor.prototype, "nameIsProper", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NpcFlavor.prototype, "class", void 0);
__decorate([
    type_graphql_1.Field(() => [NpcCampaign]),
    __metadata("design:type", Array)
], NpcFlavor.prototype, "campaign", void 0);
__decorate([
    type_graphql_1.Field(() => [NpcPersonality]),
    __metadata("design:type", Array)
], NpcFlavor.prototype, "personality", void 0);
__decorate([
    type_graphql_1.Field(() => NpcPortrait, { nullable: true }),
    __metadata("design:type", NpcPortrait)
], NpcFlavor.prototype, "portrait", void 0);
NpcFlavor = __decorate([
    type_graphql_1.ObjectType()
], NpcFlavor);
exports.NpcFlavor = NpcFlavor;
let Npc = class Npc {
};
__decorate([
    type_graphql_1.Field((_) => type_graphql_1.ID),
    __metadata("design:type", typeof (_a = typeof mongodb_1.ObjectId !== "undefined" && mongodb_1.ObjectId) === "function" ? _a : Object)
], Npc.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Npc.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(() => NpcFlavor),
    __metadata("design:type", NpcFlavor)
], Npc.prototype, "flavor", void 0);
__decorate([
    type_graphql_1.Field(() => NpcStats),
    __metadata("design:type", NpcStats)
], Npc.prototype, "stats", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Npc.prototype, "createdBy", void 0);
Npc = __decorate([
    type_graphql_1.ObjectType()
], Npc);
let NpcResponse = class NpcResponse {
};
__decorate([
    type_graphql_1.Field(() => [NpcError], { nullable: true }),
    __metadata("design:type", Array)
], NpcResponse.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(() => [Npc], { nullable: true }),
    __metadata("design:type", Array)
], NpcResponse.prototype, "npcs", void 0);
NpcResponse = __decorate([
    type_graphql_1.ObjectType()
], NpcResponse);
exports.NpcResponse = NpcResponse;
//# sourceMappingURL=npc.js.map