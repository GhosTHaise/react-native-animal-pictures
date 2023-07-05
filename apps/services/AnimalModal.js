import {createSlice} from "@reduxjs/toolkit";

const ModalSlice = createSlice({
    name : "Modal",
    initialState : false,
    reducers : {
        toggleModal : (state) => state = !state
    }
});

export const  {toggleModal}  = ModalSlice.actions;
export default ModalSlice.reducer;