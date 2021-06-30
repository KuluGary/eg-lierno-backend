export declare class SpellResolver {
    get_spells({ req }: {
        req: any;
    }): Promise<{
        errors: {
            field: string;
            error: string;
        }[];
        spells?: undefined;
    } | {
        spells: any;
        errors?: undefined;
    }>;
}
