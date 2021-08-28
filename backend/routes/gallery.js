const mongoose = require("mongoose");
const express = require("express");

const GallerySchema = mongoose.model("GallerySchema");
const router = express.Router();

/**
 * @route   GET routes/gallery/images
 * @desc    Get all gallery images data
 * @access  Public
 */

router.get("/images", async (req, res) => {
  try {
    const images = await GallerySchema.find();
    if (!images) throw Error("images not exist");
    res.json(images);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   POST routes/gallery/images
 * @desc    POST List images data
 * @post {
    "listImagesJSON": [
        {
            "name": "Gourmet veg 1",
            "description": "menuData",
            "itemType": "menuData",
            "imageURL": "img/Gallery/Menu/1gourmet-veg.jpg"
        },
        {
            "name": "Gourmet veg 112",
            "description": "menuData",
            "itemType": "menuData",
            "imageURL": "img/Gallery/Menu/1gourmet-veg.jpg"
        }
    ]
}
 * @access  Private
 */
router.post("/images", async (req, res) => {
  const { listImagesJSON } = req.body;

  try {
    var listImages = Object.keys(listImagesJSON);
    for (var i = 0, length = listImagesJSON.length; i < length; i++) {
      const { name, description, itemType, imageURL } = listImagesJSON[i];

      const newGalleryItem = new GallerySchema({
        name,
        description,
        itemType,
        imageURL,
      });
      await newGalleryItem.save();
    }

    res.send({ response: "ok" });
  } catch (err) {
    return res.status(422).send({ error: "Gallery item not saved!" });
  }
});
/**
 * @route   GET routes/staticImages
 * @desc    Get all static gallery images data
 * @access  Public
 */

router.get("/staticImages", async (req, res) => {
  try {
    const images = await GallerySchema.find();
    if (!images) throw Error("images not exist");
    res.json(images);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});
module.exports = router;
