import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import { useAuth } from "../AuthContext";
import { collection, doc, getDocs, query, where, getDoc, setDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { async } from '@firebase/util';
import logo from "../assets/ciencias-de-la-computacion.png";


export default function MisMatriculas() {
  const { user } = useAuth();
  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });


  const [labs, setLabs] = React.useState([])


  async function getData() {
    const q = query(collection(db, "laboratorios"), where('matriculados', 'array-contains', { email: user.email, user: user.displayName }));
    getDocs(q)
      .then(doc => {
        setLabs(doc.docs.map(group => 
          ({ id: group.id, ...group.data()}  )    
        
        ))

})

  }

React.useEffect(() => {
  getData()
}, [])

return (
  <>

    {
      labs.map((lab, index) => (
        <Paper
          sx={{
            marginBottom: '1em',
            p: 2,
            
            maxWidth: 500,
            flexGrow: 1,
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
          }}
          key={index}
        >


          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase sx={{ width: 128, height: 128 }}>
                <Img alt="Laboratorio" src={logo} />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle2" component="div">
                    {
                      lab.cursonombre + " :" + lab.grupo
                    }
                  </Typography>
                  <Typography gutterBottom variant="subtitle3" component="div">
                    Dia: {lab.dia}
                  </Typography>
                  <Typography gutterBottom variant="subtitle3" component="div">
                    Hora de inicio : {lab.hora_inicio}

                  </Typography>
                  <Typography gutterBottom variant="subtitle3" component="div">
                    Hora de fin :  {lab.hora_fin}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    profesor : {lab.profesor}
                  </Typography>
                  
                  <Button variant="contained" sx= {{marginTop: "1em",color : 'white'}} startIcon={<DeleteIcon />}>
                   Eliminar matricula
                  </Button>
                </Grid>
              </Grid>
              
            </Grid>
          </Grid>
        </Paper>
      ))

    }

  </>)
  ;


}
