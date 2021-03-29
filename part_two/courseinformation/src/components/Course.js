import React from 'react';

const Part = (props) => {
    return(
        <div>
            {props.courses.map(course => <p key={course.id}>{course.name} {course.exercises}</p>)}
        </div>
    );
}

const Header = (props) => {
    return(
        <div>
            <h2>{props.title}</h2>
        </div>
    );
}

const Content = (props) => {
    return(
        <div>
            <Part courses={props.courses} />
        </div>
    );
}

const Course = (props) => {
    return (
        <div>
            <Header title={props.title}/>
            <Content courses={props.courses} />
        </div>
    );
}

export default Course