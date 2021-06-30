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
exports.SpellResponse = void 0;
const type_graphql_1 = require("type-graphql");
const mongodb_1 = require("mongodb");
let SpellError = class SpellError {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], SpellError.prototype, "field", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], SpellError.prototype, "error", void 0);
SpellError = __decorate([
    type_graphql_1.ObjectType()
], SpellError);
let SpellComponents = class SpellComponents {
};
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], SpellComponents.prototype, "type", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], SpellComponents.prototype, "description", void 0);
SpellComponents = __decorate([
    type_graphql_1.ObjectType()
], SpellComponents);
let SpellStats = class SpellStats {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], SpellStats.prototype, "level", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], SpellStats.prototype, "school", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], SpellStats.prototype, "castingTime", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], SpellStats.prototype, "range", void 0);
__decorate([
    type_graphql_1.Field(() => SpellComponents),
    __metadata("design:type", SpellComponents)
], SpellStats.prototype, "components", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], SpellStats.prototype, "duration", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], SpellStats.prototype, "description", void 0);
SpellStats = __decorate([
    type_graphql_1.ObjectType()
], SpellStats);
let Spell = class Spell {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    __metadata("design:type", typeof (_a = typeof mongodb_1.ObjectId !== "undefined" && mongodb_1.ObjectId) === "function" ? _a : Object)
], Spell.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Spell.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", SpellStats)
], Spell.prototype, "stats", void 0);
Spell = __decorate([
    type_graphql_1.ObjectType()
], Spell);
let SpellResponse = class SpellResponse {
};
__decorate([
    type_graphql_1.Field(() => [SpellError], { nullable: true }),
    __metadata("design:type", Array)
], SpellResponse.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(() => [Spell], { nullable: true }),
    __metadata("design:type", Array)
], SpellResponse.prototype, "spells", void 0);
SpellResponse = __decorate([
    type_graphql_1.ObjectType()
], SpellResponse);
exports.SpellResponse = SpellResponse;
//# sourceMappingURL=spell.js.map