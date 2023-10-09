import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddBabysitterPage = ({ isUpdate, babysitter, formData }) => { //added
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [gender, setGender] = useState('')
  const [location, setLocation] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [description, setDescription] = useState('')
  const [picture, setPicture] = useState(null)

  const onSubmit = async event => {
    event.preventDefault()
    const payload = { firstName, lastName, gender, location, email, password, description, picture }

    try {
      const response = await fetch(
        `http://localhost:5005/babysitters/new2/${isUpdate ? `/${babysitter.id}` : ''}`,
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
        navigate(`/babysitters/${currentBabysitter.id}`)
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
        <h1>Are you a nanny?</h1>
        <p>Only a few clicks away to register...350,000 people said they would recommend this website to their friends/families. I promise, you won't be disappointed!</p>
        
        <p>First Name: {formData.firstName}</p>
        <p>Last Name: {formData.lastName}</p>
        <p>Email: {formData.email}</p>
        <p>Password: {formData.password}</p>
        <form style={{ display: 'grid', gridTemplate: 'auto / 1fr' }} onSubmit={onSubmit}>
        {/*<label>
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
  </label>*/}
          <label>
            Address
            <input value={location} onChange={event => setLocation(event.target.value)} required />
          </label>
          <label>
            Description
            <textarea value={description} onChange={event => setDescription(event.target.value)} required/>
          </label>
          <label>
            Picture
            <input type="file" accept="image/*" value={picture} onChange={event => setPicture(event.target.value)}/>
        </label>
          <button type='submit'>{isUpdate ? 'Update' : 'Create your account'}</button>
        </form>
    </>
  )
}

export default AddBabysitterPage
