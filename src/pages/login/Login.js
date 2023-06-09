import { useNavigate } from "react-router-dom";
import { useState } from "react";

import './Login.css';
import logo from '../../images/logo.svg'; // import the image file

const Login = () => {
    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        navigate('/');

    };
    
    return (
            <div className="login">
                <div className="login-form-container">
                    <img src = {logo} alt="logo" className="logo"/>
                    <form className="login-form" onSubmit={handleSubmit} method="POST">
                        <input className="inputLogin" type="text" value={userName} placeholder="Username" onChange={e => setUserName(e.target.value)} />
                        <input className="inputPassword" type="password" value={password} placeholder="Password" onChange={e => setPassword(e.target.value)} />
                        <button type="submit" className="btnLogin">Login</button>
                    </form>
                </div>
            </div>
    );
}

export default Login;