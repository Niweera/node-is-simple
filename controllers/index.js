const router = require("express").Router();
const asyncWrapper = require("../utilities/async-wrapper");

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

module.exports = router;
