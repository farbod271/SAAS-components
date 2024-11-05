import React from 'react'
import './Styles.css'
import { useState, useEffect } from "react";
import axios from 'axios';
import { Trash2, Save  } from 'lucide-react';


const Note = () => {
    

    const api = 'http://localhost:3001/notes';

    const RandomId = () => {
        return Math.floor(Math.random() * 1000000);
        }
    
    const initialNote = {
      key: RandomId(),
      content: '',
      tags: '',
      isFavorite: false,
    };
    
    const [note, setNote] = useState(initialNote);
    const [notes, setNotes] = useState([]);
    const [editingNote, setEditingNote ] = useState({});


    useEffect(() => {
        fetchnotes();
    }, [])

    const fetchnotes = async () => {
      try {
        const  response  = await axios.get(api);
        setNotes(response.data);
      } catch (error) {
        console.error(error);
      }
    }

  
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
  
            axios.post(api, note)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
            console.error(error);
            
        });
      }
  
    const delNote = async (key) => {

            await axios.delete(`${api}/${key}`)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
            fetchnotes();
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
    setNotes((prevNotes) => prevNotes.map((prevNote) => {
      if (prevNote.key === editingNote.key) {
        return editingNote;
      }
      return prevNote;
    }
    ));
      axios.put(`${api}/${editingNote.key}`, editingNote)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });


    setEditingNote({});
  }
  
    const enter = (note) => {
      addNote(note)
    }
  
  
    return (
      <div className='container'>
  
      <div className='note bg-yellow-100 shadow-lg rounded-lg transition-all'>
      <div className="upper bg-opacity-50 bg-white p-2 rounded-t-lg flex justify-end items-center">
              <div className="flex gap-2">
              <button  onClick={() => addNote()}
                className="text-gray-600 hover:text-green-500 hover:transform hover:scale-150 transition-all"
                >
                <Save size={16} />
              </button>
                </div>
      </div>
        <textarea
          className='p-3 w-full resize-none'
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
      </div>

  
      {notes.slice().reverse().map((note) => (
    <div className='note bg-yellow-100 shadow-lg rounded-lg transition-all' key={note.key}>
      <div className="upper bg-opacity-50 bg-white p-2 rounded-t-lg flex justify-end items-center">
              <div className='flex gap-2'>

              <button  onClick={() => saveEdit()}
                className={`text-gray-600 hover:text-green-500 hover:transform hover:scale-150 transition-all ${note.key=== editingNote.key ? 'block' : 'hidden'}`}
                >
                <Save size={16} />
              </button>

              <button onClick={() => delNote(note.key)}
className="text-gray-600 justify-end hover:text-red-600 hover:transform hover:scale-150 transition-all"><Trash2 size={16} /></button>
              </div>
      </div>
      <textarea 
      onClick={() => editNote(note)}
      className='p-3 w-full resize-none'
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
    </div>
  ))}
      </div>
    )
  }

export default Note;