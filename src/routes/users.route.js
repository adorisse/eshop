const express = require('express');
const router = express.Router();
const user = require('../controllers/users.controller');
const userValidationSchema = require('../middlewares/users.validation')


router.post('/users', userValidationSchema, user.bidule);
router.get('/users/:id', user.findOne);

router.post('/users/login', user.login);


module.exports = router;