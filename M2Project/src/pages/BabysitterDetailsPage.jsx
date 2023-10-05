import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react'


const BabysitterDetailsPage = () => {

    const {babysitterId} = useParams()
    const navigate = useNavigate()

    const [babysitter, setBabysitter] = useState()

    const fetchBabysitter = async () => {
        try {
        const response = await fetch(`https.../babysitters/${babysitterId}`
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
          const response = await fetch(`https.../babysitters/${babysitterId}`, {
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
        <h1>babysitter.name</h1>
        <p>...</p>
        </>
    );
}
 
export default BabysitterDetailsPage;