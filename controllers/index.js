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

/** @route  GET /students
 *  @desc   Get all students
 *  @access Public
 */
router.get(
  "/students",
  asyncWrapper(async (req, res) => {
    const response = await studentService.getAllStudents();
    res.send(response);
  })
);

/** @route  GET /students/:id
 *  @desc   Get a single student
 *  @access Public
 */
router.get(
  "/students/:id",
  asyncWrapper(async (req, res) => {
    const response = await studentService.getStudent(req.params.id);
    res.send(response);
  })
);

/** @route  PATCH /students/:id
 *  @desc   Update a single student
 *  @access Public
 */
router.patch(
  "/students/:id",
  asyncWrapper(async (req, res) => {
    const response = await studentService.updateStudent(
      req.params.id,
      req.body
    );
    res.send(response);
  })
);

/** @route  DELETE /students/:id
 *  @desc   Delete a single student
 *  @access Public
 */
router.delete(
  "/students/:id",
  asyncWrapper(async (req, res) => {
    const response = await studentService.deleteStudent(req.params.id);
    res.send(response);
  })
);

module.exports = router;
