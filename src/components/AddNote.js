import React,{useContext,useState} from "react";
import NoteContext from '../context/notes/noteContext';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const AddNote = () => {


    const [state, setState] = useState({title:"",description:"",tag:""});

    const [startDate, setStartDate] = useState(new Date());

    const context=  useContext(NoteContext);
 
    const {addNote}= context;

    const handleClick=(e)=>{
        e.preventDefault();
        console.log(startDate)
        addNote(state.title,state.description,startDate)
        setState({title:"",description:"",tag:""});
        setStartDate(new Date())
    }
    const onChange =(e)=>{
        // console.log({...state})
       setState({...state,[e.target.name]:e.target.value}) //63th 11.51

    }


  return (
    <div className="container my-1">
      <h1>Add a note</h1>
      <form>
        <div className="form-group my-3 ">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            placeholder="Enter Title"
            onChange={onChange}
            value={state.title}
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            className="form-control"
            id="description"
            name="description"
            placeholder="Enter Description"
            onChange={onChange}
            value={state.description}
            
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="tag">Date</label>
        </div>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        <button disabled={state.title.length<3 || state.description.length<5} type="submit" className="btn btn-primary my-3" onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNote;
