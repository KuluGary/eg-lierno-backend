const c = require("ansi-colors");
module.exports = {
    info: (msg) => {
        console.log(`${c.blue(c.symbols.info)} ${c.dim.gray("｢nds｣")}: ${msg}`);
    },
    error: (msg) => {
        console.error(`${c.red(c.symbols.ballotCross)} ${c.dim.gray("｢nds｣")}: ${msg}`);
    }
};
//# sourceMappingURL=logger.js.map