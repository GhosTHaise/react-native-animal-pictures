import { useEffect } from 'react'
import { Stack } from '@mui/system'
import AnimalCard from './AnimalCard'
import React from 'react'
import { DefaultAnimal } from '../constants'
import { useDispatch, useSelector} from 'react-redux';
import { setElement } from '../services/AnimalReducer'
const Hero = () => {
  const animals = useSelector((state) => state.Animal);
  const dispatch = useDispatch();
  useEffect(()=>{
    const getData = async () => {
      const request = await fetch("http://localhost:8080/api/animal");
      const result = await request.json();
      dispatch(setElement(result.data));
    }
    getData();
  },[])
  return (
    <Stack 
    width={"100vw"} 
    sx={{
      display : "flex",
      alignItems : "center",
      paddingTop : 1
    }} 
    direction="column">
      {
        animals.map((animal)=>(
          <AnimalCard
            key={animal.name}
            data={animal}
          />
        ))
      }
        
    </Stack>
  )
}

export default Hero
