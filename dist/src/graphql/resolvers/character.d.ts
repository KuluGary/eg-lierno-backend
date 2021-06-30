export declare class CharacterResolver {
    get_user_characters({ req }: {
        req: any;
    }): Promise<{
        errors: {
            field: string;
            error: string;
        }[];
        characters?: undefined;
    } | {
        characters: any;
        errors?: undefined;
    }>;
    get_dm_characters({ req }: {
        req: any;
    }): Promise<{
        errors: {
            field: string;
            error: string;
        }[];
        characters?: undefined;
    } | {
        characters: any;
        errors?: undefined;
    }>;
    get_characters_by_id(characterIds: [String] | null, { req }: {
        req: any;
    }): Promise<{
        errors: {
            field: string;
            error: string;
        }[];
        characters?: undefined;
    } | {
        characters: any;
        errors?: undefined;
    }>;
}
