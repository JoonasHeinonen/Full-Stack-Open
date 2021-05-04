import React, { useState } from 'react';

const NoteForm = ({ createNote }) => {
    const [ newNote, setNewNote] = useState('');

    const handleChange = (e) => {
        setNewNote(e.target.value);
    };

    const addNote = (e) => {
        e.preventDefault();
        createNote({
            content: newNote,
            important: Math.random() > 0.5,
        });
        
        setNewNote('');
    };

    return (
        <div>
            <form onSubmit={addNote}>
                <input
                    value={ newNote }
                    onChange={ handleChange }
                />
                <button type='submit'>Save</button>
            </form>
        </div>
    );
};

export default NoteForm;