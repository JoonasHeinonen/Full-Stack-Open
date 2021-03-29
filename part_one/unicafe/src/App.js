import React, { useState } from 'react';

const All = (props) => {
  return (
    <div>
      <p>{props.goods + props.neutrals + props.bads}</p>
    </div>
  )
}

const Average = (props) => {
  return (
    <div>
      <p>{(props.goods + (props.neutrals * 0) + (props.bads * -1)) / (props.goods + props.neutrals + props.bads)}</p>
    </div>
  )
}

const PositiveProportion = (props) => {
  return (
    <div>
      <p>{((props.goods) / (props.goods + props.neutrals + props.bads)) * 100} %</p>
    </div>
  )
}

const StatisticsLine = (props) => {
  return (
    <div>
      <p>{props.value}</p>
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.setValue}>
      {props.name}
    </button>
  )
}


const Statistics = (props) => {
  if (props.allGoods.length === 0 &&
      props.allNeutrals.length === 0 &&
      props.allBads.length === 0
  ) {
    return (
      <div>
        <h2>Unicafe</h2>
        <Button name ="Good" setValue={() => props.setAllGoods(props.allGoods + 1)}/>
        <Button name ="Neutral" setValue={() => props.setAllNeutrals(props.allNeutrals + 1)}/>
        <Button name ="Bad" setValue={() => props.setAllBads(props.allBads + 1)}/>
        <p>No feedback given.</p>
      </div>
    )
  }
  return (
    <div>
      <h2>Unicafe</h2>
      <Button name ="Good" setValue={() => props.setAllGoods(props.allGoods + 1)}/>
      <Button name ="Neutral" setValue={() => props.setAllNeutrals(props.allNeutrals + 1)}/>
      <Button name ="Bad" setValue={() => props.setAllBads(props.allBads + 1)}/>
      <h2>Statistics</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <p>Good</p>
            </td>
            <td>
              <StatisticsLine value={props.allGoods.length}/>
            </td>
          </tr>
          <tr>
            <td>
              <p>Neutral</p>
            </td>
            <td>
              <StatisticsLine value={props.allNeutrals.length}/>
            </td>
          </tr>
          <tr>
            <td>
              <p>Bad</p>
            </td>
            <td>
              <StatisticsLine value={props.allBads.length}/>
            </td>
          </tr>
          <tr>
            <td>
              <p>In total</p>
            </td>
            <td>
              <All 
                goods={props.allGoods.length} 
                neutrals={props.allNeutrals.length} 
                bads={props.allBads.length}
              />
            </td>
          </tr>
          <tr>
            <td>
              <p>Average</p>
            </td>
            <td>
              <Average 
                goods={props.allGoods.length} 
                neutrals={props.allNeutrals.length} 
                bads={props.allBads.length}
              />
            </td>
          </tr>
          <tr>
            <td>
              <p>Positive</p>
            </td>
            <td>
              <PositiveProportion 
                goods={props.allGoods.length} 
                neutrals={props.allNeutrals.length} 
                bads={props.allBads.length}
              />
            </td>
          </tr>
        </tbody>
      </table>
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