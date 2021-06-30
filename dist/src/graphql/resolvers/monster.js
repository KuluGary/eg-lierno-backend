"use strict";
// const Monster = require("../../models/monster");
// const Controller = require("../../controllers/monster");
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
exports.MonsterResolver = void 0;
const monster_1 = __importDefault(require("../../models/monster"));
const type_graphql_1 = require("type-graphql");
const monster_2 = require("../schema/monster");
// module.exports = {
//     getAllMonsters: () => Monster.find({ }),
//     getMonstersById: (_, { monsterIds }) => {
//         try {
//             return Monster.find({ "_id": { $in: monsterIds } });
//         } catch (error) {
//             throw new ApolloError(`Error al recuperar los monstruos.`)
//         }
//     },
//     getPublicMonsters: () => {
//         try {
//             return Controller.getPublicMonster();
//         } catch (error) {
//             throw new ApolloError(`Error al recuperar los monstruos.`)
//         }
//     }
// }
let MonsterResolver = class MonsterResolver {
    async get_monsters_by_id({ req }, monsterIds) {
        if (!req.session.userId) {
            return {
                errors: [{ field: "login", error: "No está logueado" }],
            };
        }
        const monsters = await monster_1.default.find({ _id: { $in: monsterIds } });
        return { monsters };
    }
};
__decorate([
    type_graphql_1.Query(() => monster_2.MonsterResponse),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("monsterIds", () => [String], { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MonsterResolver.prototype, "get_monsters_by_id", null);
MonsterResolver = __decorate([
    type_graphql_1.Resolver()
], MonsterResolver);
exports.MonsterResolver = MonsterResolver;
//# sourceMappingURL=monster.js.map