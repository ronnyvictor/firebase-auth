import { useNavigate } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth'

function Welcome({ user }) {
	const navigate = useNavigate()
  const auth = getAuth()

	const handleLogout = () => {
    signOut(auth)
    .then(() => {
      localStorage.clear()
      navigate('/login')
    })
    .catch(err => console.error(err))
	}
	return (
		<>
			<h1>Welcome</h1>
			<h2>{user.displayName || user.email}</h2>
			{user.photoURL && (
				<img src={user.photoURL} alt='Profile of logged in user' />
			)}
			<br />
			<button onClick={handleLogout}>Logout</button>
		</>
	)
}

export default Welcome
