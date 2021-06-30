import { UserResponse, UserLoginInput, UserRegisterInput } from "../schema/user";
export declare class UserResolver {
    me({ req }: {
        req: any;
    }): Promise<{
        errors: {
            field: string;
            error: string;
        }[];
        user?: undefined;
    } | {
        user: any;
        errors?: undefined;
    }>;
    register(options: UserRegisterInput, { req }: {
        req: any;
    }): Promise<UserResponse>;
    login(options: UserLoginInput, { req }: {
        req: any;
    }): Promise<UserResponse>;
    logout({ req, res }: {
        req: any;
        res: any;
    }): Promise<unknown>;
}
