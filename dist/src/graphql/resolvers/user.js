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
exports.UserResolver = void 0;
const type_graphql_1 = require("type-graphql");
const user_1 = __importDefault(require("../../models/user"));
const user_2 = require("../schema/user");
const activate_account_1 = __importDefault(require("../../utils/email-templates/activate-account"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mail_1 = __importDefault(require("@sendgrid/mail"));
let UserResolver = class UserResolver {
    async me({ req }) {
        if (!req.session.userId) {
            return {
                errors: [{ field: "login", error: "No está logueado" }],
            };
        }
        const user = await user_1.default.findOne({ _id: req.session.userId });
        return { user };
    }
    async register(options, { req }) {
        const { username, password, metadata } = options;
        const checkUser = await user_1.default.exists({ username });
        if (checkUser)
            return {
                errors: [{ field: "username", error: "Usuario ya registrado" }],
            };
        const hash = await bcrypt_1.default.hash(password, 10);
        const newUser = new user_1.default({
            username,
            password: hash,
            metadata,
            role: process.env.DEFAULT_ROLE,
        });
        await newUser.save();
        mail_1.default.setApiKey(process.env.SENDGRID_KEY || "");
        let dt = new Date();
        dt.setTime(dt.getTime() + 24 * 60 * 60 * 1000);
        const email = {
            to: (metadata === null || metadata === void 0 ? void 0 : metadata.email) || "",
            from: process.env.SENGRID_EMAIL || "",
            subject: "Activación de cuenta en Lierno App ✔",
            html: activate_account_1.default
                .replace("|USERNAME|", username)
                .replace("|URL|", `${process.env.CLIENT_URL}activate/${newUser._id}?exp=${dt}`)
                .replace("|DATE|", `${new Date().getFullYear()}`),
        };
        await mail_1.default.send(email);
        req.session.userId = newUser._id;
        return { user: newUser };
    }
    async login(options, { req }) {
        const { username, password } = options;
        const user = await user_1.default.findOne({ username });
        if (!user)
            return { errors: [{ field: "username", error: "Usuario no existe" }] };
        const match = await bcrypt_1.default.compare(password, user.password);
        if (!match)
            return {
                errors: [{ field: "password", error: "Contraseña incorrecta" }],
            };
        req.session.userId = user._id;
        req.session.roles = user.role;
        return { user };
    }
    logout({ req, res }) {
        return new Promise((resolve) => req.session.destroy((err) => {
            if (err)
                return resolve(false);
            res.clearCookie("qid");
            resolve(true);
        }));
    }
};
__decorate([
    type_graphql_1.Query(() => user_2.UserResponse),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "me", null);
__decorate([
    type_graphql_1.Mutation(() => user_2.UserResponse),
    __param(0, type_graphql_1.Arg("options")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_2.UserRegisterInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    type_graphql_1.Mutation(() => user_2.UserResponse),
    __param(0, type_graphql_1.Arg("options")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_2.UserLoginInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "logout", null);
UserResolver = __decorate([
    type_graphql_1.Resolver()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.js.map