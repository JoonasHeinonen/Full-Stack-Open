import React from 'react'

const Contact = (props) => {
    return (
        <div>
            <p>{props.name} {props.number}</p>
            <button onClick={props.deleteEntity}>delete</button>
        </div>
    );
}

export default Contact;