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
exports.CampaignResponse = void 0;
const type_graphql_1 = require("type-graphql");
const mongodb_1 = require("mongodb");
let CampaignError = class CampaignError {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CampaignError.prototype, "field", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CampaignError.prototype, "error", void 0);
CampaignError = __decorate([
    type_graphql_1.ObjectType()
], CampaignError);
let DiscordData = class DiscordData {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], DiscordData.prototype, "main", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], DiscordData.prototype, "privadas", void 0);
DiscordData = __decorate([
    type_graphql_1.ObjectType()
], DiscordData);
let CampaignFlavor = class CampaignFlavor {
};
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], CampaignFlavor.prototype, "game", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], CampaignFlavor.prototype, "synopsis", void 0);
__decorate([
    type_graphql_1.Field((_) => [Diary], { nullable: true }),
    __metadata("design:type", Array)
], CampaignFlavor.prototype, "diary", void 0);
CampaignFlavor = __decorate([
    type_graphql_1.ObjectType()
], CampaignFlavor);
let Diary = class Diary {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Diary.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Diary.prototype, "description", void 0);
Diary = __decorate([
    type_graphql_1.ObjectType()
], Diary);
let Campaign = class Campaign {
};
__decorate([
    type_graphql_1.Field((_) => type_graphql_1.ID),
    __metadata("design:type", typeof (_a = typeof mongodb_1.ObjectId !== "undefined" && mongodb_1.ObjectId) === "function" ? _a : Object)
], Campaign.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Campaign.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", DiscordData)
], Campaign.prototype, "discordData", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], Campaign.prototype, "players", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], Campaign.prototype, "characters", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Campaign.prototype, "dm", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", CampaignFlavor)
], Campaign.prototype, "flavor", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], Campaign.prototype, "completed", void 0);
Campaign = __decorate([
    type_graphql_1.ObjectType()
], Campaign);
let CampaignResponse = class CampaignResponse {
};
__decorate([
    type_graphql_1.Field(() => [CampaignError], { nullable: true }),
    __metadata("design:type", Array)
], CampaignResponse.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(() => [Campaign], { nullable: true }),
    __metadata("design:type", Array)
], CampaignResponse.prototype, "campaigns", void 0);
CampaignResponse = __decorate([
    type_graphql_1.ObjectType()
], CampaignResponse);
exports.CampaignResponse = CampaignResponse;
//# sourceMappingURL=campaign.js.map