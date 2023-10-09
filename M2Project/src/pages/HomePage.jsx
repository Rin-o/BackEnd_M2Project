import { Link } from "react-router-dom";

const HomePage = () => {
    return ( 
        <>
            <div>
                <h1>Iron Nannys</h1>
                <p>Find your super nanny for your little Ironhacker</p>

                <Link to='/babysitters'>
                <button>Find a nanny</button>
                </Link>

                <Link to='/babysitters/new'>
                <button>Register</button>
                </Link>
            </div>
            
        </>
     );
}
 
export default HomePage;