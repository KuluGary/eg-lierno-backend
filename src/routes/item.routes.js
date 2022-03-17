const router = require("express").Router();
const { getItems, postItems, postItem } = require("../controllers/item");

router.get("/items/:id?", getItems);

router.post("/items", postItems);

router.post("/item", postItem);

module.exports = router;
