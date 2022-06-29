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
    if(noteId != undefined){
      this.setState({editing: true});
      const res = await axios.get("http://localhost:4000/api/notes/"+noteId);
      console.log(res.data);
      this.setEditValues(res.data);
    }else{
      const res = await axios.get("http://localhost:4000/api/notes");
      if (res.status === 200) {
      this.getUsers();
    }
    }
  }

  setEditValues = (data) =>{
    this.setState({
      userSelected: data.author,
      title: data.title,
      content: data.content,
      date: new Date(data.date)
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
    let valido = false;
    valido = Object.keys(newNote).reduce((resp, val) => {
      if (newNote[val] == null || newNote[val] === "") resp = false;
      return resp;
    }, true);
    if (valido) {
      const res = await axios.post("http://localhost:4000/api/notes", newNote);
      if (res.status === 200) {
        this.setState({
          title: "",
          content: ""
        })
        this.getUsers();
      }
    } else {
      console.log("Hay un valor solicitado vacio o nulo")
    }

  }

  getUsers = async () => {
    const res = await axios.get("http://localhost:4000/api/users");
    this.setState({ users: res.data.map(user => user.username), userSelected: res.data[0].username });
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
          <form onSubmit={this.onSubmit}>
            <button type='submit' className='btn btn-primary'>
              Save
            </button>
          </form>
        </div>
      </div>
    )
  }
}
