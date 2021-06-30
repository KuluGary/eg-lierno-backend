const Item = require("../../models/item");
module.exports = {
    getAllItems: () => Item.find({ "type": "items" }),
    getAllWeapons: () => Item.find({ "type": "weapons" }),
    getAllVehicles: () => Item.find({ "type": "vehicles" }),
    getAllArmor: () => Item.find({ "type": "armor" }),
};
//# sourceMappingURL=item.js.map