import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddBabysitterPage = ({ isUpdate, babyshitter }) => {
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [gender, setGender] = useState('')
  const [location, setLocation] = useState('')
  const [email, setEmail] = useState('')
  const [description, setDescription] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async event => {
    event.preventDefault()
    const payload = { firstName, lastName, gender, location, email, password, description }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/babysitters${isUpdate ? `/${babysitter.id}` : ''}`,
        {
          method: isUpdate ? 'PUT' : 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-type': 'application/json',
          },
        }
      )
      console.log(response)
      if (response.ok) {
        const currentBabysitter = await response.json()
        console.log(currentBabysitter)
        navigate(`/projects/${currentBabysitter.id}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isUpdate && babysitter) {
      setFirstName(babysitter.firstName)
      setLastName
      setDescription(babysitter.description)

      [lastName, setLastName] = useState('')
      const [gender, setGender] = useState('')
      const [location, setLocation] = useState('')
      const [email, setEmail] = useState('')
      const [description, setDescription] = useState('')
      const [password, setPassword] = useState('')



    }
  }, [project])

  return (
<>
    <h1>Are you a babysitter?</h1>
    <p>Only a few seconds to register...350,000 people recommend the site. I promise, you won't be disappointed!</p>
    <form style={{ display: 'grid', gridTemplate: 'auto / 1fr' }} onSubmit={onSubmit}>
      <label>
        Title
        <input value={title} onChange={event => setTitle(event.target.value)} required />
      </label>
      <label>
        Description
        <input
          value={description}
          onChange={event => setDescription(event.target.value)}
          required
        />
      </label>
      <button type='submit'>{isUpdate ? 'Update' : 'Create'}</button>
    </form>
    </>
  )
}

export default AddBabysitterPage
