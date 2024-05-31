const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post("/signup", (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  Admin.create({
    username: username,
    password: password,
  });

  res.json({
    msg: "admin created sucessfully",
  });
});

router.post("/courses", adminMiddleware, async (req, res) => {
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
