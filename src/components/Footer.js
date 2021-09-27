// Library
import style from 'styled-components'
import moment from 'moment';
import { Link } from 'react-router-dom';
// Views


// Components


// style & CSS
import '../App.css';
const FooterStyle = style.footer`
    display: flex;
    height: 10rem;
    padding: 0 10rem;
    color: black;
    background: dimgray;
    align-items: center;
    justify-content: space-around;

    span{
        font-size: 1.3rem;
        font-weight: 700;
        margin-right: 1rem;
    }
    a{
        color: whitesmoke;
        text-decoration: none;
    }
    `;
 




const Footer = () => {
    let today = moment().format('MMMM Do YYYY')
    let hours = moment().format('h:mm:ss a')
    return (
        <FooterStyle>
            <div>
                <h4><span>Web Developer :</span><Link>Anthony Delforge</Link></h4>
            </div>
            <div>
                <h4> {today} </h4>
                <h4> {hours} </h4>
            </div>
        </FooterStyle>
    )
}

export default Footer;