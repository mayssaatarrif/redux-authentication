import { useSelector, useDispatch } from 'react-redux';
import { getNotes, deleteNotes } from '../notes/notesSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NoteList = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes); 

  console.log('Fetched Notes in Component:', notes);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        await dispatch(getNotes());
      } catch (error) {
        console.error('Failed to fetch notes:', error);
      }
    };

    fetchNotes();
  }, [dispatch]);

  const handleDelete = async (noteId) => {
    try {
      await dispatch(deleteNotes(noteId));
      dispatch(getNotes()); // Refresh the list after deletion
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  return (
    <div>
      {notes && notes.length > 0 ? (
        notes.map((note) => (
          note && note.title ? ( // Ensure each note and title exist before rendering
            <div key={note._id}>
              <h3>{note.title}</h3>
              <p>{note.text}</p>
              <div className='form-group'>
                <button onClick={() => navigate(`/update-notes/${note._id}`)}>Edit</button>
                <button onClick={() => handleDelete(note._id)}>Delete</button>
              </div>
            </div>
          ) : null // Avoid rendering if note or title is missing
        ))
      ) : (
        <p>No notes available</p>
      )}
    </div>
  );
  
};

export default NoteList;
