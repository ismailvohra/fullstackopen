import { useState } from 'react'

const Statistics = (props) => {
  if (props.total === 0){
    return (
      <p>No feedback given</p>
    )
  }

  return (
  <div>
  <h1>statistics</h1>
  <table><tbody>
  <StatisticLine text="good" value ={props.good} />
  <StatisticLine text="neutral" value ={props.neutral} />
  <StatisticLine text="bad" value ={props.bad} />
  <StatisticLine text="all" value={props.total}/>
  <StatisticLine text="average" value={(props.good-props.bad)/props.total}/>
  <StatisticLine text="positive" value={(props.good*100)/props.total} />
  </tbody>
  </table>
  </div>
  )
}


const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({text, value}) => {
  if (text === "positive"){
    return(
    <tr><td>{text}</td><td>{value}%</td></tr>
    )
  }
  return (
  <tr><td>{text}</td><td>{value}</td></tr>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const goodButton = () => {
    setGood(good+1)
    setTotal(total+1)
  }

  const neutralButton = () => {
    setNeutral(neutral+1)
    setTotal(total + 1)
  }

  const badButton = () => {
    setBad(bad+1)
    setTotal(total + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={goodButton} text="good" />
      <Button onClick={neutralButton} text="neutral" />
      <Button onClick={badButton} text="bad" />
      <Statistics good={good} bad={bad} neutral={neutral} total={total}  />
    </div>
  )
}

export default App