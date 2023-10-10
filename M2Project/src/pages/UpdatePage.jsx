import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const UpdatePage = () => {
    
    const {babysitterId} = useParams()
    const navigate = useNavigate()

    const [gender, setGender] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [age, setAge] = useState(0)
    const [streetName, setStreetName] = useState('')
    const [streetNumber, setStreetNumber] = useState(0)
    const [cityName, setCityName] = useState('')
    const [postcode, setPostcode] = useState(0)
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [description, setDescription] = useState('')
    const [picture, setPicture] = useState('')
    const [experience, setExperience] = useState(0)
    
    const onSubmit = async event => {
        event.preventDefault()
        const payload = { 
          name:{first: firstName, last: lastName,}, 
          gender, 
          age,
          email, 
          phone,
          password, 
          location: {streetNumber, streetName, city: cityName, postcode}, 
          experience,
          description, 
          picture,
          id: uuidv4()}
         console.log(payload)
    
        try {
          const response = await fetch(
            `http://localhost:5005/babysitters/${babysitterId}`,
            {
              method: 'PUT',
              body: JSON.stringify(payload),
              headers: {
                'Content-type': 'application/json',
              },
            }
          )
          
          if (response.ok) {
            const currentBabysitter = await response.json()
            console.log(currentBabysitter)
            navigate(`/babysitters/${currentBabysitter.id}`)
          }
        } catch (error) {
          console.log(error)
        }
      }

    const fetchBabysitter = async () => {
        const response = await fetch(`http://localhost:5005/babysitters/${babysitterId}`
        )
        if (response.ok) {
            const babysitter = await response.json()

            setFirstName(babysitter.name.first)
            setLastName(babysitter.name.last)
            setGender(babysitter.gender)
            setAge(babysitter.age)
            setDescription(babysitter.description)
            setStreetNumber(babysitter.location.streetNumber)
            setStreetName(babysitter.location.streetName) 
            setCityName(babysitter.location.city) 
            setPostcode(babysitter.location.postcode)
            setEmail(babysitter.email)
            setPhone(babysitter.phone) 
            setPassword(babysitter.password)
            setPicture(babysitter.picture) 
            setExperience(babysitter.experience) 
        }
    }

    useEffect(() => {
        fetchBabysitter()
    }, [])

    

    return ( 
        <div>
            <form onSubmit={onSubmit} style={{ display: 'grid', gridTemplate: 'auto / 1fr' }}>
          <label>
            I am 
            <select value={gender} onChange={event => setGender(event.target.value)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            </select>
          </label>
          <label>
            First Name
            <input value={firstName} onChange={event => setFirstName(event.target.value)}/>
          </label>
          <label>
            Last Name
            <input value={lastName} onChange={event => setLastName(event.target.value)}/>
          </label>
          <label>
            Age
            <input type='number' value={age} onChange={event => setAge(event.target.value)}  />
          </label>
          <label>
            Street Number
            <input type='number' value={streetNumber} onChange={event => setStreetNumber(event.target.value)}/>
          </label>
          <label>
            Street Name
            <input value={streetName} onChange={event => setStreetName(event.target.value)}/>
          </label>
          <label>
            Postcode
            <input type='number' value={postcode} onChange={event => setPostcode(event.target.value)}/>
          </label>
          <label>
            City Name
            <input value={cityName} onChange={event => setCityName(event.target.value)}/>
          </label>
          <label>
            Email
            <input value={email} onChange={event => setEmail(event.target.value)}/>
          </label>
          <label>
            Telephone
            <input value={phone} onChange={event => setPhone(event.target.value)}  />
          </label>
          <label>
            Password
            <input value={password} onChange={event => setPassword(event.target.value)}/>
          </label>
          <label>
            Experience
            <input type='number' value={experience} onChange={event => setExperience(event.target.value)}/>
          </label>
          <label>
            Description
            <textarea value={description} onChange={event => setDescription(event.target.value)}/>
          </label>
          <label>
            Picture
            <input value={picture} onChange={event => setPicture(event.target.value)}/>
          </label>
          <button>Update</button>
        </form>
        </div>
     );
}
 
export default UpdatePage;