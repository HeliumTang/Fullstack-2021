const Filter = ({ value, handleChange }) => {
  return (
    <div>
      filter shown with
      <input type="search" value={value} onChange={handleChange} />
    </div>
  )
}

export default Filter
