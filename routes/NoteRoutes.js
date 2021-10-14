const NoteModel = require('../models/NotesModel.js');
const express = require('express');

const router = express.Router();

//TODO - Create a new Note
//http://mongoosejs.com/docs/api.html#document_Document-save
router.post('/notes', async (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    //TODO - Write your code here to save the note
    let newNote = new NoteModel(req.body)
    try {
        await newNote.save()
        res.status(200).send(newNote)
    } catch (err) {
        res.status(500).send({ "error": err.toString() })
    }
    console.log(res.body)
});

//TODO - Retrieve all Notes
//http://mongoosejs.com/docs/api.html#find_find
router.get('/notes', (req, res) => {
    // Validate request
    //TODO - Write your code here to returns all note
    NoteModel.find({}, (err, notes) => {
        if (err) res.send({ "error": err.toString() })
        res.send(notes)
    })
});

//TODO - Retrieve a single Note with noteId
//http://mongoosejs.com/docs/api.html#findbyid_findById
router.get('/notes/:noteId', (req, res) => {
    // Validate request
    //TODO - Write your code here to return onlt one note using noteid
    NoteModel.findById(req.params.noteId, (err, note) => {
        if (err) res.send({ "error": err.toString() })
        res.send(note)
    })
});

//TODO - Update a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
router.put('/notes/:noteId', (req, res) => {
    //TODO - Write your code here to update the note using noteid
    NoteModel.findByIdAndUpdate(req.params.noteId, { ...req.body, dateUpdated: new Date() }, { new: true }, (err, note) => {
        if (err) res.send({ "error": err.toString() })
        res.send(note)
    })
});

//TODO - Delete a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
router.delete('/notes/:noteId', async (req, res) => {
    //TODO - Write your code here to delete the note using noteid
    try {
        const note = await NoteModel.findByIdAndDelete(req.params.noteId)

        if (!note) res.status(404).send({ "error": "Item Not Found" })
        res.status(200).send("Item Deleted")
    } catch (err) {
        res.status(500).send({ error: err.toString() })
    }
});

module.exports = router