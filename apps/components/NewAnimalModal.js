import {useState,useEffect} from "react"
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from "@mui/system";
import TextField from '@mui/material/TextField';
import { MuiColorInput } from 'mui-color-input'
import { MuiFileInput } from 'mui-file-input'
import CircularProgress from '@mui/material/CircularProgress';
import { toggleModal,setModalId } from "../services/AnimalModal";
import { addElement,updateElement } from "../services/AnimalReducer";
import { useDispatch,useSelector } from "react-redux";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  boxShadow: 1,
  borderRadius : 3,
  p: 4,
};

const NewAnimalModal = () => {
  const {open,id} = useSelector((state) => state.Modal);
  const Animals = useSelector((state) => state.Animal);

  const dispatch = useDispatch();
  const [isSaving, setisSaving] = useState(false);
  const [name, setName] = useState();
  const [type, setType] = useState();
  const [color, setColor] = useState();
  const [photo, setPhoto] = useState(null);

    useEffect(() => {
        console.log(id);
        if(id.length > 0){
            const animal_d = Animals.filter((animal)=> animal._id == id);
            console.log(animal_d);
            setName(animal_d[0].name);
            setType(animal_d[0].type);
            setColor(animal_d[0].color);
        }else{
            setName("");
            setType("");
            setColor("");
        }
    }, [id]);

    

    const handleImageChange = (file) => {
    const reader = (readFile) => new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result );
      fileReader.readAsDataURL(readFile);
    });

    reader(file).then((result) => setPhoto({ name: file?.name, url: result }));
  };

  const handlePatch = async () => {
    setisSaving(true);
    if(!name || !type || !color){
        alert("all field must complited !")
        return ;
    }

    try {
        const request = await fetch("http://localhost:8080/api/animal",{
        method : "PATCH",
        headers :{
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            id,
            name,
            type,
            color,
            photo
        })
    })
    const response = await request.json();
    console.log(response);
    if(response.data){
        dispatch(updateElement(response.data));
        dispatch(toggleModal());
        dispatch(setModalId(""));
    }
    } catch (error) {
        console.log("Unable to save "+error.message);
    }finally{
        setisSaving(false);
    }
  }

  const handleClick = async() => {
    setisSaving(true);
    if(!name || !type || !photo || !color){
        alert("all field must complited !")
        return ;
    }

    try {
        const request = await fetch("http://localhost:8080/api/animal",{
        method : "POST",
        headers :{
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            name,
            type,
            color,
            photo
        })
    })
    const response = await request.json();
    console.log(response);
    if(response.data){
        dispatch(addElement(response.data));
        dispatch(toggleModal());
        dispatch(setModalId(""))
    }
    } catch (error) {
        console.log("Unable to save "+error.message);
    }finally{
        setisSaving(false);
    }

  }
  return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={() => {dispatch(toggleModal());dispatch(setModalId(""));}}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
            backdrop: {
                 timeout: 500,
             },
        }}
    >
        <Fade in={open}>
        <Box sx={style}>
            <Typography sx={{marginBottom : 3}} id="transition-modal-title" variant="h5" component="h2">
            New Animal
            </Typography>
            
            <Stack gap={2} direction="column">
                <TextField id="outlined-basic" value={name} onChange={(e)=> setName(e.target.value)} label="Name" variant="outlined" />
                <TextField  id="outlined-basic"value={type} onChange={(e)=> setType(e.target.value)} label="Type" variant="outlined" />
                <MuiFileInput value={photo} onChange={(p)=> handleImageChange(p)} />
                <Stack alignItems="center" justifyContent="space-between" gap={2} direction="row">
                    <MuiColorInput  value={color} onChange={(e)=> setColor(e)} />
                    <Button
                        color="error"
                        variant="text"
                        onClick={() => {dispatch(toggleModal());dispatch(setModalId(""))}}
                        size="md"
                        sx={{paddingX : 2}}
                    >
                        Close
                    </Button>
                    
                    {
                        !isSaving ? 
                            (
                                id?.length > 0 ?
                                (
                                <Button
                                    color="warning"
                                    variant="contained"
                                    onClick={handlePatch}
                                    sx={{paddingX : 2,paddingY : 1}}
                                >
                                    Update
                                </Button>
                                ):
                                (
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        onClick={handleClick}
                                        sx={{paddingX : 2,paddingY : 1}}
                                    >
                                        Save
                                    </Button>
                                )
                            ) :
                            (
                                <CircularProgress size={25} />
                            )
                    }
                </Stack>
            </Stack>
        </Box>
        </Fade>
    </Modal>
  )
}

export default NewAnimalModal
