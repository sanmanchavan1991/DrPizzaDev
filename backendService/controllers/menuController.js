const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const ApiFeatures= require("../utils/ApiFeatures")
const MenuSchema = require("../models/menuModel");


//-----------------------------------Public MENU START-----------------------------------------------

// Get All Menus
exports.getAllMenus = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const menusCount = await MenuSchema.countDocuments();

  const apiFeature = new ApiFeatures(MenuSchema.find(), req.query)
    .search()
    .filter();

  let menus = await apiFeature.query;

  let filteredMenusCount = menus.length;

  apiFeature.pagination(resultPerPage);

  menus = await apiFeature.query;

  res.status(200).json({
    success: true,
    menus:menus,
    totalMenusCount:menusCount,
    resultPerPage:resultPerPage,
    filteredMenusCount:filteredMenusCount,
  });
});
// Get Menu Details
exports.getMenuDetails = catchAsyncErrors(async (req, res, next) => {
  let menu = await MenuSchema.findById(req.params.id);
  
  if (!menu) {
    return next(new ErrorHandler("Menu not found", 404));
  }

  res.status(200).json({
    success: true,
    menu: menu,
  });
});


// Create New Review or Update the review
exports.createMenuReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, menuId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const menu = await MenuSchema.findById(menuId);

  const isReviewed = menu.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    menu.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    menu.reviews.push(review);
    menu.numOfReviews = menu.reviews.length;
  }

  let avg = 0;

  menu.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  menu.ratings = avg / menu.reviews.length;

  await menu.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});



// Get All Reviews of a Menu
exports.getMenuReviews = catchAsyncErrors(async (req, res, next) => {
  const menu = await MenuSchema.findById(req.query.id);

  if (!menu) {
    return next(new ErrorHandler("Menu not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: menu.reviews,
  });
});


//-----------------------------------Public MENU END-----------------------------------------------












//-----------------------------------Admin MENU START-----------------------------------------------


// Create Menu -- Admin
exports.createMenu = catchAsyncErrors(async (req, res, next) => {
  const menu = await MenuSchema.create(req.body);

  res.status(201).json({
    success: true,
    menu: menu,
  });
});

// Get All Menus --admin
exports.getAllMenusAdmin = catchAsyncErrors(async (req, res, next) => {
  const menus = await MenuSchema.find();

  res.status(200).json({
    success: true,
    menus: menus,
  });
});


//update menu--admin
exports.updateMenu = catchAsyncErrors(async (req, res, next) => {
  let menu = await MenuSchema.findById(req.params.id);
  let updatedMenu = req.body;
  if (!menu) {
    return next(new ErrorHandler("Menu not found", 404));
  }
  menu = await MenuSchema.findByIdAndUpdate(req.params.id, updatedMenu, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    menu: menu,
  });
});


// Delete Menu

exports.deleteMenu = catchAsyncErrors(async (req, res, next) => {
  let menu = await MenuSchema.findById(req.params.id);

  if (!menu) {
    return next(new ErrorHandler("Menu not found", 404));
  }

  // // Deleting Images From Cloudinary
  // for (let i = 0; i < product.images.length; i++) {
  //   await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  // }

  await menu.remove();

  res.status(200).json({
    success: true,
    message: "Menu Delete Successfully",
  });
});





// Delete Review
exports.deleteMenuReview = catchAsyncErrors(async (req, res, next) => {
  const menu = await MenuSchema.findById(req.query.menuId);

  if (!menu) {
    return next(new ErrorHandler("menu not found", 404));
  }

  const reviews = menu.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await MenuSchema.findByIdAndUpdate(
    req.query.menuId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

//-----------------------------------Admin MENU END-----------------------------------------------
