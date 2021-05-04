import React, { useState, useEffect, useRef } from 'react';

import Note from './components/Note';
import Notification from './components/Notification';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import NoteForm from './components/NoteForm';
import Togglable from './components/Togglable';

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
    const [loginVisible, setLoginVisible] = useState(false);

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

    const addNote = (noteObject) => {
        noteFormRef.current.toggleVisibility();
        noteService
            .create(noteObject)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote));
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
                <Togglable buttonLabel='login'>
                    <LoginForm
                        username={username}
                        password={password}
                        handleUsernameChange={({ target }) => setUsername(target.value)}
                        handlePasswordChange={({ target }) => setPassword(target.value)}
                        handleSubmit={handleLogin}
                    />
                </Togglable>
            </div>
        );
    };

    const noteFormRef = useRef();

    const noteForm = () => {
        <Togglable buttonLabel='New note' ref={noteFormRef}>
            <NoteForm
                createNote={addNote}
            />
        </Togglable>
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
                    <Note 
                        key={note.id}
                        note={note}
                        toggleImportance={() => toggleImportanceOf(note.id)}
                    />
                )}
            </ul>
            <Footer />
        </div>
    );
};

export default App;
