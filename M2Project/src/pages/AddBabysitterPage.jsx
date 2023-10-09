import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {v4 as uuidv4} from 'uuid' 

const AddBabysitterPage = ({ isUpdate, babysitter }) => {
  const navigate = useNavigate()

  const [gender, setGender] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [streetName, setStreetName] = useState('')
  const [streetNumber, setStreetNumber] = useState('')
  const [cityName, setCityName] = useState('')
  const [postcode, setPostcode] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [description, setDescription] = useState('')
  const [largePic, setLargePic] = useState('')
  const [registered, setRegistered] = useState('')

  const onSubmit = async event => {
    event.preventDefault()
    const payload = { 
      name:{ first: firstName, last: lastName,}, 
      gender, 
      email, 
      password, 
      location: { street: {name: streetName, number: streetNumber}, city: cityName, postcode: postcode}, 
      resgistered: {age: registered},
      description, 
      picture: {large: largePic},
      id: uuidv4()}
console.log(payload)

    try {
      const response = await fetch(
        `http://localhost:5005/babysitters`,
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
        navigate(`/babysitters`)      }
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
      setStreetNumber(babysitter.streetNumber)
      setStreetName(babysitter.streetName)
      setCityName(babysitter.cityName)
      setPostcode(babysitter.postcode)
      setEmail(babysitter.email)
      setPassword(babysitter.password)
      setLargePic(babysitter.largePic)
      setRegistered(babysitter.registered.age)
    }
  }, [babysitter])

  return (
    <>
        <h1>Are you a nanny?</h1>
        <p>Only a few clicks away to register...350,000 people said they would recommend this website to their friends/families. I promise, you won't be disappointed!</p>
        <form style={{ display: 'grid', gridTemplate: 'auto / 1fr' }} onSubmit={onSubmit}>
        <label>
            I am 
            <select value={gender} onChange={event => setGender(event.target.value)} >
            <option value="male">Male</option>
            <option value="female">Female</option>
            </select>
          </label>
          <label>
            First Name
            <input value={firstName} onChange={event => setFirstName(event.target.value)}  />
          </label>
          <label>
            Last Name
            <input value={lastName} onChange={event => setLastName(event.target.value)}  />
          </label>
          <label>
            Street Number
            <input value={streetNumber} onChange={event => setStreetNumber(event.target.value)}  />
          </label>
          <label>
            Street Name
            <input value={streetName} onChange={event => setStreetName(event.target.value)}  />
          </label>
          <label>
            City Name
            <input value={cityName} onChange={event => setCityName(event.target.value)}  />
          </label>
          <label>
            Postcode
            <input value={postcode} onChange={event => setPostcode(event.target.value)}  />
          </label>
          <label>
            Email
            <input value={email} onChange={event => setEmail(event.target.value)}  />
          </label>
          <label>
            Password
            <input value={password} onChange={event => setPassword(event.target.value)} />
          </label>
          <label>
            Experience
            <input value={registered} onChange={event => setRegistered(event.target.value)}/>
          </label>
          <label>
            Description
            <textarea value={description} onChange={event => setDescription(event.target.value)} />
          </label>
          <label>
            Picture
            <input type="file" accept="image/*" value={largePic} onChange={event => setLargePic(event.target.value)}/>
        </label>
        <button type="submit">Create your account</button>
        </form>
    </>
  )
}

export default AddBabysitterPage
