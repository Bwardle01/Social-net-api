const router = require('express').Router();

// Import the API routes and associate them with the /api endpoint
const apiRoutes = require('./api');
router.use('/api', apiRoutes);


router.use((req, res) => {
    res.status(404).send('Error!');
});


module.exports = router;