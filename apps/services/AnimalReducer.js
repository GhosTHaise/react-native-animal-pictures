import {createSlice} from "@reduxjs/toolkit";

const AnimalSlice = createSlice({
    name : "Animal",
    initialState : [],
    reducers : {
        addElement : (state,action) => {
            state.push(action.payload);
        },
        setElement : (state,action) => state = action.payload
    }
});

export const  {addElement,setElement}  = AnimalSlice.actions;
export default AnimalSlice.reducer;