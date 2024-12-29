import React, { useState } from 'react';
import { Plus, X, Heart, Cloud } from 'lucide-react';
import axios from 'axios';

const DraggableNotes = () => {
  const [notes, setNotes] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedNote, setDraggedNote] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });


  const createNote = () => {
    const newNote = {
      key: Date.now(),
      content: '',
      position: { x: Math.random() * 200, y: Math.random() * 200 },
      isDragging: false,
      isFavorite: false
    };
    setNotes([...notes, newNote]);
  };

  const handleMouseDown = (e, notekey) => {
    // const note = notes.find(n => n.key === notekey);
    const rect = e.target.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsDragging(true);
    setDraggedNote(notekey);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const updatedNotes = notes.map(note => {
        if (note.key === draggedNote) {
          return {
            ...note,
            position: {
              x: e.clientX - dragOffset.x,
              y: e.clientY - dragOffset.y - 42
            }
          };
        }
        return note;
      });
      setNotes(updatedNotes);

    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedNote(null);
  };

  const deleteNote = (key) => {
    setNotes(notes.filter(note => note.key !== key));
  };

  const updateNoteContent = (key, content) => {
    setNotes(notes.map(note => 
      note.key === key ? { ...note, content } : note
    ));

  };


  const makeFavorite = (key) => {

    setNotes(notes.map((note) => {
      if (note.key === key) {
        return {
          ...note,
          isFavorite: !note.isFavorite
        };
      }
      return note;
    }
    ));
  }

  const syncWithBackend = () => {
    axios.post('http://localhost:3001/sync', notes)
      .then((response) => {
        console.log(response.data);
      });
  }

  return (
    <div 
      className="relative w-full h-screen bg-gray-100 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
              <button
          onClick={syncWithBackend}
          className="fixed top-4 right-20 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 flex items-center justify-center"
          >
        <Cloud size={24} />
        </button>
      <button
        onClick={createNote}
        className="fixed top-4 right-4 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 flex items-center justify-center"
      >
        <Plus size={24} />
      </button>

      {notes.map(note => (
        <div
          key={note.key}
          className="absolute bg-yellow-100 w-48 shadow-lg rounded-lg"
          style={{
            transform: `translate(${note.position.x}px, ${note.position.y}px)`,
            cursor: isDragging && draggedNote === note.key ? 'grabbing' : 'grab'
          }}
        >
          <div
            className="bg-yellow-200 p-2 rounded-t-lg flex justify-between items-center"
            onMouseDown={(e) => handleMouseDown(e, note.key)}
          >
            <div className="w-4 h-4 flex items-center">
              <div className="w-1 h-1 bg-gray-500 rounded-full mr-1"></div>
              <div className="w-1 h-1 bg-gray-500 rounded-full mr-1"></div>
              <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
            </div>
            <button onClick={() => makeFavorite(note.key)}
                className={`text-red-500 hover:transform hover:scale-110 transition-all`}
                >
                <Heart className={`hover:fill-red-500 ${note.isFavorite === true ? 'fill-red-500' : 'none' }`} />
              </button>
            <button
              onClick={() => deleteNote(note.key)}
              className="text-gray-600 hover:text-red-500"
            >
              <X size={16} />
            </button>
          </div>
          <textarea
            value={note.content}
            onChange={(e) => updateNoteContent(note.key, e.target.value)}
            className="w-full p-3 bg-transparent border-none resize-none focus:ring-0 focus:outline-none"
            placeholder="Type your note here..."
            rows={4}
          />
        </div>
      ))}
    </div>
  );
};

export default DraggableNotes;