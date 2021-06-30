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
exports.SpellResolver = void 0;
const spell_1 = __importDefault(require("../../models/spell"));
const type_graphql_1 = require("type-graphql");
const spell_2 = require("../schema/spell");
let SpellResolver = class SpellResolver {
    async get_spells({ req }) {
        if (!req.session.userId)
            return { errors: [{ field: "login", error: "No está logueado" }] };
        const spells = await spell_1.default.find({});
        return { spells };
    }
};
__decorate([
    type_graphql_1.Query(() => spell_2.SpellResponse),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SpellResolver.prototype, "get_spells", null);
SpellResolver = __decorate([
    type_graphql_1.Resolver()
], SpellResolver);
exports.SpellResolver = SpellResolver;
//# sourceMappingURL=spell.js.map