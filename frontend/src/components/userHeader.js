import '../styles/global.css';
import logo from '../assets/logo.png';

export default function UserHeader() {
    return (
        <div className="user-container">
            <div className="profile-circle">
                <img src={logo} alt="Logo" className="user-logo" />
            </div>
            <p>Nome do Usuário</p>
        </div>
    );
}