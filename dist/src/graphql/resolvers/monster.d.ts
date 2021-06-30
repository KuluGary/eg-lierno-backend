export declare class MonsterResolver {
    get_monsters_by_id({ req }: {
        req: any;
    }, monsterIds: [String] | null): Promise<{
        errors: {
            field: string;
            error: string;
        }[];
        monsters?: undefined;
    } | {
        monsters: any;
        errors?: undefined;
    }>;
}
