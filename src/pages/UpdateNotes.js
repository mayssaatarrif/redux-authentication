import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateNotes, getNoteById } from '../notes/notesSlice'; 
import { reset } from '../auth/authSlice';
import { useNavigate,useParams } from 'react-router-dom';
const UpdateNotePage = () => {
  const dispatch = useDispatch();
  const { currentNote, isSuccess, isLoading, isError, message } = useSelector((state) => state.notes);
  const navigate = useNavigate()
  

  const [state, setState] = useState({
    category: '',
    title: '',
    text: '',
  });

  const { noteId } = useParams();  // Getting the noteId from URL params
  console.log('Note ID:', noteId);

  const { category, title, text } = state;

  useEffect(() => {
    dispatch(getNoteById(noteId)); 
  }, [dispatch, noteId]);
  
  useEffect(() => {
    if (currentNote) {
      setState({
        category: currentNote.category,
        title: currentNote.title,
        text: currentNote.text,
      });
    }

    if (isError) {
      alert(`An error occurred: ${message}`);
    }

    if (isSuccess) {
      alert('Note successfully updated');
    }
    
    dispatch(reset());
  }, [currentNote, isError, isSuccess, message, dispatch]);

  if (isLoading) return <div>Loading...</div>;

  const onChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  
    const updatedData = {
      category,
      title,
      text,
    };
    dispatch(updateNotes({ id: noteId, updatedNoteData: updatedData })); // Correct the payload structure
    navigate('/note-list');
  };
  

  

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
            <textarea
              className='form-control'
              id='text'
              name='text'
              value={text}
              placeholder='Enter text'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default UpdateNotePage;
