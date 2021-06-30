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
exports.ItemResolver = void 0;
const item_1 = __importDefault(require("../../models/item"));
const type_graphql_1 = require("type-graphql");
const item_2 = require("../schema/item");
let ItemResolver = class ItemResolver {
    async get_items({ req }) {
        if (!req.session.userId)
            return {
                errors: [{ field: "login", error: "No está logueado" }],
            };
        const items = await item_1.default.find({ type: "items" });
        return { items };
    }
    async get_weapons({ req }) {
        if (!req.session.userId)
            return {
                errors: [{ field: "login", error: "No está logueado" }],
            };
        const items = await item_1.default.find({ type: "weapons" });
        return { items };
    }
    async get_vehicles({ req }) {
        if (!req.session.userId)
            return {
                errors: [{ field: "login", error: "No está logueado" }],
            };
        const items = await item_1.default.find({ type: "vehicles" });
        return { items };
    }
    async get_armor({ req }) {
        if (!req.session.userId)
            return {
                errors: [{ field: "login", error: "No está logueado" }],
            };
        const items = await item_1.default.find({ type: "armor" });
        return { items };
    }
};
__decorate([
    type_graphql_1.Query(() => item_2.ItemResponse),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ItemResolver.prototype, "get_items", null);
__decorate([
    type_graphql_1.Query(() => item_2.ItemResponse),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ItemResolver.prototype, "get_weapons", null);
__decorate([
    type_graphql_1.Query(() => item_2.ItemResponse),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ItemResolver.prototype, "get_vehicles", null);
__decorate([
    type_graphql_1.Query(() => item_2.ItemResponse),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ItemResolver.prototype, "get_armor", null);
ItemResolver = __decorate([
    type_graphql_1.Resolver()
], ItemResolver);
exports.ItemResolver = ItemResolver;
//# sourceMappingURL=item.js.map