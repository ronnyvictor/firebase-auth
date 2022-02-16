import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
	getAuth,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
} from 'firebase/auth'
import { app } from '../ConnectAuth'

function Login({ user, setUser }) {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()
	const provider = new GoogleAuthProvider()
	const auth = getAuth(app)

  useEffect(() => {
		const localUser = localStorage.getItem('displayName')
		const avatar = localStorage.getItem('avatar')
		const uid = localStorage.getItem('uid')
    console.log(localUser)
    if(localUser) setUser(localUser)
	}, [])

	const handleFormSubmit = (e) => {
		e.preventDefault()
		signInWithEmailAndPassword(auth, email, password)
			.then((result) => {
				setUser(result.user)
        localStorage.setItem('displayName', result.user.displayName)
        localStorage.setItem('avatar', result.user.photoURL )
        localStorage.setItem('uid', result.user.uid )
				navigate('/')
			})
			.catch(alert)
    
	}

	const handleGoogleLogin = () => {
		signInWithPopup(auth, provider)
			.then((result) => {
				setUser(result.user)
        localStorage.setItem('displayName', result.user.displayName)
        localStorage.setItem('avatar', result.user.photoURL )
        localStorage.setItem('uid', result.user.uid )
				navigate('/')
			})
			.catch(alert)
	}

	return (
		<>
			<h1>Login</h1>
			<hr />
			<form onSubmit={handleFormSubmit}>
				<label>
					Email:
					<input
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</label>
				<br />
				<label>
					Password:
					<input
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				<input type='submit' value='Login' />
			</form>
			<button
				onClick={handleGoogleLogin}
				style={{ backgroundColor: 'black', color: 'white', border: 'none' }}
			>
				Login with Google
			</button>
			<p>
				Not a user? <Link to='/signup'>Sign Up!</Link>
			</p>
		</>
	)
}

export default Login
