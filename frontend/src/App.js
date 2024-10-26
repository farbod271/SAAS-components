import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Outlet, NavLink, Link} from "react-router-dom";
import './Styles.css'
import { useState, useEffect } from "react";



function App() {




const Home = () => {


  return <h1>I've rendered  times!</h1>;
}

const Contact = () => {
  return (
    <div className='hello'>
      <h2>Contact</h2>
    </div>
  )
}

const Layout = () => {


  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink className={({ isActive }) => isActive ? 'active-link' : undefined} to="/">Home</NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => isActive ? 'active-link' : undefined} to="/blogs">Blogs</NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => isActive ? 'active-link' : undefined} to="/contact">Contact</NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => isActive ? 'active-link' : undefined} to="/note">Note</NavLink>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};




const Blogs = () => {
  return (
    <div className='hello'>
      <h2>Blogs</h2>
      <nav>
        <ul>
          <li>
            <Link to={'sandy'}>1</Link>
          </li>
          <li>
            <Link to={'bandy'}>2</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}

const NoPage = () => {
  return <h1>404</h1>;
};



const Note = () => {
  const [count, setCount] = useState(0);
  
  
  const initialNote = {
    key: count,
    content: '',
    tags: '',
    isFavorite: false,
  };
  
  const [note, setNote] = useState(initialNote);
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote ] = useState({});





  useEffect(() => {
    setCount((prevCount) => prevCount + 1);

  }, [notes])



  const handleChange = (e) => {
    const { value } = e.target;
    setNote({
      ...note,
      content: value,
    });

  }

  const addNote = () => {
    setNotes((prevNotes) => [...prevNotes, note]);
    setNote(initialNote);
  };


  const delNote = (key) => {
    setNotes((prevNotes) =>  prevNotes.filter((prevNote) => prevNote.key !== key))

  }

const editNote = (note) => {
  setEditingNote(note)
}

const handleEditChange = (e) => {
  const { value } = e.target;
  setEditingNote({
    ...editingNote,
    content: value,
  });
}

const saveEdit = () => {
  // delNote (editingNote.key);
  setNotes((prevNotes) => prevNotes.map((prevNote) => {
    if (prevNote.key === editingNote.key) {
      return editingNote;
    }
    return prevNote;
  }
  ));
  setEditingNote({});
}

  const enter = (note) => {
    addNote(note)
  }


  return (
    <div className='container'>

    <div className='note'>
      <textarea
        value={note.content || ''}
        onChange={(e) => handleChange(e)}
        placeholder="Write a note..."
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            enter(note.content);
          }
        }}  
        />
        <p>{note.key}</p>
        <p>{note.tags || ''}</p>
        <p>{note.isFavorite || ''}</p>
        <p>{note.isEditing}</p>

      <button onClick={() => addNote()}>Save</button>
    </div>


    {notes.slice().reverse().map((note) => (
  <div className='note' key={note.key}>
    <textarea 
      value={note.key=== editingNote.key ? editingNote.content : note.content}
      readOnly={note.key=== editingNote.key ? false : true}
      onChange={(e) => handleEditChange(e)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && (note.isFirst || note.isEditing)) {
        e.preventDefault();
        enter(note.content);
      }
    }}

    />
        <p>{note.key}</p>


    <button onClick={() => delNote(note.key)}>delete</button>
    <button onClick={() => editNote(note)}>edit</button>
    <button onClick={() => saveEdit()}>Save</button>

  </div>
))}

    </div>
  )
}


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />}>
            <Route index path="sandy" element={<h1>Blog Post1</h1>} />
            <Route path="bandy" element={<h1>Blog Post2</h1>} />
          </Route>
          <Route path="contact" element={<Contact />} />
          <Route path="note" element={<Note />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
