const { Router } = require('express');
const { route } = require('./users');
const router = Router();

const {getNotes, createNotes, getNote, updateNote, deleteNote} = require('../controllers/notes.controller');

router.route('/')
    .get(getNotes)
    .post(createNotes);

router.route('/:id')
    .get(getNote)
    .put(updateNote)
    .delete(deleteNote);


module.exports = router;