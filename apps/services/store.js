import { configureStore } from "@reduxjs/toolkit";
import AnimalReducer from "./AnimalReducer";
import ModalReducer from "./AnimalModal";

const store = configureStore({
    reducer : {
        Animal : AnimalReducer,
        Modal : ModalReducer
    }
})

export default store;