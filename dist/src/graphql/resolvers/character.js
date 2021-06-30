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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterResolver = void 0;
const type_graphql_1 = require("type-graphql");
const character_1 = __importDefault(require("../../models/character"));
const campaign_1 = __importDefault(require("../../controllers/campaign"));
const character_2 = require("../schema/character");
let CharacterResolver = class CharacterResolver {
    async get_user_characters({ req }) {
        if (!req.session.userId) {
            return {
                errors: [{ field: "login", error: "No está logueado" }],
            };
        }
        const characters = await character_1.default.find({
            player: req.session.userId,
        });
        return { characters };
    }
    async get_dm_characters({ req }) {
        if (!req.session.userId) {
            return {
                errors: [{ field: "login", error: "No está logueado" }],
            };
        }
        const campaigns = await campaign_1.default.getCampaigns({
            dm: req.session.userId,
        });
        const campaignCharacters = [...new Set(campaigns.map((campaign) => campaign.characters).flat())];
        const characters = await character_1.default.find({
            $and: [{ _id: { $in: campaignCharacters } }, { player: { $ne: req.session.userId } }],
        });
        return { characters };
    }
    async get_characters_by_id(characterIds, { req }) {
        if (!req.session.userId) {
            return {
                errors: [{ field: "login", error: "No está logueado" }],
            };
        }
        const characters = await character_1.default.find({ _id: { $in: characterIds } });
        return { characters };
    }
};
__decorate([
    type_graphql_1.Query(() => character_2.CharacterResponse),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CharacterResolver.prototype, "get_user_characters", null);
__decorate([
    type_graphql_1.Query(() => character_2.CharacterResponse),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CharacterResolver.prototype, "get_dm_characters", null);
__decorate([
    type_graphql_1.Query(() => character_2.CharacterResponse),
    __param(0, type_graphql_1.Arg("characterIds", () => [String], { nullable: true })),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CharacterResolver.prototype, "get_characters_by_id", null);
CharacterResolver = __decorate([
    type_graphql_1.Resolver()
], CharacterResolver);
exports.CharacterResolver = CharacterResolver;
//# sourceMappingURL=character.js.map