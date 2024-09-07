import '../styles/global.css'
import logo from '../assets/user.png';
import { AiOutlineDown } from "react-icons/ai";

export default function UserHeader(props) {
    return (
        <div className="user-container">
            <div className="profile-circle">
                <img src={logo} alt="Logo" className="user-logo" />
            </div>
            <div className="user-div">
                <p className="user-name">{props.user ? props.user.username : "default"}</p>
                <button className="icon-button"><AiOutlineDown /></button>
            </div>
        </div>
    );
}