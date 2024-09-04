import '../styles/global.css';
import logo from '../assets/logo.png';

export default function UserHeader(props) {
    console.log(props);
    const user = {
        username: 'wendell'
    }
    return (
        <div className="user-container">
            <div className="profile-circle">
                <img src={logo} alt="Logo" className="user-logo" />
            </div>
            <p>{props.user ? props.user.username : "default"}</p>
        </div>
    );
}