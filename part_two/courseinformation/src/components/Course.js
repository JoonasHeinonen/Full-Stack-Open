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

const Total = (props) => {
    const exercises = props.courses;

    let total = exercises.reduce(function (all, part) {
        return all + part.exercises
    }, 0)

    return (
        <div>
            <p><b>
                Total of {total} exercises
            </b></p>
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
            <Total courses={props.courses}/>
        </div>
    );
}

export default Course