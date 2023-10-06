import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react'


const BabysitterDetailsPage = () => {

    const {babysitterId} = useParams()
    const navigate = useNavigate()

    const [babysitter, setBabysitter] = useState()

    const fetchBabysitter = async () => {
        try {
        const response = await fetch(`http://localhost:5005/babysitters/${babysitterId}`
        )
        if (response.ok) {
            const babysitter = await response.json()
            setBabysitter(babysitter)
            console.log(babysitter)
        }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchBabysitter()
    }, [])

    useEffect(() => {
        console.log(babysitter)
    }, [babysitter])

    const handleDelete = async () => {
        try {
          const response = await fetch(`http://localhost:5005/babysitters/${babysitterId}`, {
            method: 'DELETE',
          })
          if (response.ok) {
            const parsed = await response.json()
            console.log(parsed)
            navigate('/babysitters')
          }
        } catch (error) {
          console.log(error)
        }
      }

    return !babysitter ? (
    <h1>Loading ...</h1>
    ) : (
        <>
          <img src={babysitter.picture.large}/>
          <h1>{babysitter.name.first} {babysitter.name.last}</h1>
          <h4>{babysitter.registered.age} years of experience</h4>
          <div style={{display: 'flex', alignItems:'center'}}>
            <div style={{display: 'flex', flexDirection: 'column', textAlign: 'left'}}>
              <h5>Age:</h5>
              <p>{babysitter.dob.age} years-old</p>
              <h5>Telephone:</h5>
              <p>{babysitter.phone}</p>
              <h5>Email:</h5>
              <p>{babysitter.email}</p>
              <h5>Address:</h5>
              <p>{babysitter.location.street.number} {babysitter.location.street.name}
              <br/ >{babysitter.location.city} {babysitter.location.postcode}</p>
            </div>
            <div style={{textAlign:'justify', marginLeft:'3rem'}}>
              <h3>Description:</h3>
              <p>{babysitter.description}</p>
            </div>
          </div>
          <button type='button'>Add to my favourites</button>

        </>
    );
}
 
export default BabysitterDetailsPage;