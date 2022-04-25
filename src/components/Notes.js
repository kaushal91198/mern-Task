import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/noteContext";
import NotesItem from "./NotesItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
const Notes = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [state, setState] = useState({
    title: "",
    description: "",
    tag: "default",
    date: "",
  });

  const navigate = useNavigate();

  const context = useContext(NoteContext);
  const { notes, getNotes, editNote, showAlert } = context;
  //Modal Popup
  const ref = useRef(null);

  //Model Close
  const refClose = useRef(null);

  const updateNote = (currentNote) => {
    console.log(currentNote);
    ref.current.click();
    setState(currentNote);
  };

  const handleClick = () => {
    refClose.current.click();
    editNote(state._id, state.title, state.description, startDate);
  };

  const onChange = (e) => {
    // console.log({...state})
    setState({ ...state, [e.target.name]: e.target.value }); //63th 11.51
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("../login", { replace: true });
      showAlert("You have to login to access this page", "danger");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <AddNote />

      {/* adding model html for updateing note */}
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        data-bs-whatever="@getbootstrap"
        ref={ref}
      >
        Open modal for @getbootstrap
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update a note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="col-form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={state.title}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="col-form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={state.description}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="col-form-label">
                    Date
                  </label>
                  <br />
                  <label htmlFor="tag" className="col-form-label">
                  {state.date.substring(0,10)}{" "}
                </label>
                </div>
                
                <DatePicker
                  // selected={state.date.substring(1,11)}
                  onChange={(date) => setStartDate(date)}
                />
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
                disabled={
                  state.title.length < 3 || state.description.length < 5
                }
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* cmodel */}

      <div className="row my-3">
        <h1>Your Notes</h1>
        <div className="container mx-2">
          {notes.length === 0 && "No notes to display."}
        </div>
        {notes.map((note) => {
          return (
            <NotesItem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
