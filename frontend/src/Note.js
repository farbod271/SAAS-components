import React from "react";
import "./Styles.css";
import { useState, useRef } from "react";
import { Trash2, Save, Heart, Tag, X } from "lucide-react";

const Note = () => {
  const RandomId = () => {
    return Math.floor(Math.random() * 1000000);
  };

  const initialNote = {
    key: RandomId(),
    content: "",
    tags: [],
    isFavorite: false,
    position: { x: Math.random() * 200, y: Math.random() * 200 },
    isMinimized: false,
    created: Date.now(),
  };

  const [note, setNote] = useState(initialNote);
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState({});
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [draggedNote, setDraggedNote] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searched, setSearched] = useState("");
  const refs = useRef({});

  const updateNote = (key, value) => {
    setNote({ ...note, [key]: value });
  };

  const updateEditingNote = (key, value) => {
    setEditingNote({ ...editingNote, [key]: value });
  };

  // const updateNotes = (id) => {
  //   setNotes(notes.map(item =>
  //     item.id === id ? note : item
  //   ));
  // };

  //     const updateNotes = (key) => {
  //   setNotes(notes.map(item =>
  //     item.key === key ? editingNote : item
  //   ));
  // };

  const handleChange = (value) => {
    updateNote("content", value);
  };

  const addNote = () => {
    if (!note.content) {
      return;
    }
    setNotes((prevNotes) => [...prevNotes, note]);
    setNote(initialNote);
  };

  const delNote = async (key) => {
    setNotes(notes.filter((prevNote) => prevNote.key !== key));
    setSelectedTags([]);
  };

  const editNote = (note) => {
    setEditingNote(note);
  };

  const handleEditChange = (e) => {
    updateEditingNote("content", e);
  };

  const saveEdit = () => {
    setNotes(
      notes.map((item) => {
        if (item.key === editingNote.key) {
          return editingNote;
        }
        return item;
      })
    );

    setEditingNote({});
  };

  const enter = (e, type) => {
    if (e.key === "Enter" && type === "new" && note.content) {
      e.preventDefault();
      addNote(note);
    } else if (e.key === "Enter" && type === "edit" && editingNote.content) {
      e.preventDefault();
      saveEdit();
    }
  };

  const handleMouseDown = (e, note) => {
    const rect = e.target.getBoundingClientRect();
    setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setDraggedNote(note.key);
  };

  // const handleMouseMove = (e) => {
  //   if (draggedNote) {
  //     setEditingNote({
  //       ...editingNote,
  //       position: {
  //         x: e.clientX - dragOffset.x,
  //         y: e.clientY - dragOffset.y -42
  //       }
  //     });
  //     updateNotes(editingNote.key);
  //   }
  // }

  // const handleMouseUp = () => {
  //   // setIsDragging(false);
  //   setDraggedNote(null);
  // }

  // const handleMouseMove = (e) => {
  //   if (draggedNote) {
  //     // console.log('fired')
  //     setNotes(notes.map(note => {
  //       if (note.key === draggedNote) {
  //         return {
  //           ...note,
  //           position: {
  //             x: e.clientX - dragOffset.x,
  //             y: e.clientY - dragOffset.y - 42
  //           }
  //         };
  //       }
  //       return note;
  //     })
  //   )
  //   }
  // };
  // console.log(refs.current[draggedNote].offsetLeft)

  // console.log(refs.current[draggedNote].style)

  const handleMouseMove = (e) => {
    if (draggedNote) {
      refs.current[draggedNote].style.transform = `translate(${
        e.clientX - dragOffset.x
      }px, ${e.clientY - dragOffset.y - 66}px)`;
      // console.log(refs.current[draggedNote].getBoundingClientRect())
    }
  };
  const handleMouseUp = (e) => {
    if (!draggedNote) {
      return;
    }
    const rect = refs.current[draggedNote].getBoundingClientRect();
    // console.log(rect.x, rect.y)

    if (draggedNote !== note.key) {
      setNotes(
        notes.map((note) => {
          if (note.key === draggedNote) {
            return {
              ...note,
              position: {
                x: rect.x,
                y: rect.y - 66,
              },
            };
          }
          return note;
        })
      );
    } else {
      updateNote("position", { x: rect.x, y: rect.y - 66 });
      // console.log(draggedNote)
    }

    setDraggedNote(null);
  };

  const makeFavorite = (key) => {
    setNotes(
      notes.map((note) => {
        if (note.key === key) {
          return {
            ...note,
            isFavorite: !note.isFavorite,
          };
        }
        return note;
      })
    );
  };

  const addTag = (key) => {
    const tag = refs.current[key].children[2].children[0].value;
    if (!refs.current[key].children[2].children[0].value.trim()) return;
    setNotes(
      notes.map((note) => {
        if (note.key === key && !note.tags.includes(tag)) {
          return {
            ...note,
            tags: [
              ...note.tags,
              refs.current[key].children[2].children[0].value,
            ],
          };
        }
        return note;
      })
    );
    refs.current[key].children[2].children[0].value = "";

    // console.log(refs.current[key].children[2].children[0].value)
  };

  const getalltags = () => {
    const tagset = new Set();
    notes.forEach((note) => {
      note.tags.forEach((tag) => tagset.add(tag));
    });
    return Array.from(tagset);
  };

  // console.log(selectedTags)

  const filteredNotes = notes.filter((note) => {
    if (selectedTags.length === 0 && searched.length === 0) return true;
    return (
      selectedTags.every((tag) => note.tags.includes(tag)) &&
      note.content.includes(searched)
    );
  });

  const handleSelected = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handlesearch = (e) => {
    setSearched(e.target.value);
  };

  const deleteTag = (key, tagg) => {
    setNotes(
      notes.map((note) =>
        note.key === key
          ? { ...note, tags: note.tags.filter((tag) => tag !== tagg) }
          : note
      )
    );
  };

  return (
    <div
      className="my-container"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="flex gap-2 justify-center">
        {getalltags().map((tag) => {
          return (
            <button
              className={`rounded p-0.5 ${
                selectedTags.includes(tag)
                  ? " border-slate-900 bg-slate-800 text-white border-2"
                  : "  border-2  "
              } cursor-pointer`}
              onClick={() => handleSelected(tag)}
              key={tag}
            >
              {tag}
            </button>
          );
        })}
      </div>
      <div className="flex justify-center">
        <input
          className="rounded-lg w-2/5"
          onChange={handlesearch}
          value={searched}
        />
      </div>

      <div
        className="note bg-yellow-100 shadow-lg rounded-lg"
        style={{
          transform: `translate(${note.position.x}px, ${note.position.y}px)`,
          cursor: draggedNote === note.key ? "grabbing" : "grab",
        }}
        ref={(el) => (refs.current[note.key] = el)}
      >
        <div
          className="upper bg-opacity-50 bg-white p-2 rounded-t-lg flex justify-end items-center"
          onMouseDown={(e) => {
            handleMouseDown(e, note);
          }}
        >
          <div className="flex gap-2">
            <button
              onClick={() => addNote()}
              className="text-gray-600 hover:text-green-500 hover:transform hover:scale-150 transition-all"
            >
              <Save size={16} />
            </button>
          </div>
        </div>
        <textarea
          className="p-3 w-full resize-none"
          value={note.content || ""}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Write a note..."
          onKeyDown={(e) => enter(e, "new")}
        />
      </div>

      {filteredNotes.map((note) => (
        <div
          className={`note bg-yellow-100 shadow-lg rounded-lg transform`}
          key={note.key}
          ref={(el) => (refs.current[note.key] = el)}
          style={{
            transform: `translate(${note.position.x}px, ${note.position.y}px)`,
            cursor: draggedNote === note.key ? "grabbing" : "grab",
          }}
        >
          <div
            className="upper bg-opacity-50 bg-white p-2 rounded-t-lg flex justify-end items-center"
            onMouseDown={(e) => {
              handleMouseDown(e, note);
            }}
          >
            <div className="flex gap-2">
              <button
                onClick={() => makeFavorite(note.key)}
                className={`text-red-500 hover:transform hover:scale-110 transition-all`}
              >
                <Heart
                  className={`hover:fill-red-500 ${
                    note.isFavorite === true ? "fill-red-500" : "none"
                  }`}
                />
              </button>

              <button
                onClick={() => saveEdit()}
                className={`text-gray-600 hover:text-green-500 hover:transform hover:scale-150 transition-all ${
                  note.key === editingNote.key ? "block" : "hidden"
                }`}
              >
                <Save size={16} />
              </button>

              <button
                onClick={() => delNote(note.key)}
                className="text-gray-600 justify-end hover:text-red-600 hover:transform hover:scale-150 transition-all"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          <textarea
            onClick={() => editNote(note)}
            className="p-3 w-full resize-none"
            value={
              note.key === editingNote.key ? editingNote.content : note.content
            }
            onChange={(e) => handleEditChange(e.target.value)}
            onKeyDown={(e) => enter(e, "edit")}
          />
          <div className="flex">
            <input
              type="text"
              placeholder="Add tags"
              className="w-2/3 flex-1 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              onClick={() => addTag(note.key)}
              className="w-fit text-neutral-800 rounded-lg"
            >
              <Tag size={17}/>
            </button>
          </div>
          <div className=" w-fit text-white my-1 rounded-lg flex gap-1">
            {note.tags.map((tag) => {
              return (
                <div className="flex items-center border rounded-lg p-1">
                    <div
                      key={tag}
                      className="text-sm text-blue-900  "
                    >
                      {tag}
                    </div>
                    <X size={15}
                    className="cursor-pointer hover:text-red-600 text-blue-900"
                    onClick={() => deleteTag(note.key, tag)}
                  />
                </div>

              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Note;
