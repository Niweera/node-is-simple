const router = require("express").Router();
const asyncWrapper = require("../utilities/async-wrapper");
const StudentService = require("../services");
const studentService = new StudentService();
const GridFSMiddleware = require("../middleware/gridfs-middleware");
const { getGridFSFiles } = require("../database/gridfs-service");
const { createGridFSReadStream } = require("../database/gridfs-service");
const { NotFoundError } = require("../errors");

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

/** @route  POST /image
 *  @desc   Upload profile image
 *  @access Public
 */
router.post(
  "/image",
  [GridFSMiddleware()],
  asyncWrapper(async (req, res) => {
    const { originalname, mimetype, id, size } = req.file;
    res.send({ originalname, mimetype, id, size });
  })
);

/** @route   GET /image/:id
 *  @desc    View profile picture
 *  @access  Public
 */
router.get(
  "/image/:id",
  asyncWrapper(async (req, res) => {
    const image = await getGridFSFiles(req.params.id);
    if (!image) {
      res.status(404).send({ message: "Image not found" });
    }
    res.setHeader("content-type", image.contentType);
    const readStream = createGridFSReadStream(req.params.id);
    readStream.pipe(res);
  })
);

/** @route  GET /error
 *  @desc   Return an example error
 *  @access Public
 */
router.get(
  "/error",
  asyncWrapper(async () => {
    throw new NotFoundError("Sorry content not found");
  })
);

module.exports = router;
