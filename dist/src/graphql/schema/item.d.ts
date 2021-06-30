import { ObjectId } from "mongodb";
declare class ItemError {
    field: string;
    error: string;
}
declare class ItemImage {
    small: String;
    large: String;
}
declare class ItemProperties {
    key: String;
    value: string;
}
declare class Item {
    _id: ObjectId;
    name: String;
    type: String;
    image: ItemImage;
    description: String;
    properties?: [ItemProperties];
}
export declare class ItemResponse {
    errors?: ItemError[];
    items?: Item[];
}
export {};
