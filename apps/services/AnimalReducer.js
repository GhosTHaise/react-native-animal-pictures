import {createSlice} from "@reduxjs/toolkit";

const AnimalSlice = createSlice({
    name : "Animal",
    initialState : [],
    reducers : {
        addElement : (state,action) => {
            state.push(action.payload);
        },
        removeElement : (state,action) => state = state.filter((element) => element._id != action.payload),
        setElement : (state,action) => state = action.payload,
        updateElement : (state,action) => state = state.map((element) => {
            if(element._id === action.payload._id){
                return {
                    ...element,
                    name : action.payload.name,
                    type : action.payload.type,
                    color : action.payload.color,
                    imageUrl : action.payload.imageUrl
                }
            }
            return element;
        } )
    }
});

export const  {addElement,setElement,removeElement,updateElement}  = AnimalSlice.actions;
export default AnimalSlice.reducer;