import React from 'react'

const Contact = (props) => {
    return (
        <div>
            <p>{props.name} {props.number}</p>
        </div>
    );
}

export default Contact;