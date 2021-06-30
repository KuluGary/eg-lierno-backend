import { ObjectId } from "mongodb";
declare class SpellError {
    field: string;
    error: string;
}
declare class SpellComponents {
    type: string;
    description: string;
}
declare class SpellStats {
    level: number;
    school: string;
    castingTime: string;
    range: string;
    components: SpellComponents;
    duration: string;
    description: string;
}
declare class Spell {
    _id: ObjectId;
    name: string;
    stats: SpellStats;
}
export declare class SpellResponse {
    errors?: SpellError[];
    spells?: Spell[];
}
export {};
