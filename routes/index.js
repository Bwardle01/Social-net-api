const router = require('express').Router();

const apiRoutes = require("./api");
router.use("/api", apiRoutes);

// define fallback for routes that dont match
router.use((req, res) => {
  res.status(404).send('Error!');
});

module.exports=router;