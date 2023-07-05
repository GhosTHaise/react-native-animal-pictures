import { View , Text } from "react-native";
import Hero from "../components/Hero";
import { Stack as St,Typography,Button } from "@mui/material";
import { Stack } from "expo-router";
import NewAnimalModal from "../components/NewAnimalModal";

import { toggleModal } from "../services/AnimalModal";
import { useDispatch } from "react-redux";
const Home = () => {
    const dispatch = useDispatch();
    return (
        
        
            <St width={"100vw"} height={"100vh"}  direction="column">
                
                <Stack.Screen
                    options={
                        {
                            headerTitle : "Animals",
                            headerRight : () => <Button sx={{marginRight : 2}} onClick={() => dispatch(toggleModal())} variant="outlined">Add Animals</Button>
                        }
                    }
                >

                </Stack.Screen>
                {/* <Typography sx={{marginTop : 2,marginLeft : 3}} fontSize={32}>
                    React User Application
                </Typography> */}
                <Hero />
                <NewAnimalModal open={true} />
            </St>
    )
}

export default Home;