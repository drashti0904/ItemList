const express = require("express");
const router = express.Router();
const Item = require("../models/item");

// Route for fetching object data
router.get("/objects", async (req, res) => {
  try {
    const objectItems = await Item.find({ itemType: "object" });
    res.json(objectItems);
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
});

// Route for fetching container data
router.get("/containers", async (req, res) => {
  try {
    const containerItems = await Item.find({ itemType: "container" });
    res.json(containerItems);
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
});

router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.send("Error" + err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    res.json(item); // Corrected variable name from items to item
  } catch (err) {
    res.send("err" + err);
  }
});

router.post("/", async (req, res) => {
  const item = new Item({
    itemName: req.body.itemName,
    itemDiscription: req.body.itemDiscription,
    itemType: req.body.itemType,
  });
  try {
    const savedItem = await item.save(); // Corrected method name
    res.json(savedItem);
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
});

router.post("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const options = { new: true };
    const updatedItem = await Item.findByIdAndUpdate(id, updateData, options);
    res.json({ message: "Item updated successfully", updatedItem }); // Respond with success message and updated item
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    res.json(deletedItem); // Respond with the deleted item document
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
});

module.exports = router;
