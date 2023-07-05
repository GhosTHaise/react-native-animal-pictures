import {useState} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { Stack } from '@mui/system';

const AnimalCard = ({data}) => {
  const [isDeleting, setisDeleting] = useState(false);
  
  const handlePressIn = () => {
    let initial = 0
    // Démarrer une action lorsque le bouton est enfoncé
    timerId = setInterval(() => {
      // Action à effectuer pendant que le bouton est maintenu enfoncé
      initial++;
      console.log('Bouton maintenu enfoncé : '+initial);
    }, 1000); // Temps entre chaque action, en millisecondes
  };

  const handleDelete = (_id) =>{
    setisDeleting(true);
    try {
      const deleteRequest = async ()=>{
          const request = await fetch(`http://localhost:8080/api/animal/${_id}`,{
            method : "DELETE",
          });
          const message = await request.json();
          console.log(message);
      }
      deleteRequest()
    } catch (error) {
      console.log("Unable to delete :"+error.message);
    }finally{
      setisDeleting(false);
    }
  }
  return (
    <Card sx={{ 
        width : "95%" , 
        marginBottom : "15px",
        borderRadius : 3}}>
    
    <CardActionArea >
      
      <CardMedia
        component="img"
        height="400"
        image={data.imageUrl}
        alt={`${data.name}-image`}
      />
      <CardContent>
        <Stack justifyContent="space-between" direction="row">
          <Typography sx={{display : "flex", gap : 1}} gutterBottom variant="h5" component="div">
            {data.name} 
            <Typography gutterBottom variant="h5" component="div">
              | {data.type}
            </Typography>
          </Typography>
          <div style={{
            background : data.color,
            height : 30,
            width : 30,
            borderRadius : "50%",
            boxShadow: "0px 0px 3px grey",
          }} />
        </Stack>
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Button size="small" color="primary">
        Modify
      </Button>
      <Button onClick={()=>handleDelete(data._id)} size="small" color="error">
        Delete 
        {
          isDeleting && <CircularProgress sx={{marginLeft : 1}} size={20} color="error" />
        }
      </Button>
    </CardActions>
  </Card>
  )
}

export default AnimalCard
