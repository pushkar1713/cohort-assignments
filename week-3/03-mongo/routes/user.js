const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { Course, User } = require("../db");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement signup logic
  const username = req.body.username;
  const password = req.body.password;

  const newUser = await User.create({
    username: username,
    password: password,
  });

  res.json({
    msg: "user created sucessfully",
  });
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const response = await Course.find({});
  res.json({
    courses: response,
  });
});

router.post("/courses/:courseId", userMiddleware, (req, res) => {
  // Implement course purchase logic
  const courseID = req.params.courseId;
  const username = req.headers.username;

  User.updateOne(
    {
      username: username,
    },
    {
      $push: {
        purchasedCourses: courseID,
      },
    }
  );
  res.json({
    msg: "purchase complete",
  });
});

router.get("/purchasedCourses", userMiddleware, (req, res) => {
  // Implement fetching purchased courses logic
});

module.exports = router;
