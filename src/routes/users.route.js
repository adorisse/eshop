const express = require('express');
const router = express.Router();
const user = require('../controllers/users.controller');
const verifyToken = require('../middlewares/verifyToken');
const userSchemaValidation = require('../middlewares/users.validation');


router.post('/users/login', user.login);

router.post('/users', userSchemaValidation, user.create);
router.get('/users/:id', user.findOne)


module.exports = router;