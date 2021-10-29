const express = require("express");
const {
  getAllMenus,
  createMenu,
  getMenuDetails,
  updateMenu,
  deleteMenu,
  getAllMenusAdmin,
  createMenuReview,
  getMenuReviews,
  deleteMenuReview,
} = require("../controllers/menuController");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/menus").get(getAllMenus);
router.route("/menus/:id").get(getMenuDetails);

router
  .route("/admin/menus")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllMenusAdmin);
router
  .route("/admin/menus/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createMenu);
router
  .route("/admin/menus/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateMenu)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteMenu);

router.route("/review").put(isAuthenticatedUser, createMenuReview);
router
  .route("/reviews")
  .get(getMenuReviews)
  .delete(isAuthenticatedUser, deleteMenuReview);

module.exports = router;
