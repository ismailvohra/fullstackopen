const Header = (props) => {
  return (
    <>
    <p>Name of the course: {props.course}</p>
    </>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>Name of the Part is: {props.name}</p>
      <p>Number of exercises: {props.exercises}</p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name={props.name1} exercises={props.ex1} />
      <Part name={props.name2} exercises={props.ex2} />
      <Part name={props.name3} exercises={props.ex3} />
    </div>
  )
}



const Total = (props) => {
  return (
    <>
    <p>Total exercises: {props.total}</p>
    </>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {name: 'Fundamentals of React', exercises:10},
    {name: 'Using props to pass data', exercises:7},
    {name: 'State of a component', exercises: 14}
  ]

  return (
    <div>
      <Header course={course} />
      <Content name1={parts[0].name} name2={parts[1].name} name3={parts[2].name} ex1={parts[0].exercises} ex2={parts[1].exercises} ex3={parts[2].exercises} />
      <Total total={parts[0].exercises+parts[1].exercises+parts[2].exercises} />
    </div>
  )
}

export default App