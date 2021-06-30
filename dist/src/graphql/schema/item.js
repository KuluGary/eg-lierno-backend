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
exports.ItemResponse = void 0;
const type_graphql_1 = require("type-graphql");
const mongodb_1 = require("mongodb");
let ItemError = class ItemError {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ItemError.prototype, "field", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ItemError.prototype, "error", void 0);
ItemError = __decorate([
    type_graphql_1.ObjectType()
], ItemError);
let ItemImage = class ItemImage {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ItemImage.prototype, "small", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ItemImage.prototype, "large", void 0);
ItemImage = __decorate([
    type_graphql_1.ObjectType()
], ItemImage);
let ItemProperties = class ItemProperties {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ItemProperties.prototype, "key", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ItemProperties.prototype, "value", void 0);
ItemProperties = __decorate([
    type_graphql_1.ObjectType()
], ItemProperties);
let Item = class Item {
};
__decorate([
    type_graphql_1.Field((_) => type_graphql_1.ID),
    __metadata("design:type", typeof (_a = typeof mongodb_1.ObjectId !== "undefined" && mongodb_1.ObjectId) === "function" ? _a : Object)
], Item.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Item.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Item.prototype, "type", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", ItemImage)
], Item.prototype, "image", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Item.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field((_) => [ItemProperties], { nullable: true }),
    __metadata("design:type", Array)
], Item.prototype, "properties", void 0);
Item = __decorate([
    type_graphql_1.ObjectType()
], Item);
let ItemResponse = class ItemResponse {
};
__decorate([
    type_graphql_1.Field(() => [ItemError], { nullable: true }),
    __metadata("design:type", Array)
], ItemResponse.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(() => [Item], { nullable: true }),
    __metadata("design:type", Array)
], ItemResponse.prototype, "items", void 0);
ItemResponse = __decorate([
    type_graphql_1.ObjectType()
], ItemResponse);
exports.ItemResponse = ItemResponse;
//# sourceMappingURL=item.js.map