"use strict";
// const Npc = require("../../models/npc");
// const Controller = require("../../controllers/npc")
// const { ApolloError } = require('apollo-server-express');
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
exports.NpcResolver = void 0;
const npc_1 = __importDefault(require("../../models/npc"));
const type_graphql_1 = require("type-graphql");
const npc_2 = require("../schema/npc");
// module.exports = {
//     getAllNpcs: () => Npc.find({ }),
//     getNpcsById: (_, { npcIds }) => {
//         try {
//             return Npc.find({ "_id": { $in: npcIds } });
//         } catch (error) {
//             throw new ApolloError(`Error al recuperar los personajes.`)
//         }
//     },
//     getPublicNpcs: () => {
//         try {
//             return Controller.getPublicNpc()
//         } catch(e)  {
//             throw new ApolloError(`Error al recuperar los personajes.`)
//         }
//     }
// }
let NpcResolver = class NpcResolver {
    async get_npcs_by_id({ req }, npcIds) {
        if (!req.session.userId) {
            return {
                errors: [{ field: "login", error: "No está logueado" }],
            };
        }
        const npcs = await npc_1.default.find({ _id: { $in: npcIds } });
        return { npcs };
    }
};
__decorate([
    type_graphql_1.Query(() => npc_2.NpcResponse),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("npcIds", () => [String], { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NpcResolver.prototype, "get_npcs_by_id", null);
NpcResolver = __decorate([
    type_graphql_1.Resolver()
], NpcResolver);
exports.NpcResolver = NpcResolver;
//# sourceMappingURL=npc.js.map