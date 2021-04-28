const c = require("ansi-colors");

module.exports = {
    info: (msg) => {
        console.log(`${c.blue(c.symbols.info)} ${c.dim.gray("｢nds｣")}: ${msg}`)
    }
}