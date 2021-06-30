import { ObjectId } from "mongodb";
declare class CampaignError {
    field: string;
    error: string;
}
declare class DiscordData {
    main: String;
    privadas: [String];
}
declare class CampaignFlavor {
    game: String;
    synopsis: String;
    diary?: [Diary];
}
declare class Diary {
    title: String;
    description: String;
}
declare class Campaign {
    _id: ObjectId;
    name: String;
    discordData: DiscordData;
    players: [String];
    characters: [String];
    dm: String;
    flavor: CampaignFlavor;
    completed: Boolean;
}
export declare class CampaignResponse {
    errors?: CampaignError[];
    campaigns?: Campaign[];
}
export {};
