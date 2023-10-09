import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddBabysitterPage = ({ isUpdate, babysitter }) => {
  const navigate = useNavigate()

  const [gender, setGender] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
 

  const onSubmit = async event => {
    event.preventDefault()
    const payload = { firstName, lastName, gender, location, email, password, description }

    try {
      const response = await fetch(
        `http://localhost:5005/babysitters/new`,
        {
          method: 'PUT',
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
        navigate(`/babysitters/new2`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isUpdate && babysitter) {
      setGender(babysitter.gender)
      setFirstName(babysitter.firstName)
      setLastName(babysitter.lastName)
      setEmail(babysitter.email)
      setPassword(babysitter.password)
    }
  }, [babysitter])

  return (
    <>
        <h1>Are you a nanny?</h1>
        <p>Only a few clicks away to register...350,000 people said they would recommend this website to their friends/families. I promise, you won't be disappointed!</p>
        <form style={{ display: 'grid', gridTemplate: 'auto / 1fr' }} onSubmit={onSubmit}>
        <label>
            I am 
            <select value={gender} onChange={event => setGender(event.target.value)} required>
            <option value="male">Male</option>
            <option value="female">Female</option>
            </select>
          </label>
          <label>
            First Name
            <input value={firstName} onChange={event => setFirstName(event.target.value)} required />
          </label>
          <label>
            Last Name
            <input value={lastName} onChange={event => setLastName(event.target.value)} required />
          </label>
          <label>
            Email
            <input value={email} onChange={event => setEmail(event.target.value)} required />
          </label>
          <label>
            Password
            <input value={password} onChange={event => setPassword(event.target.value)} required />
          </label>
          <button type='submit'>Create your account</button>
        </form>
    </>
  )
}

export default AddBabysitterPage
