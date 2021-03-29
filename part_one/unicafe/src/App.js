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

const App = () => {
  const [allGoods, setAllGoods] = useState([])
  const [allNeutrals, setAllNeutrals] = useState([])
  const [allBads, setAllBads] = useState([])

  return (
    <div>
      <h2>Unicafe</h2>
      <button onClick={() => setAllGoods(allGoods + 1)}>Good</button>
      <button onClick={() => setAllNeutrals(allNeutrals + 1)}>Neutral</button>
      <button onClick={() => setAllBads(allBads + 1)}>Bad</button>
      <h2>Statistics</h2>
      <p>Good: {allGoods.length}</p>
      <p>Neutral: {allNeutrals.length}</p>
      <p>Bad: {allBads.length}</p>
      <All 
        goods={allGoods.length} 
        neutrals={allNeutrals.length} 
        bads={allBads.length}
      />
      <Average 
        goods={allGoods.length} 
        neutrals={allNeutrals.length} 
        bads={allBads.length}
      />
      <PositiveProportion 
        goods={allGoods.length} 
        neutrals={allNeutrals.length} 
        bads={allBads.length}
      />
    </div>
  )
}

export default App