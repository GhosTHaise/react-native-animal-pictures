import {createSlice} from "@reduxjs/toolkit";

const AnimalSlice = createSlice({
    name : "Animal",
    initialState : [],
    reducers : {
        addElement : (state,action) => {
            state.push(action.payload);
        },
        removeElement : (state,action) => state = state.filter((element) => element._id != action.payload),
        setElement : (state,action) => state = action.payload
    }
});

export const  {addElement,setElement,removeElement}  = AnimalSlice.actions;
export default AnimalSlice.reducer;