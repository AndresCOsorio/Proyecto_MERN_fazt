const { Router } = require('express');
const router = Router();

const {getusers, createusers, getuser, updateuser, deleteuser} = require('../controllers/users.controller');

router.route('/')
    .get(getusers)
    .post(createusers);

router.route('/:id')
    .get(getuser)
    .put(updateuser)
    .delete(deleteuser);

module.exports = router;