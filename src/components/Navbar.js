// Library
import { Link } from "react-router-dom";
import style from 'styled-components'

// Views

// Components
// files
import logo from '../assets/logo.png'
// style & CSS
import '../App.css';
const Nav = style.nav`
    display: flex;
    height: 3rem;
    font-size: 1.2rem;
    margin-top: 1rem;
    color: whitesmoke;
    background: dimgray;
    align-items: center;
    justify-content: space-between;

    div{
        display: flex;
        align-items: center;
    }
    span{
        margin: 0 3rem;
    }
    ul{
        display: flex;
        justify-content: flex-end;
    }
    li{
        list-style: none;
        margin-right: 10rem
    }
    a{
        color: whitesmoke;
        text-decoration: none;
    }
    .logo {
        height: 45px;
        width: 45px;
        margin: 0 1rem;
      }
    .app-name{
        font-weight: 700;
    }
`;

const Navbar = () => {
    return (
        <Nav>
            <div>
                <img className="logo" src={logo} alt="logo"/>
                <li><Link className="app-name" to="">WeatherApp</Link></li>
            </div>
            <ul>
                <li><Link to="/weatherApp">Home</Link></li>
                <li><Link to="/weatherApp/favorite">Favorite</Link></li> 
            </ul>
        </Nav>
    )
}

export default Navbar;