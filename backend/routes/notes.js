const express = require("express");
const router = express.Router();
const fetchUser = require("../middlewares/fetchUser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//Route:1 -> Get the all the notes : GET "/api/notes/fetchallnotes"
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.session.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

//Route:2 -> Add a new note : POST "/api/notes/addnote"
router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, description, tag } = req.body;
      console.log(req.body)
      const note = new Notes({
        title,
        description,
        date:req.body.tag,
        user: req.session.user.id,
      });
      const savedNotes = await note.save();
      res.json(savedNotes);
    } catch (error) {
      console.error(error.message)
      res.status(500).send({errors:"Internal server error"});
    }
  }
);

//Route:3 -> Update a existing note : POST "/api/notes/updatenote/:id"
router.put("/updatenote/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;
  const { id } = req.params;
  try {
    // Create a newNote object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.date = tag;
    }

    // Find the note to be updated and update it
    let note = await Notes.findById(id);
    if (!note) {
      res.status(500).send({errors:"Not Found"});
    }

    if (note.user.toString() !== req.session.user.id) {
      res.status(500).send({errors:"Not Allowed"});
    }
    console.log("munno")
    console.log(newNote)
    note = await Notes.findByIdAndUpdate(id, { $set: newNote }, { new: true });
    res.json(note);
  } catch (error) {
    console.log(error);
    res.status(500).send({errors:"Internal server error"});
  }
});

//Route:4 -> Delete a existing note : POST "/api/notes/deletenote/:id"
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  const { id } = req.params;
  try {
    // Find the note to be deleted and delete it
    let note = await Notes.findById(id);
    if (!note) {
      res.status(500).send({errors:"Not Found"});
    }

    if (note.user.toString() !== req.session.user.id) {
      res.status(500).send({errors:"Not Allowed"});
    }

    //Allow deletion only if user owns this note
    note = await Notes.findByIdAndDelete(id);
    res.json({"success":"note has been deleted succesfully",note:note });
  } catch (error) {
    console.log(error);
    res.status(500).send({errors:"Internal server error"});
  }
});

module.exports = router;
