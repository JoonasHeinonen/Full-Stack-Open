import React, { useState } from 'react';

const All = (props) => {
  return (
    <div>
      <p>all: {props.goods + props.neutrals + props.bads}</p>
    </div>
  )
}

const Average = (props) => {
  return (
    <div>
      <p>average: {(props.goods + (props.neutrals * 0) + (props.bads * -1)) / (props.goods + props.neutrals + props.bads)}</p>
    </div>
  )
}

const PositiveProportion = (props) => {
  return (
    <div>
      <p>average: {((props.goods) / (props.goods + props.neutrals + props.bads)) * 100} %</p>
    </div>
  )
}

const Statistics = (props) => {
  return (
    <div>
      <h2>Unicafe</h2>
      <button onClick={() => props.setAllGoods(props.allGoods + 1)}>Good</button>
      <button onClick={() => props.setAllNeutrals(props.allNeutrals + 1)}>Neutral</button>
      <button onClick={() => props.setAllBads(props.allBads + 1)}>Bad</button>
      <h2>Statistics</h2>
      <p>Good: {props.allGoods.length}</p>
      <p>Neutral: {props.allNeutrals.length}</p>
      <p>Bad: {props.allBads.length}</p>
      <All 
        goods={props.allGoods.length} 
        neutrals={props.allNeutrals.length} 
        bads={props.allBads.length}
      />
      <Average 
        goods={props.allGoods.length} 
        neutrals={props.allNeutrals.length} 
        bads={props.allBads.length}
      />
      <PositiveProportion 
        goods={props.allGoods.length} 
        neutrals={props.allNeutrals.length} 
        bads={props.allBads.length}
      />
    </div>
  )
}

const App = () => {
  const [allGoods, setAllGoods] = useState([])
  const [allNeutrals, setAllNeutrals] = useState([])
  const [allBads, setAllBads] = useState([])

  return (
    <div>
      <Statistics 
        setAllGoods={setAllGoods}
        setAllNeutrals={setAllNeutrals}
        setAllBads={setAllBads}
        allGoods={allGoods}
        allNeutrals={allNeutrals}
        allBads={allBads}
      />
    </div>
  )
}

export default App