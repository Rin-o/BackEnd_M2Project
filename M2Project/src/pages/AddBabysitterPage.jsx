import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddBabysitterPage = ({ isUpdate, babysitter }) => {
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
      setLastName(babysitter.lastName)
      setGender(babysitter.gender)
      setDescription(babysitter.description)
      setLocation(babysitter.gender)
      setEmail(babysitter.email)
      setPassword(babysitter.password)
    }
  }, [babysitter])

  return (
<>
    <h1>Are you a babysitter?</h1>
    <p>Only a few seconds to register...350,000 people recommend the site. I promise, you won't be disappointed!</p>
    <form style={{ display: 'grid', gridTemplate: 'auto / 1fr' }} onSubmit={onSubmit}>
      <label>
        First Name
        <input value={firstName} onChange={event => setFirstName(event.target.value)} required />
      </label>
      <label>
        Last Name
        <input value={lastName} onChange={event => setLastName(event.target.value)} required />
      </label>
      <label>
        Address
        <input value={location} onChange={event => setFirstName(event.target.value)} required />
      </label>
      <label>
        I am 
        <select value={gender} onChange={event => setLastName(event.target.value)} required />
        <option value="male">Male</option>
        <option value="female">Female</option>
      </label>
      <label>
        Email
        <input value={email} onChange={event => setFirstName(event.target.value)} required />
      </label>
      <label>
        Password
        <input value={password} onChange={event => setFirstName(event.target.value)} required />
      </label>
      <label>
        Description
        <input value={description} onChange={event => setDescription(event.target.value)} required/>
      </label>
      <button type='submit'>{isUpdate ? 'Update' : 'Create'}</button>
    </form>
    </>
  )
}

export default AddBabysitterPage
