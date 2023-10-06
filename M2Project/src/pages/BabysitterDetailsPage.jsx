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
          <h1>{babysitter.name.title} {babysitter.name.first} {babysitter.name.last}</h1>
          <h4>{babysitter.registered.age} years of experience</h4>
          <div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <p>{babysitter.dob.age} years-old</p>
              <p>{babysitter.phone}</p>
              <p>{babysitter.email}</p>
              <p>{babysitter.location.street.number} {babysitter.location.street.name}
              <br/ >{babysitter.location.city} {babysitter.location.postcode}</p>
            </div>
            <div>
              <p>{babysitter.description}</p>
            </div>
        </div>
          
          
        </>
    );
}
 
export default BabysitterDetailsPage;