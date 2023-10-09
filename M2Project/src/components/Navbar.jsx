import {Link} from 'react-router-dom'

function Navbar() {
    return (
        <nav style={{display: 'flex', alignItems: 'center'}}>
            <h2>IronNanny</h2>
            <div>
                <Link to='/'>
                    <button>HomePage</button>
                </Link>
                <Link to='/babysitters'>
                    <button>Find a nanny</button>
                </Link>
                <Link to='/babysitters/new'>
                    <button>Register</button>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar