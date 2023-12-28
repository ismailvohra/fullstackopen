const Header = (props) => {
    return (
      <>
      <h1>{props.coursename}</h1>
      </>
    )
  }
  
  const Part = (props) => {
    return (
      <div>
        <p>{props.name} {props.exercises}</p>
      </div>
    )
  }
  
  const Content = ({part}) => {
    return (
      <div>
        <Part name={part.name} exercises={part.exercises} />
      </div>
    )
  }
  
  const Total = (props) => {
    const total = props.parts.reduce((total, part) => (
      total + part.exercises
    ),0)
    return (
      <h4>total of {total} exercises</h4>
    )
  }
  
  const Course = ({course}) => {
    const parts = course.parts
  
    return (
      <div>
        <Header coursename={course.name} />
        {parts.map(part => 
        <Content key={part.id} part={part} />)}
        <Total parts={parts} />
      </div>
    )
  }

export default Course