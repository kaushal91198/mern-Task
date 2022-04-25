import React,{useContext} from "react";
import NoteContext from '../context/notes/noteContext';

const NotesItem = (props) => {


  const context=  useContext(NoteContext);

  const {deleteNote} = context;

  const { note,updateNote } = props;

  const handleDelete = ()=>{
    deleteNote(note._id)
  }

  const handleUpdate =()=>{
    updateNote(note)
  }

  return (
    <div className="col-md-3">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-center">
            <h5 className="card-title">{note.title}</h5>
            <i className="fas fa-trash-alt mx-2" onClick = {handleDelete}></i>
            <i className="fas fa-edit mx-2" onClick={handleUpdate}></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NotesItem;
