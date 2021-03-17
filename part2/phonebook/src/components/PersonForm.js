const PersonForm = ({
  handleSubmit,
  name,
  handleNameChange,
  phone,
  handlePhoneChange,
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={name} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={phone} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm
