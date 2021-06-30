const characterResolver = require('./character_dep');
const userResolver = require('./user');
const campaignResolver = require('./campaign');
const itemResolver = require('./item');
const spellResolver = require('./spell');
const classResolver = require('./class');
const npcResolver = require('./npc');
const monsterResolver = require('./monster');
const { GraphQLScalarType, Kind } = require('graphql');
const typeStringOrInt = (value) => {
    if (typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "bigint") {
        return value;
    }
    return null;
};
const IntOrString = new GraphQLScalarType({
    name: 'IntOrString',
    description: 'Scalar for any value of type String or Int',
    parseValue: typeStringOrInt,
    serialize: typeStringOrInt,
    parseLiteral(ast) {
        if (ast.kind === Kind.INT || ast.kind === Kind.STRING) {
            return typeStringOrInt(ast);
        }
        return null;
    },
});
module.exports = {
    Query: {
        ...characterResolver,
        ...userResolver,
        ...campaignResolver,
        ...itemResolver,
        ...spellResolver,
        ...classResolver,
        ...npcResolver,
        ...monsterResolver
    },
    IntOrString: IntOrString
};
//# sourceMappingURL=index.js.map