export declare class CampaignResolver {
    get_user_campaigns({ req }: {
        req: any;
    }): Promise<{
        errors: {
            field: string;
            error: string;
        }[];
        campaigns?: undefined;
    } | {
        campaigns: any;
        errors?: undefined;
    }>;
}
