const router = require("express").Router();
const asyncWrapper = require("../utilities/async-wrapper");
const StudentService = require("../services");
const studentService = new StudentService();

/** @route  GET /
 *  @desc   Root endpoint
 *  @access Public
 */
router.get(
  "/",
  asyncWrapper(async (req, res) => {
    res.send({
      message: "Hello World!",
      status: 200
    });
  })
);

/** @route  POST /register
 *  @desc   Register a student
 *  @access Public
 */
router.post(
  "/register",
  asyncWrapper(async (req, res) => {
    const response = await studentService.registerStudent(req.body);
    res.send(response);
  })
);

module.exports = router;
