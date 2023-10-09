import { Link } from "react-router-dom";

const HomePage = () => {
    return ( 
        <>
            <div>
                <h1>Exceptional child care and early learning for today's families.</h1>
                <p>With warm, experienced nannies, full-day schedules, rolling admissions and a world-class curriculum, IronNanny meets you where you are.</p>

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