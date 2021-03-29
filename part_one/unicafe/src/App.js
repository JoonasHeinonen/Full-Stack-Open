import React, { useState } from 'react'

const MostPopularAnecdote = (props) => {
  return (
    <div>
      <h2>Anecdote with most votes</h2>
      <p>{props.value}</p>
      <p>{props.index} anecdote has {props.points} points</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(
    new Array(anecdotes.length + 1)
      .join('0')
      .split('')
      .map(parseFloat)
  );
  const [popular, setPopular] = useState(4);
  
  let selectRandom = () => {
    let select = Math.floor(Math.random() * anecdotes.length);
    setSelected(select);
    return select;
  }

  let vote = (selectedAnecdote) => {
    const copy = [...points]
    copy[selectedAnecdote] += 1;
    setPoints(copy);

    if (copy[selectedAnecdote] > points[popular]) {
      setPopular(selectedAnecdote)
    }
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <div>
        {anecdotes[selected]}
      </div>
      <button onClick={() => { vote (selected)}}>vote</button>
      <button onClick={selectRandom}>next anecdote</button>
      <p>Current quote {selected} has {points[selected]} points. </p>
      <MostPopularAnecdote value={anecdotes[popular]} index={selected} points={points[popular]} />
    </div>
  )
}

export default App