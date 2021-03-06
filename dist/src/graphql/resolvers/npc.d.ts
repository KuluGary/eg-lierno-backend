export declare class NpcResolver {
    get_npcs_by_id({ req }: {
        req: any;
    }, npcIds: [String] | null): Promise<{
        errors: {
            field: string;
            error: string;
        }[];
        npcs?: undefined;
    } | {
        npcs: any;
        errors?: undefined;
    }>;
}
