import axiosInstance from '../axiosInstance';

//Create notes
export const createNotes = async (noteData) => {
    try {
      const response = await axiosInstance.post('/notes/create-note', noteData);
      console.log('Response Data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating notes:', error.response ? error.response.data : error.message);
      throw error;
    }
  };
  //Get notes
  export const getNotes = async () => {
    try {
        const response = await axiosInstance.get('/notes/get-notes');
        console.log('Response Data:', response.data); 
        return response.data.data;
    } catch (error) {
        console.error('Error fetching notes:', error);
        throw error;
    }
};


//Update notes
export const updateNotes = async (updatedNoteData, id) => {
  try {
    const response = await axiosInstance.put(`/notes/update-note/${id}`, updatedNoteData);
    console.log('Response Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating notes:', error.response ? error.response.data : error.message);
    throw error;
  }
};

//Delete notes
export const deleteNotes = async (id) => {
  try {
    const response = await axiosInstance.delete(`/notes/delete-note/${id}`);
    console.log('Response Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting notes:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const noteService = { createNotes,getNotes,updateNotes,deleteNotes };
export default noteService;