import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import noteService from './noteService'; 

//Create notes
export const createNotes = createAsyncThunk('notes/createNotes', async (noteData, thunkAPI) => {
    try {
      return await noteService.createNotes(noteData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);

    }
  });

  //Get notes
  export const getNotes = createAsyncThunk(
    'notes/getNotes',
    async (_, { rejectWithValue }) => {
      try {
        const response = await noteService.getNotes(); // Assuming noteService.getNotes fetches the data
        if (!response.notes) {
          throw new Error('Notes not found');
        }
        return response.notes;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

//Update notes
export const updateNotes = createAsyncThunk('notes/updateNotes', async ({id, updatedNoteData}, thunkAPI) => {
  try {
    return await noteService.updateNotes(updatedNoteData, id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }});

//Delete notes
export const deleteNotes = createAsyncThunk('notes/deleteNotes', async ({id}, thunkAPI) => {
  try {
    return await noteService.deleteNotes(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }});
  const noteSlice = createSlice({
    name: 'notes',
    initialState: {
      notes: [], 
      status: 'idle',
      currentNoteId: null,
      isLoading: false,
      error: null,
    },
    reducers: {
      setNotes: (state, action) => {
        state.notes = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(createNotes.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(createNotes.fulfilled, (state, action) => {
          state.isLoading = false;
          state.notes.push(action.payload.data.note);
        })
        .addCase(createNotes.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        })
        .addCase(getNotes.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
      
          .addCase(getNotes.fulfilled, (state, action) => {
            state.notes = action.payload || []; 
          })
                      
        .addCase(getNotes.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload; // Log the error for debugging
          console.error('Error fetching notes:', action.payload); // Log the error
        })        
        .addCase(updateNotes.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(updateNotes.fulfilled, (state, action) => {
          state.isLoading = false;
          const index = state.notes.findIndex(note => note._id === action.payload._id);
          if (index !== -1) {
            state.notes[index] = action.payload;
          }
        })
        
        .addCase(updateNotes.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        })
        .addCase(deleteNotes.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(deleteNotes.fulfilled, (state, action) => {
          state.isLoading = false;
          state.notes = state.notes.filter(note => note._id !== action.meta.arg.id); // Filter out the deleted note
        })
  
        .addCase(deleteNotes.rejected, (state, action) => {
          state.isLoading = false;
          state.notes = state.notes.filter(note => note._id !== action.payload._id); // Filter out the deleted note
        })

    },
  });


  export const { setNotes } = noteSlice.actions;
  export default noteSlice.reducer;
  
