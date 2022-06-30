import React, { Component } from 'react'
import axios from 'axios'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'

export default class NotesList extends Component {
  state = {
    notes: []
  }

  async componentDidMount() {
    this.getNotes();
  }

  getNotes = async () => {
    let res = {};
    try {
      res = await axios.get("http://localhost:4000/api/notes");
    } catch (error) {
      res.status = error.response.status;
      res.response = error.response.status + " --- " + error.code + " --- " + error.response.statusText
      console.log(error);
    };
    if (res.status === 200) {
      this.setState({ notes: res.data });
    } else console.log("Se presento un error con el servicio de notas " + res.response);
  }

  deleteNote = async (id) => {
    let res = {};
    try {
      res = await axios.delete("http://localhost:4000/api/notes/" + id)
    } catch (error) {
      res.status = error.response.status;
      res.response = error.response.status + " --- " + error.code + " --- " + error.response.statusText
      console.log(error);
    };
    if (res.status === 200) {
      this.getNotes();
    } else console.log("Se presento un error con el servicio de notas " + res.response);
  }

  render() {
    return (
      <div className="row">
        {
          this.state.notes.map((note) =>
            <div className="col-md-4 p-2" key={note._id}>
              <div className='card'>
                <div className="card-header d-flex justify-content-between">
                  <h5>{note.title}</h5>
                  <Link className='btn btn-primary' to={"/editNote/" + note._id}>
                    Edit
                  </Link>
                </div>
                <div className="card-body">
                  <p> {note.content} </p>
                  <p> {format(note.date)} </p>
                  <p> Author: {note.author} </p>
                </div>
                <button className='btn btn-danger' onClick={() => this.deleteNote(note._id)}>
                  Delete
                </button>
              </div>
            </div>
          )}
      </div>
    )
  }
}
