import {Link} from 'react-router-dom'

function Navbar() {
    return (
        <nav>
            <Link to='/'>
                <button>HomePage</button>
            </Link>
        </nav>
    )
}

export default Navbar