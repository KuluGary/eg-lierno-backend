import { Field, ID, ObjectType } from "type-graphql";
import { ObjectId } from "mongodb";

@ObjectType()
class ItemError {
    @Field()
    field: string;
    @Field()
    error: string;
}

@ObjectType()
class ItemImage {
    @Field()
    small: String;
    @Field()
    large: String;
}
@ObjectType()
class ItemProperties {
    @Field()
    key: String;
    @Field()
    value: string;
}

@ObjectType()
class Item {
    @Field((_) => ID)
    _id: ObjectId;
    @Field()
    name: String;
    @Field()
    type: String;
    @Field()
    image: ItemImage;
    @Field()
    description: String;
    @Field((_) => [ItemProperties], { nullable: true })
    properties?: [ItemProperties];
}

@ObjectType()
export class ItemResponse {
    @Field(() => [ItemError], { nullable: true })
    errors?: ItemError[];

    @Field(() => [Item], { nullable: true })
    items?: Item[];
}
