import React, { useState, useContext } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

function Login() {

    const navigate = useNavigate();
    const { authState, setAuthState } = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        //console.log(username, password);

        if (!username || !password) {
            alert('Please fill in all fields');
            return;
        }
        let data = {
            username: username,
            password: password
        }
        axios.post('http://localhost:3001/auth/login', data)
            .then((response) => {
                //console.log(response.data);
                if (response.data.error) alert(response.data.error);
                else {
                    // If there is no response.error, then we will set an item to the session storeage:
                    //sessionStorage.setItem("accessToken", response.data); // key, value
                    localStorage.setItem("accessToken", response.data.token); // key, value
                    // response.data is the accessToken (a string)
                    setAuthState({
                        username: response.data.username,
                        id: response.data.id,
                        status: true  // true means logged in
                    });
                    navigate('/');
                }
            });
    };

    return (
        <div className='loginContainer'>
            <label htmlFor='uname'>Username:</label>
            <input
                id='uname'
                type='text'
                required
                onChange={(event) => {
                    setUsername(event.target.value);
                }}
                value={username}
            />
            <label htmlFor='pwd'>Password:</label>
            <input
                id='pwd'
                type='password'
                required
                onChange={(event) => {
                    setPassword(event.target.value);
                }}
                value={password}
            />
            <button onClick={handleLogin} type='submit'>Login</button>
        </div>
    )
}

export default Login