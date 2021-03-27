import React from 'react';

const Header = (props) => {
  return(
    <div>
      <p>{props.course}</p>
    </div>
  )
}

const Part = (props) => {
  return (
    <p>{props.part} {props.exercises}</p>
  );
}

const Content = (props) => {
  return(
    <div>
      <Part part={props.part1} exercises={props.exercises1} />
      <Part part={props.part2} exercises={props.exercises2} />
      <Part part={props.part3} exercises={props.exercises3} />
    </div>
  )
}

const Total = (props) => {
  return(
    <div>
      <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
    </div>
  )
}

const AppOld = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  return (
    <div>
      <Header course={course}/>
      <Content part1={part1} 
               exercises1={exercises1}
               part2={part2}
               exercises2={exercises2}
               part3={part3}
               exercises3={exercises3}
      />
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3}  />
    </div>
  );
}


const App = () => {
  const course = 'Half Stack application development';
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  };
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  };
  const part3 = {
    name: 'State of a component',
    exercises: 14
  };

  return (
    <div>
      <Header course={course}/>
      <Content part1={part1.name} 
               exercises1={part1.exercises}
               part2={part2.name}
               exercises2={part2.exercises}
               part3={part3.name}
               exercises3={part3.exercises}
      />
      <Total exercises1={part1.exercises} exercises2={part2.exercises} exercises3={part3.exercises}  />
    </div>
  );
}

export default App;
