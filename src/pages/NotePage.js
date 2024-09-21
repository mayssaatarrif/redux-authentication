import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNotes} from '../notes/notesSlice'
import { reset } from '../auth/authSlice';
import { useNavigate } from 'react-router-dom';

const NotePage = () => {
  const [state, setState] = useState({
    category: '',
    title: '',
    text:''
});
const {category,title,text} = state;
  const dispatch = useDispatch();
  const {isSuccess, isLoading, isError, message } = useSelector((state) => state.notes);
  const navigate = useNavigate();
  useEffect(() => {
    if (isError) {
      console.error(`An error occurred in the notes: ${message}`);
    }
  
    if (isSuccess) {
     alert('Notes successfully created')
    }
    dispatch(reset())
  }, [ isError, isSuccess, message, dispatch])
  if (isLoading) return <div>Loading...</div>;

  const onChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    navigate ('/note-list')
      const noteData = {
        category,
        title,
        text,
      }

      dispatch(createNotes(noteData))   
  }
  
  return (
    <div>
       <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='category'
              name='category'
              value={category}
              placeholder='Enter a category'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='title'
              name='title'
              value={title}
              placeholder='Enter a title'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='text'
              name='text'
              value={text}
              placeholder='Enter a text'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
     <button type='submit' className='btn btn-block' >Submit</button>
    </div>
          </form>
      </section>
    </div>
  );
};

export default NotePage;
