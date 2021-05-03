import React, { useState, useEffect } from 'react';
import Note from './components/Note';
import Notification from './components/Notification';
import Footer from './components/Footer';

import noteService from './services/notes';
import loginService from './services/login';

const App = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [showAll, setShowAll] = useState(true);
    const [errorMessage, setErrorMessage] = useState('some error happened...');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        noteService
            .getAll()
            .then(initialNotes => {
                setNotes(initialNotes);
            });

    }, []);

    useEffect(() => {
        const loggedUserJson = window.localStorage.getItem('loggedNoteappUser');
        if (loggedUserJson) {
            const user = JSON.parse(loggedUserJson);
            noteService.setToken(user.token);
        }
    }, []);

    console.log('render', notes.length, 'notes');

    const addNote = (e) => {
        e.preventDefault();

        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5,
            id: notes.length + 1,
        };

        noteService
            .create(noteObject)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote));
                setNewNote('');
            });
    };

    const toggleImportanceOf = (id) => {
        const note = notes.find(n => n.id === id);
        const changedNote = { ...note, important: !note.important };

        noteService
            .update(id, changedNote).then(returnedNote => {
                setNotes(notes.map(note => note.id !== id ? note : returnedNote));
            })
            .catch(error => {
                setErrorMessage(
                    `Note '${note.content}' was already removed from the server...`
                );
                setTimeout(() => {
                    setErrorMessage(null);
                }, 5000);
                setNotes(notes.filter(n => n.id !== id));
            });
    };

    const handleNoteChange = (e) => {
        setNewNote(e.target.value);
    };

    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important === true);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const user = await loginService.login({
                username, password
            });

            window.localStorage.setItem(
              'loggedNoteappUser', JSON.stringify(user)
            );
            noteService.setToken(user.token);
            setUser(user);
            setUsername('');
            setPassword('');
        } catch (exception) {
            setErrorMessage('wrong credentials');
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }

        console.log('logging in with ', username, password);
    };

    const loginForm = () => {
        return (
            <div>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div>
                    username
                        <input
                            type='text'
                            value={username}
                            name='Username'
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
                    password
                        <input
                            type='password'
                            value={password}
                            name='Password'
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button type='submit'>Login</button>
                </form>
            </div>
        );
    };

    const noteForm = () => {
        return (
            <div>
                <form onSubmit={addNote}>
                    <input
                        value={ newNote }
                        onChange={ handleNoteChange }
                    />
                    <button type='submit'>Save</button>
                </form>
            </div>
        );
    };

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />

            {user === null ?
                loginForm() :
                <div>
                    <p>{user.name} logged in</p>
                    {noteForm()}
                </div>
            }

            <div>
                <button onClick={() => setShowAll(!showAll)}>
                  show {showAll ? 'important' : 'all' }
                </button>
            </div>
            <ul>
                {notesToShow.map(note =>
                    <Note key={note.id}
                        note={note}
                        toggleImportance={() => toggleImportanceOf(note.id)}
                    />
                )}
            </ul>
            <form onSubmit={addNote}>
                <input
                    value={newNote}
                    onChange={handleNoteChange}
                />
                <button type="submit">save</button>
            </form>
            <Footer />
        </div>
    );
};

export default App;
