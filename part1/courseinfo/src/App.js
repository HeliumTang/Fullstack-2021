import React from 'react'

const Header = ({course}) => {
  return <h1>{course}</h1>
}

const Part = ({name, exercises}) => {
  return <p>{name} {exercises}</p>
}
const Content = ({parts}) => {
  return <>
  {parts.map(({name, exercises}) => <Part name={name} exercises={exercises} />)}
  </>
}

const Total = ({parts}) => {
  return <p>Number of exercises {parts.reduce((prev, cur) => prev + cur.exercises, 0)}</p>
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </div>
  )
}

export default App