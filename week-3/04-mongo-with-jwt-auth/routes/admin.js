const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course, User } = require("../db/index");
const router = Router();
const jwt = require("jsonwebtoken");
const { JWT_Secret } = require("../config");

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  await Admin.create({
    username: username,
    password: password,
  });

  res.json({
    msg: "admin created successfully",
  });
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  const admin = await Admin.findOne({
    username: username,
    password: password,
  });

  if (admin) {
    const token = jwt.sign(
      {
        username,
      },
      JWT_Secret
    );

    res.json({
      token: token,
    });
  } else {
    res.status(411).json({
      msg: "incorrect credentials",
    });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const newCourse = await Course.create({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    imgLink: req.body.imgLink,
  });
  res.json({
    msg: "course created successfully",
    courseID: newCourse._id,
  });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const response = await Course.find({});
  res.json({
    courses: response,
  });
});

module.exports = router;
