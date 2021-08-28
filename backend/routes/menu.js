const mongoose = require("mongoose");
const express = require("express");

const MenuSchema = mongoose.model("MenuSchema");
const router = express.Router();

/**
 * @route   GET routes/menu/menusList
 * @desc    Get all gallery images data
 * @access  Public
 */

router.get("/menusList", async (req, res) => {
  try {
    const menus = await MenuSchema.find();
    if (!menus) throw Error("menus list not exist");
    res.json(menus);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   POST routes/menu/menu
 * @desc    POST List menus/menu data
 * @body {
    "menusJSON": [
        {
            "foodName": "Pizza new wow",
            "foodDesc": "dads",
            "foodPrice": 121,
            "foodSize": "assas",
            "foodType": "asjkdh"
        },{
            "foodName": "Pizza new wow 12",
            "foodDesc": "dads",
            "foodPrice": 121,
            "foodSize": "assas",
            "foodType": "asjkdh"
        }
    ]
}
 * @access  Private
 */
router.post("/menus", async (req, res) => {
  const { menusJSON } = req.body;

  try { 
    for (var i = 0, length = menusJSON.length; i < length; i++) {
      const { foodName, foodDesc, foodPrice, foodSize,foodType,foodImage } = menusJSON[i];

      const newMenuItem = new MenuSchema({
        foodName,
        foodDesc,
        foodPrice,
        foodSize,
        foodType,
        foodImage
      });
      await newMenuItem.save();
    }

    res.send({ response: "ok" });
  } catch (err) {
    return res.status(422).send({ error: "Menu items not saved!" });
  }
});

module.exports = router;
