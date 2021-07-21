import { ObjectId } from "mongodb";
declare class UserMetadata {
    first_name: String;
    last_name: String;
    email: String;
    avatar?: String;
    location?: String;
    discordName?: String;
    discordId?: String;
    friendList?: [String];
}
declare class UserMetadataInput {
    first_name: String;
    last_name: String;
    email: String;
    avatar?: String;
    location?: String;
    discordName?: String;
    discordId?: String;
    friendList?: [String];
}
declare class UserFavorites {
    npcs: [String];
    bestiary: [String];
}
export declare class User {
    _id?: ObjectId;
    isActive: Boolean;
    username: String;
    password: String;
    campaigns: [String];
    favorites: UserFavorites;
    metadata: UserMetadata;
    roles: [String];
    role: String;
    updatedAt: Date;
    createdAt: DateConstructor;
}
export declare class UserError {
    field: string;
    error: string;
}
export declare class UserResponse {
    errors?: UserError[];
    user?: User;
}
export declare class UserLoginInput {
    username: string;
    password: string;
}
export declare class UserRegisterInput {
    username: string;
    password: string;
    metadata: UserMetadataInput;
}
export {};
