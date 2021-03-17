import React, { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  ]

  const arr = Array(anecdotes.length).fill(0)

  const [selected, setSelected] = useState(0)
  const [mostVoted, setMostVoted] = useState(0)
  const [votes, setVotes] = useState(arr)

  const handleVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes([...copy])

    const most = copy.indexOf(Math.max(...copy))
    setMostVoted(most)
  }

  const handleNext = () => {
    let next = 0
    do {
      next = Math.floor(Math.random() * anecdotes.length)
    } while (next === selected)

    setSelected(next)
  }

  return (
    <div>
      <div>
        <h2>Anecdote of the day</h2>
        <div>{anecdotes[selected]}</div>
        <div>has {votes[selected]}</div>
        <Button handleClick={handleVote} text="vote" />
        <Button handleClick={handleNext} text="next anecdote" />
      </div>
      <div>
        <h2>Anecdote with most votes</h2>
        <div>{anecdotes[mostVoted]}</div>
        <div>has {votes[mostVoted]}</div>
      </div>
    </div>
  )
}

export default App
