import React from 'react';

const Greet = (props) => {
  return (
    <div>
      <p>Hello {props.name}!</p>
    </div>
  )
}

const App = () => {
  const now = new Date();
  const a = 10;
  const b = 20;

  return (
    <div>
      <p>The date now is {now.toString()}</p>
      <p>
        {a} plus {b} is {a + b}
      </p>
      <Greet name="John" />
    </div>
  )
}

export default App