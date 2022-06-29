import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navigation from './components/Navigation';
import CreateNote from './components/CreateNote';
import CreateUser from './components/CreateUser';
import NotesList from './components/NotesList';

import './App.css';
import { EditNote } from './components/EditNote';

function App() {
  return (
    <Router>
      <Navigation />
      <div className="container p-4">
        <Routes>
          <Route exact path="/" element={<NotesList />} />
          <Route path="/createNote" element={<CreateNote />} />
          <Route path="/editNote/:id" element={<EditNote />} />
          <Route path="/createUser" element={<CreateUser />} />
          <Route path="/editUser/:id" element={<CreateUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
