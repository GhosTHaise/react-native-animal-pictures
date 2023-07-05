import {createSlice} from "@reduxjs/toolkit";

const ModalSlice = createSlice({
    name : "Modal",
    initialState : {
        open : false,
        id : ""
    },
    reducers : {
        toggleModal : (state) => {state.open = !state.open},
        setModalId: (state, action) => {
            state.id = action.payload;
          }
    }
});

export const  {toggleModal,setModalId}  = ModalSlice.actions;
export default ModalSlice.reducer;