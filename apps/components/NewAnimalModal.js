import {useState} from "react"
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
import { toggleModal } from "../services/AnimalModal";
import { addElement } from "../services/AnimalReducer";
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

const NewAnimalModal = ({data,handlePatch}) => {
  const open = useSelector((state) => state.Modal);
  const dispatch = useDispatch();

  const [isSaving, setisSaving] = useState(false);
  const [name, setName] = useState(data?.name || "");
  const [type, setType] = useState(data?.type || "");
  const [color, setColor] = useState(data?.color || "#fff");
  const [photo, setPhoto] = useState(null);

  const handleImageChange = (file) => {
    const reader = (readFile) => new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result );
      fileReader.readAsDataURL(readFile);
    });

    reader(file).then((result) => setPhoto({ name: file?.name, url: result }));
  };

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
            onClose={() => dispatch(toggleModal())}
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
                <TextField id="outlined-basic" onChange={(e)=> setName(e.target.value)} label="Name" variant="outlined" />
                <TextField  id="outlined-basic" onChange={(e)=> setType(e.target.value)} label="Type" variant="outlined" />
                <MuiFileInput value={photo} onChange={(p)=> handleImageChange(p)} />
                <Stack alignItems="center" justifyContent="space-between" gap={2} direction="row">
                    <MuiColorInput  value={color} onChange={(e)=> setColor(e)} />
                    <Button
                        color="error"
                        variant="text"
                        onClick={() => dispatch(toggleModal())}
                        size="md"
                        sx={{paddingX : 2}}
                    >
                        Close
                    </Button>
                    
                    {
                        !isSaving ? 
                            (
                                <Button
                                color="primary"
                                variant="contained"
                                onClick={handleClick}
                                sx={{paddingX : 2,paddingY : 1}}
                            >
                                Save
                            </Button>
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
