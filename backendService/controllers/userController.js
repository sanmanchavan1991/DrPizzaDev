  const catchAsyncErrors = require("../middleware/catchAsyncErrors");
  const sendToken  = require("../utils/jwtToken");
  const sendEmail   = require("../utils/sendEmail");
  const ErrorHandler = require("../utils/errorHandler");
  const UserSchema = require("../models/userModel");
  const crypto = require("crypto");
  const cloudinary = require("cloudinary").v2;



  //-----------------------------------Public USER START-----------------------------------------------

  // Register a User
  exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email,password,phone,photo} = req.body;
     const myCloud = await cloudinary.uploader.upload(photo, {
      
      folder: "UserPhoto",
      width: 150,
      crop: "scale",
    });

 
    const user = await UserSchema.create({
      name:name,
      email:email,
      password:password,
      phone:phone,
      photo: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });
    delete user.password;
    sendToken(user, 201, res);
  });


  // Login User
  exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    // checking if user has given password and email both

    if (!email || !password) {
      return next(new ErrorHandler("Please Enter Email & Password", 400));
    }

    const user = await UserSchema.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
    delete user.password;
    sendToken(user, 200, res);
  });

  // Logout User
  exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  });

  // Forgot Password
  exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await UserSchema.findOne({ email: req.body.email });

    if (!user) {
      return next(new ErrorHandler("User not found1", 404));
    }

    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });
    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/resetPassword/${resetToken}`;

    const message = `<h2>Please click on reset link to change the password</h2>
    <p>Your password reset token is :- \n\n ${resetPasswordUrl} \n</p>`;

    try {
      await sendEmail(user.email,`DrPizzaeria Password Reset Link`, message);

      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email} successfully`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save({ validateBeforeSave: false });

      return next(new ErrorHandler(error.message, 500));
    }
  });

  // Reset Password
  exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    // creating token hash
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await UserSchema.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorHandler("Reset Password Token is invalid or has been expired",400));
    }

    if (req.body.password !== req.body.confirmPassword) {
      return next(new ErrorHandler("Password does not matched", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
  });

  // Get User Detail
  exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await UserSchema.findById(req.user.id);

    res.status(200).json({
      success: true,
      user,
    });
  });


  // update User password
  exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await UserSchema.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Old password is incorrect", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHandler("password does not match", 400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);
  });

  // update User Profile
  exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    };

    if (req.body.avatar !== "") {
      const user = await UserSchema.findById(req.user.id);

      // const imageId = user.avatar.public_id;

      // await cloudinary.v2.uploader.destroy(imageId);

      // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      //   folder: "avatars",
      //   width: 150,
      //   crop: "scale",
      // });

      newUserData.photo = {
        public_id: 'myCloud.public_id',
        url: 'myCloud.secure_url',
      };
    }

    const user = await UserSchema.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
    });
  });
  //-----------------------------------Public USER END-----------------------------------------------

  //-----------------------------------ADMIN USER START-----------------------------------------------




  // Get all users(admin)
  exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
    const users = await UserSchema.find();

    res.status(200).json({
      success: true,
      users,
    });
  });

  // Get single user (admin)
  exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await UserSchema.findById(req.params.id);

    if (!user) {
      return next(
        new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
      );
    }

    res.status(200).json({
      success: true,
      user,
    });
  });

  // update User Role -- Admin
  exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };

    await UserSchema.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
    });
  });

  // Delete User --Admin
  exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await UserSchema.findById(req.params.id);

    if (!user) {
      return next(
        new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
      );
    }

    // const imageId = user.avatar.public_id;

    // await cloudinary.v2.uploader.destroy(imageId);

    await user.remove();

    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  });


  //-----------------------------------ADMIN USER END-----------------------------------------------
