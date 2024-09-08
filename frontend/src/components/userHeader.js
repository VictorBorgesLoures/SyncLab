import '../styles/global.css'
import logo from '../assets/user.png';
import { AiOutlineDown } from "react-icons/ai";
import fetchApi from '../fetch/fetch-api';
import { useNavigate } from 'react-router-dom';

export default function UserHeader(props) {

    const navigate = useNavigate();

    function Logout(e) {
        e.preventDefault();
        fetchApi('/logout', "get").then(r => {
            if(r.status == 200) navigate('/login');
        })
    }

    return (
        <div className="user-container">
            <div className="profile-circle">
                <img src={logo} alt="Logo" className="user-logo" onClick={e => Logout(e)}/>
            </div>
            <div className="user-div">
                <p className="user-name">{props.user ? props.user.username : "default"}</p>
                <button className="icon-button"><AiOutlineDown /></button>
            </div>
        </div>
    );
}