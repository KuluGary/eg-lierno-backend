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
exports.UserRegisterInput = exports.UserLoginInput = exports.UserResponse = exports.UserError = exports.User = void 0;
const type_graphql_1 = require("type-graphql");
const mongodb_1 = require("mongodb");
let UserMetadata = class UserMetadata {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserMetadata.prototype, "first_name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserMetadata.prototype, "last_name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserMetadata.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UserMetadata.prototype, "avatar", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UserMetadata.prototype, "location", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UserMetadata.prototype, "discordName", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UserMetadata.prototype, "discordId", void 0);
__decorate([
    type_graphql_1.Field((_) => [String], { nullable: true }),
    __metadata("design:type", Array)
], UserMetadata.prototype, "friendList", void 0);
UserMetadata = __decorate([
    type_graphql_1.ObjectType()
], UserMetadata);
let UserMetadataInput = class UserMetadataInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserMetadataInput.prototype, "first_name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserMetadataInput.prototype, "last_name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserMetadataInput.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UserMetadataInput.prototype, "avatar", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UserMetadataInput.prototype, "location", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UserMetadataInput.prototype, "discordName", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UserMetadataInput.prototype, "discordId", void 0);
__decorate([
    type_graphql_1.Field((_) => [String], { nullable: true }),
    __metadata("design:type", Array)
], UserMetadataInput.prototype, "friendList", void 0);
UserMetadataInput = __decorate([
    type_graphql_1.InputType()
], UserMetadataInput);
let UserFavorites = class UserFavorites {
};
__decorate([
    type_graphql_1.Field((_) => [String], { nullable: true }),
    __metadata("design:type", Array)
], UserFavorites.prototype, "npcs", void 0);
__decorate([
    type_graphql_1.Field((_) => [String], { nullable: true }),
    __metadata("design:type", Array)
], UserFavorites.prototype, "bestiary", void 0);
UserFavorites = __decorate([
    type_graphql_1.ObjectType()
], UserFavorites);
let User = class User {
    constructor() {
        this.updatedAt = new Date();
        this.createdAt = Date;
    }
};
__decorate([
    type_graphql_1.Field((_) => type_graphql_1.ID, { nullable: true }),
    __metadata("design:type", typeof (_a = typeof mongodb_1.ObjectId !== "undefined" && mongodb_1.ObjectId) === "function" ? _a : Object)
], User.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field((_) => [String]),
    __metadata("design:type", Array)
], User.prototype, "campaigns", void 0);
__decorate([
    type_graphql_1.Field((_) => UserFavorites, { nullable: true }),
    __metadata("design:type", UserFavorites)
], User.prototype, "favorites", void 0);
__decorate([
    type_graphql_1.Field((_) => UserMetadata),
    __metadata("design:type", UserMetadata)
], User.prototype, "metadata", void 0);
__decorate([
    type_graphql_1.Field((_) => [String]),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    __metadata("design:type", Object)
], User.prototype, "updatedAt", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    __metadata("design:type", Object)
], User.prototype, "createdAt", void 0);
User = __decorate([
    type_graphql_1.ObjectType()
], User);
exports.User = User;
let UserError = class UserError {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserError.prototype, "field", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserError.prototype, "error", void 0);
UserError = __decorate([
    type_graphql_1.ObjectType()
], UserError);
exports.UserError = UserError;
let UserResponse = class UserResponse {
};
__decorate([
    type_graphql_1.Field(() => [UserError], { nullable: true }),
    __metadata("design:type", Array)
], UserResponse.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(() => User, { nullable: true }),
    __metadata("design:type", User)
], UserResponse.prototype, "user", void 0);
UserResponse = __decorate([
    type_graphql_1.ObjectType()
], UserResponse);
exports.UserResponse = UserResponse;
let UserLoginInput = class UserLoginInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserLoginInput.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserLoginInput.prototype, "password", void 0);
UserLoginInput = __decorate([
    type_graphql_1.InputType()
], UserLoginInput);
exports.UserLoginInput = UserLoginInput;
let UserRegisterInput = class UserRegisterInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserRegisterInput.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserRegisterInput.prototype, "password", void 0);
__decorate([
    type_graphql_1.Field((_) => UserMetadataInput, { nullable: true }),
    __metadata("design:type", UserMetadataInput)
], UserRegisterInput.prototype, "metadata", void 0);
UserRegisterInput = __decorate([
    type_graphql_1.InputType()
], UserRegisterInput);
exports.UserRegisterInput = UserRegisterInput;
//# sourceMappingURL=user.js.map