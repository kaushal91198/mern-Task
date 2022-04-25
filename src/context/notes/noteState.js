import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const initialState = [];
  const [notes, setNotes] = useState(initialState);

  //alert functionality
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  //Get all notes
  const getNotes = async () => {
    //API Call
    const url =  `${host}/api/notes/fetchallnotes`  
    const response = await fetch(url, {

      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify(), 
    });
    let resData = await response.json() 
    // console.log(resData)
    if(resData.errors){ 
      showAlert("Something went wrong","danger")
      return
    }
    setNotes(resData)
  };


  //Add a note function
  const addNote = async (title, description, tag) => {
    //TODO : API Call
    const url =  `${host}/api/notes/addnote`  
    const response = await fetch(url, {

      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag}), 
    });
    let resData = await response.json() 
    
    //Logic to add note in client
    if(resData.errors){ 
      showAlert("Something went wrong","danger")
      return
    }

    showAlert("Notes Added successfully","success")
    setNotes(notes.concat(resData));
  };

  //Delete a note function
  const deleteNote = async (id) => {
    //TODO : API Call
    const url =  `${host}/api/notes/deletenote/${id}`
    const response = await fetch(url, {

      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify(), // body data type must match "Content-Type" header
    });

    // eslint-disable-next-line no-unused-vars
    const resData = await response.json();
    if(resData.errors){ 
      showAlert("Something went wrong","danger")
      return
    }

    //Logic to delete note in client
    let myNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(myNotes);
    showAlert("Notes Deleted successfully","success")
  };

  //Update a note function
  const editNote = async (id, title, description, tag) => {

    //TODO : API Call
    const url =  `${host}/api/notes/updatenote/${id}`
    const response = await fetch(url, {

      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token') 
      },
      body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
    });
    // eslint-disable-next-line no-unused-vars
    const resData = await response.json();
    if(resData.errors){ 
      showAlert("Something went wrong","danger")
      return
    }

    // console.log(notes)
    let newNotes = JSON.parse(JSON.stringify(notes))
    // //Logic to update note in client
    for (let index = 0; index < newNotes.length; index++) {
      if (id === newNotes[index]._id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].date = tag.toISOString();
        break;
      }
    }
    // console.log(newNotes)
    setNotes(newNotes)
    showAlert("Notes Updated successfully","success")
  };

  return (
    <NoteContext.Provider
      value={{alert,showAlert, notes, getNotes, addNote, deleteNote, editNote}}
    >
      {" "}
      {/*it same as {{state:state,update:update }}*/}
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
