const express = require("express");
const router = express.Router();
const User = require('../models/AuthModel');
const jwt = require('jsonwebtoken');

const SECRET_KEY = "I M SECRET";

router.post("/signup", async(req, res) => {
  const { name, email, password, cPassword } = req.body;
  const isExist = await User.findOne({ email });
  if(isExist){
    return res.status(404).json("user already exists");
  }
  if(password!==cPassword){
    return res.status(470).json("Password and confirm password do not match");
  }
  const user = new User({name,email,password});
  const newUser = await user.save();

  const payload = {
    user: {
      id: newUser._id
    }
  };
  const authToken = jwt.sign(payload,SECRET_KEY);
  res.status(200).json({success: true, authToken, user});
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({email});
  if(!user){
    return res.status(400).json({success: false, messeage: "Signin failed"});
  }
  if(user.password !== password) {
    return res.status(400).json({success: false, messeage: "Signin failed"});
  }
  else{
    const payload = {
      user: {
        id: user._id
      }
    };
    const authToken = jwt.sign(payload,SECRET_KEY);
    res.status(200).json({success: true, authToken, user});
  }
});

router.get('/userlist', async (req, res) => {
  try {
    const userlist = await User.find({});
    res.status(200).send(userlist); // Send 200 OK status with the user list
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' }); // Send 500 Internal Server Error status
  }
});

router.post('/update-picture', async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture
    const userId = req.user.id
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    )
    console.log(image)
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { images: image.secure_url },
      { new: true }
    )
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
})


module.exports = router;