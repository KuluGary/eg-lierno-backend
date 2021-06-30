export declare class ItemResolver {
    get_items({ req }: {
        req: any;
    }): Promise<{
        errors: {
            field: string;
            error: string;
        }[];
        items?: undefined;
    } | {
        items: any;
        errors?: undefined;
    }>;
    get_weapons({ req }: {
        req: any;
    }): Promise<{
        errors: {
            field: string;
            error: string;
        }[];
        items?: undefined;
    } | {
        items: any;
        errors?: undefined;
    }>;
    get_vehicles({ req }: {
        req: any;
    }): Promise<{
        errors: {
            field: string;
            error: string;
        }[];
        items?: undefined;
    } | {
        items: any;
        errors?: undefined;
    }>;
    get_armor({ req }: {
        req: any;
    }): Promise<{
        errors: {
            field: string;
            error: string;
        }[];
        items?: undefined;
    } | {
        items: any;
        errors?: undefined;
    }>;
}
