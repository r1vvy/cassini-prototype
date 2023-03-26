import { Link } from 'react-router-dom';

import './NavBar.css';

const  NavBar = () => {
    return (  
        <nav className="nav">
            <div className="navbar-nav">
                <ul>
                    <li><Link to ="/" className="home">Home</Link></li>
                    <li><Link to="/login" className="link">Logout</Link></li>
                </ul>
            </div>
        </nav>
    );
}
 
export default NavBar;