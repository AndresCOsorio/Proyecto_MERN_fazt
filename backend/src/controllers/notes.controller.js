const NoteModel = require('../models/Note');

const notesCtrl = {};

notesCtrl.getNotes = async (req, res) => {
    const notes = await NoteModel.find();
    res.json(notes);
}
notesCtrl.createNotes = async (req, res) => {
    const { title, content, date, author } = req.body;
    const newNote = new NoteModel({title, content, date, author})
    await newNote.save();
    res.json({ message: 'POST - Notes Saved' });
}
notesCtrl.getNote = async (req, res) => {
    const note = await NoteModel.findById(req.params.id);
    res.json(note);
}
notesCtrl.updateNote = async (req, res) => {
    await NoteModel.findByIdAndUpdate(req.params.id , req.body);
    res.json({ message: 'PUT - Note Updated' });
}
notesCtrl.deleteNote = async (req, res) => {
    const note = await NoteModel.findByIdAndDelete(req.params.id);
    res.json({ Delete: note });
}

module.exports = notesCtrl;