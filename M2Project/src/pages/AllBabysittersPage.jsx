import { Link } from "react-router-dom"
import {useState, useEffect} from 'react'

const AllBabysittersPage = () => {

    const [babysitters, setBabysitters] = useState([])

    const fetchAllBabysitters = async () => {
        try {
          const response = await fetch('http://localhost:5005/babysitters')
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
      <div>
        <h1>All the babysitters</h1>
        <ul>
            {babysitters.map(el => (
              <li key={el.id}>
                <Link to={`/babysitters/${el.id}`}>
                  <div>
                    <img src={el.picture.medium}/>
                    <h2>{el.name.first}</h2>
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      </div>
     );
}
 
export default AllBabysittersPage;