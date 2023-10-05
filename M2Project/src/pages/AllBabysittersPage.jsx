import { Link } from "react-router-dom"
import {useState, useEffect} from 'react'

const AllBabysittersPage = () => {

    const [babysitters, setBabysitters] = useState([])

    const fetchAllBabysitters = async () => {
        try {
          const response = await fetch('')
          if (response.ok) {
            const allBabysitters = await response.json()
            console.log(allBabysitters)
            setBabysitters(allBabysitters)
          }
        } catch (error) {
          console.log(error)
        }
      }
      useEffect(() => {
        fetchAllBabysitters()
      }, [])

    return ( 
        <>
        <h1>All the babysitters</h1>
        <ul>
            {babysitters.map(currentElem => (
                <li key={currentElem.id}>
                    <Link to={`/babysitters/${currentElem.id}`}>{currentElem.name}</Link>
                </li>
            ))};
        </ul>
        </>
     );
}
 
export default AllBabysittersPage;