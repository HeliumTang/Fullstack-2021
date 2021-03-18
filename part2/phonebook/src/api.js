import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject)
  console.log(response)
  return response.data
}

const remove = async (id) => {
  try {
    await axios.delete(`${baseUrl}/${id}`)
  } catch (error) {
    throw error
  }
}

const update = async (id, changedObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, changedObject)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, remove, update }
