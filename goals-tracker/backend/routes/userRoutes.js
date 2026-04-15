const express = require('express');
const {registerUser, loginUser, getMe} = require('../controllers/userController.js')
const private = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', private, getMe)

module.exports = router;