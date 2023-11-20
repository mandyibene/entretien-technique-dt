import React, { useEffect, useState } from 'react';

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState({});
    const [isLogged, setIsLogged] = useState(false);
    const [error, setError] = useState({password: "", username: ""});

    useEffect(() => {
        getRandomUser();
    }, []); // run once, when component did mount

    const getRandomUser = () => {
        fetch("https://randomuser.me/api/")
        .then(res => res.json())
        .then(
            (result) => {
                let randomUsername = result.results[0].login.username
                let randomPassword = result.results[0].login.password
                setUser({username: randomUsername, password: randomPassword});
            },
            (error) => {}
        )
    }

    const handleUsernameChange = e => {
        setUsername(e.target.value);
    } 
    
    const handlePasswordChange = e => {
        setPassword(e.target.value);
    }

    const renderError = (name) => {
        if (error[name]) {
            return (
                <span className='error'>{error[name]}</span>
            )
        }
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (username === user.username) {
            if (password === user.password) {
                setIsLogged(true);
                setError({});
            } else {
                setError({password: "Mot de passe incorrect"});
            }
        } else {
            setError({username: "Pseudo incorrect"});
            setPassword("");
        }
    }

    const resetUser = () => {
        setUsername("");
        setPassword("");
        setError({});
        getRandomUser();
    }

    if (isLogged === true) {
    
        return (
            <div className="login-page">
                <span>Vous êtes connecté !</span>
                <button onClick={() => setIsLogged(false)}>Déconnexion</button>
            </div>
        )
    
    } else {

        return (
            <div className="login-page">
                <form onSubmit={handleSubmit}>
                    
                    <div className='section'>
                        <label htmlFor="username">Pseudo</label>
                        <input id="username" type="text" value={username} onChange={handleUsernameChange} autoComplete="true" />
                        {renderError("username")}
                    </div>

                    <div className='section'>
                        <label htmlFor="password">Mot de passe</label>
                        <input id="password" type="password" value={password} onChange={handlePasswordChange}/>
                        {renderError("password")}
                    </div>
                    
                    <button type='submit'>Connexion</button>
        
                </form>

                <div className='section'>
                    <span><b>Pseudo</b> : {user.username ? user.username : "ERREUR API"}</span>
                    <span><b>Mot de passe</b> : {user.password ? user.password : "ERREUR API"}</span>
                    <button onClick={resetUser}>Réinitialiser</button>
                </div>
            </div>
        )

    }

}

export default Login