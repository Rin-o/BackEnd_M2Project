import { Link } from "react-router-dom"
import {useState, useEffect} from 'react'
import AddBabysitterPage from './AddBabysitterPage'

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

     const  addNewBabysitter = (newBabysitter) => {
      setBabysitters([newBabysitter, ...babysitters])
      }

    return ( 
      <div>
        <h1>Nannys</h1>
        <ul style={{listStyle: 'none', display: 'grid', gridTemplate: 'auto / repeat(3, 1fr)',
        gap: '1rem', padding: '0 1rem',}}>
            {babysitters.map(el => (
              <li key={el.id}>
                <Link to={`/babysitters/${el.id}`}>
                  <div>
                    <h2>{el.name.first}</h2>
                    <img src={el.picture}/>
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      </div>
     );
}
 
export default AllBabysittersPage;