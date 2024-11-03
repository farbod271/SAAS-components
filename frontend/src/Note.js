import React from 'react'
import './Styles.css'
import { useState, useEffect } from "react";


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
    const [isAnimating, setIsAnimating] = useState(false);
  
  
  
  
  
  
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
      setIsAnimating(true);
      console.log('yesss');
      setNotes((prevNotes) => [...prevNotes, note]);
      setNote(initialNote);
  
            // Reset animation state after a brief delay
            setTimeout(() => {
              setIsAnimating(false);
            }, 2000); 
  
  
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
  
  
      <div className={`note notes-list ${isAnimating ? 'animate' : ''}`}>
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

export default Note;