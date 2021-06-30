import { Field, ID, ObjectType } from "type-graphql";
import { ObjectId } from "mongodb";
@ObjectType()
class SpellError {
    @Field()
    field: string;
    @Field()
    error: string;
}

@ObjectType()
class SpellComponents {
    @Field(() => String, { nullable: true })
    type: string;

    @Field(() => String, { nullable: true })
    description: string;
}

@ObjectType()
class SpellStats {
    @Field()
    level: number;

    @Field()
    school: string;

    @Field()
    castingTime: string;

    @Field(() => String, { nullable: true })
    range: string;

    @Field(() => SpellComponents)
    components: SpellComponents;

    @Field()
    duration: string;

    @Field()
    description: string;
}

@ObjectType()
class Spell {
    @Field(() => ID)
    _id: ObjectId;

    @Field()
    name: string;

    @Field()
    stats: SpellStats;
}

@ObjectType()
export class SpellResponse {
    @Field(() => [SpellError], { nullable: true })
    errors?: SpellError[];

    @Field(() => [Spell], { nullable: true })
    spells?: Spell[];
}
