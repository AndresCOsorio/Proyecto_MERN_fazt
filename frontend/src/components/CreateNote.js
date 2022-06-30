import React, { Component } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css" //Se importa si se genera mal el formato del calendario


export default class CreateNote extends Component {

  state = {
    users: [],
    userSelected: "",
    content: "",
    title: "",
    date: new Date(),
    editing: false,
    _id: ""
  };

  async componentDidMount() {
    let { noteId } = this.props
    let res = {};
    if (noteId !== undefined) {
      try {
        res = await axios.get("http://localhost:4000/api/notes/".concat(noteId));
      } catch (error) {
        res.status = error.response.status;
        res.response = error.response.status + " --- " + error.code + " --- " + error.response.statusText
        console.log(error);
      };
      if (res.status === 200) {
        this.setEditValues(res.data);
      }
    } else {
      try {
        res = await axios.get("http://localhost:4000/api/notes");
      } catch (error) {
        res.status = error.response.status;
        res.response = error.response.status + " --- " + error.code + " --- " + error.response.statusText
        console.log(error);
      };
    }
    if (res.status === 200) {
      this.getUsers();
    } else console.log("Se presento un error con el servicio de notas " + res.response);
  }

  setEditValues = (data) => {
    this.setState({
      userSelected: data.author,
      title: data.title,
      content: data.content,
      date: new Date(data.date),
      editing: true,
      _id: data._id
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.saveNote();
    window.location.href = '/';
  }

  saveNote = async () => {
    const newNote = {
      author: this.state.userSelected,
      title: this.state.title,
      content: this.state.content,
      date: this.state.date
    }

    let valido = Object.keys(newNote).reduce((resp, val) => {
      if (newNote[val] == null || newNote[val] === "") resp = false;
      return resp;
    }, true);

    if (valido) {
      let res = null;
      if (this.state.editing) {
        res = await axios.put("http://localhost:4000/api/notes/" + this.state._id, newNote);
      } else {
        res = await axios.post("http://localhost:4000/api/notes", newNote);
      }
      if (res.status === 200) {
        this.setState({
          title: "",
          content: "",
          _id: "",
          editing: false
        })
        this.getUsers();
      }
    } else {
      console.log("Hay un valor solicitado vacio o nulo")
    }

  }

  getUsers = async () => {
    const res = await axios.get("http://localhost:4000/api/users");
    if (this.state.userSelected !== "") {
      this.setState({ users: res.data.map(user => user.username), userSelected: res.data[res.data.findIndex((value) => value.username === this.state.userSelected)].username });
    } else {
      this.setState({ users: res.data.map(user => user.username), userSelected: res.data[0].username });
    }
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onChangeDate = (date) => {
    this.setState({
      date
    })
  }

  render() {
    return (
      <div className="col-md-6 offset-md-3">
        <div className="card card-body">
          <h4>Create a Note</h4>
          <form onSubmit={this.onSubmit}>
            {/** SELECT USER */}
            <div className="form-group">
              <select className='form-control' name='userSelected' value={this.state.userSelected} onChange={this.onInputChange} >{
                this.state.users.map(user =>
                  <option key={user} value={user}>
                    {user}
                  </option>)
              }
              </select>
            </div>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Title" name="title" value={this.state.title} onChange={this.onInputChange} required />
            </div>
            <div className="form-group">
              <textarea className="form-control" placeholder="Content" name="content" value={this.state.content} onChange={this.onInputChange} required />
            </div>
            <div className="form-group">
              <DatePicker className='form-control' selected={this.state.date} onChange={this.onChangeDate} />
            </div>
            <button type='submit' className='btn btn-primary'>
              Save
            </button>
          </form>
        </div>
      </div>
    )
  }
}
