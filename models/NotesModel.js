const mongoose = require('mongoose');

//TODO - Create Note Schema here having fields
//      - noteTitle
//      - noteDescription
//      - priority (Value can be HIGH, LOW or MEDUIM)
//      - dateAdded
//      - dateUpdated

const NoteSchema = new mongoose.Schema({
    noteTitle: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    noteDescription: {
        type: String
    },
    priority: {
        type: String,
        enum: ['Low', 'Meduim', 'High'],
        default: 'Low'
    },
    dateAdded: {
        type: Date,
        default: new Date()
    },
    dateUpdated: {
        type: Date
    }
})

module.exports = mongoose.model('Note', NoteSchema)