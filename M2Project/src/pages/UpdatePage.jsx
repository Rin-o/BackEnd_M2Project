import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdatePage = () => {
    
    const {babysitterId} = useParams()
    const navigate = useNavigate()

    const [values, setValues] = useState({
        id: babysitterId,
        name: {first: '', last: ''},
        gender: '',
        location: '',
        email: '',
        password: '',
        description: ''
    })
      
    const fetchBabysitter = async () => {
        const response = await fetch(`http://localhost:5005/babysitters/${babysitterId}`
        )
        if (response.ok) {
            const babysitter = await response.json()
            setValues({...values, name: babysitter.name.first, lastName: babysitter.name.last, description: babysitter.description, gender: babysitter.gender})
            console.log(babysitter)
        }
    }

    useEffect(() => {
        fetchBabysitter()
    }, [])

    const onSubmit = async event => {
        event.preventDefault()
    
        try {
          const response = await fetch(
            `http://localhost:5005/babysitters/${babysitterId}`,
            {
              method: 'PUT',
              body: JSON.stringify(values),
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

    return ( 
        <div>
            <form onSubmit={onSubmit} style={{ display: 'grid', gridTemplate: 'auto / 1fr' }}>
          <label>
            I am 
            <select value={values.gender} onChange={event => setValues({...values, gender: event.target.value})}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            </select>
          </label>
          <label>
            First Name
            <input value={values.name.first} onChange={event => setValues({...values, first: event.target.value})}/>
          </label>
          <label>
            Last Name
            <input value={values.name.last} onChange={event => setValues({...values, last: event.target.value})}/> 
          </label>
          <label>
            Description
            <textarea value={values.description} onChange={event => setValues({...values, description: event.target.value})}/>
          </label>
          {/*<label>
            Address
            <input value={location} onChange={event => setLocation(event.target.value)} required />
          </label>
          <label>
            Address
            <input value={location} onChange={event => setLocation(event.target.value)} required />
          </label>
          <label>
            Email
            <input value={email} onChange={event => setEmail(event.target.value)} required />
          </label>
          <label>
            Password
            <input value={password} onChange={event => setPassword(event.target.value)} required />
          </label>
          <label>
            Description
            <textarea value={description} onChange={event => setDescription(event.target.value)} required/>
    </label>*/}
          <button>Update</button>
        </form>
        </div>
     );
}
 
export default UpdatePage;