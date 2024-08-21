import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

export default props => {

    return (
        <header className="header container">
                <img src={logo} alt="Logo" className="header-logo" />
                <Link to="/login">
                    <button style={(props.showBtn ? {display:"block"} : {display:"none"})} className="login-button" >Login</button>
                </Link>
        </header>
    )
}