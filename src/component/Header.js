import { FaSignInAlt, FaSignOutAlt, FaUser,FaRedo } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../auth/authSlice'
import { sendNewVerificationEmail } from '../auth/authSlice' // Import the thunk action

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isSuccess, isError, message } = useSelector((state) => state.auth)
  

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  const onRequestVerificationEmail = () => {
    if ( (user && user.email) ) {
      dispatch(sendNewVerificationEmail(user.email))
    } else {
      console.error('User email is not available')
    }
  }

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>GoalSetter</Link>
      </div>
      <ul>
        {user ? (
          <>
            <li>
              <button className='btn' onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>

          </>
        ) : (
          <>
            <li>
              <Link to='/login'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <FaUser /> Register
              </Link>
            </li>
           <li>
              <button className='btn' onClick={onRequestVerificationEmail}>
                <FaRedo /> Resend Verification Email
              </button>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default Header
