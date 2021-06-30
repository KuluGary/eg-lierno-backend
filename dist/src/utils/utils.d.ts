export function validateToken(authorization: any): Promise<{
    valid: boolean;
    message: string;
}>;
export function validateOwnership(user: any, owner: any): boolean;
