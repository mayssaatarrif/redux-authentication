import React from 'react'
import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../auth/authSlice'
import Spinner from '../component/Spinner'
function Login() {
    const [state, setState] = useState({
        email: '',
        password: '' 
    });
    const {email, password} = state;

    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const { user, isLoading, isError, isSuccess, message } = useSelector(
      (state) => state.auth
    )

    useEffect(() => {
        if (isError) {
          toast.error(message)
        }
    
        if (isSuccess || user) {
          navigate('/')
        }
    
        dispatch(reset())
      }, [user, isError, isSuccess, message, navigate, dispatch])
    
    const onChange = (evt) => {
        const value = evt.target.value;
        setState(({
            ...state,
            [evt.target.name]: value,
          }))
      };
    
    const onSubmit = (evt) =>{
        evt.preventDefault()

        const userData ={
            email,
            password,
        }
        
        dispatch(login(userData))
    };

    if (isLoading) {
        return <Spinner />
      }
    
  
    return (
   <>
   <section className='heading'> 
   
   <h1>
    <FaSignInAlt/> Login
   </h1>
   
   <p>Login and set your goals</p>
  
   <section className='form'></section>
  
   <form onSubmit={onSubmit}>
   
    <div className='form-group'>
            <input 
            type='email'className='form-control'
            id ="email" 
            name ='email' 
            value={email}
            placeholder='Enter your email'
            onChange={onChange}/>
    </div>
    
    <div className='form-group'>
        <input 
        type='password'className='form-control'
        id ="password" 
        name ='password' 
        value={password}
        placeholder='Enter your password'
        onChange={onChange}/>
        </div>
   
    <div className='form-group'>
     <button type='submit' className='btn btn-block'>Submit</button>
    </div>
   
   </form>
   
   </section>  
   
   </>
  )
}

export default Login