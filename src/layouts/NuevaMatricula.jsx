
import React from "react";
import { collection, doc, getDocs, query, where , getDoc, setDoc} from "firebase/firestore";
import { db } from "../Firebase";
import { MenuItem, TextField, Grid , Typography, Button, Snackbar} from "@mui/material";
import Alert from '@mui/material/Alert';
import { Box } from "@mui/system";
import { useAuth } from "../AuthContext";

export default function NuevaMatricula() {
  const [message, setMessage] = React.useState({message: "", valid: false})
  const [open, setOpen] = React.useState(false);
  const { user  } = useAuth();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const [labs, setLabs] = React.useState([])
  const [selectedLabID, setSelectedLabID] = React.useState('');

  const [gruops, setGropus] = React.useState([]);
  const [selectedGroupID, setSelectedGroupID] = React.useState('');

  
  const handleChangeGroup = (e) => {
    e.preventDefault();
    setSelectedGroupID(e.target.value);
  }

  const handleChange = (e) => {
    e.preventDefault();
    setSelectedLabID(e.target.value);
  }

  React.useEffect(() => {
    
      const q = query(collection(db, "cursos"));
      getDocs(q)
      .then(res =>setLabs(res.docs.map(lab => ({ id : lab.id, ...lab.data()}))))
      
  },[]);

  React.useEffect(() => {
    if (selectedLabID !== '') {
      const categoryDocRef = doc(db, "cursos",selectedLabID);
      const q = query(collection(db, "laboratorios"), where("curso", "==",categoryDocRef ));
      getDocs(q)
      .then(res =>{
        setGropus(res.docs.map(group => ({id: group.id, ...group.data()})))
      })
    }
    
  },[selectedLabID]);

  const handleMatricular = () => {
    if(selectedGroupID ==="" ){
      return console.log("Error");
    }
    if(selectedLabID === ""){
      return console.log("Error");
    }
    matricular();
    console.log(user);
  }
  
  const matricular = () => {

    const docRef = doc(db, "laboratorios", selectedGroupID);

    getDoc(docRef)
    .then(docSnap  => {
      if (!docSnap.data()) {
        setMessage({message: "Dato no encontrado", valid: false})
        handleClick();
        return console.log("Error");
      }
      const doc = docSnap.data();
      

      if (doc.matriculados.length == doc.capacidad ){
        setMessage({message: "Ya no hay cupos", valid: false})
        handleClick();
        return console.log("Error");
      }

      const isUser = doc.matriculados.find(lab => lab.email ===  user.email);
      if(isUser){
        setMessage({message: "Ya estas matriculado en este curso", valid: false})
        handleClick();
        return console.log("Error");
      }

      const addUser = [...doc.matriculados, {user: user.displayName, email: user.email}]
      
      setDoc(docRef, { 
        ...doc,
        matriculados: addUser
      })

      setMessage({message: "Matricula registrada", valid: true})
      handleClick();

      
      const newLabs = labs.filter(item  => item.id !== selectedLabID);
      setSelectedLabID("");
      setSelectedGroupID("");
      setLabs(newLabs);
      
    })

  }
  return <>
  <Grid container spacing={2} mt={4} 

  >
    <Grid item xs={12} mb={4}>
      <Typography variant="inherit" align="center">
        Registra nueva matricula
      </Typography>
    </Grid>
    <Grid item xs={12} md={6}>
      <TextField
      fullWidth
          select
          label="Laboratorios"
          value={selectedLabID}
          onChange={handleChange}
          helperText="Campo obligatorio"
        >
          {
            labs.map((lab, index) =>(
                <MenuItem  key = {index} value={lab.id}>
                    {lab.nombre}
                </MenuItem>  
            ))
          
          }
        </TextField>

    </Grid>
    <Grid item xs={12} md={6}>
      <TextField
          select
          fullWidth
          value= {selectedGroupID}
          onChange={handleChangeGroup}
          label="Grupo"
          helperText="Campo obligatorio"
        >
          {
            gruops.map((group, index) =>(
                <MenuItem  key = {index} value={group.id}>
                    {group.grupo}
                </MenuItem>   
            ))
          
          }
        </TextField>

    </Grid>
    
    <Grid item xs={12} >
    
    </Grid>
  </Grid>
  <Box
       mt={8}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Button
        
        onClick={handleMatricular}
        variant="contained"
        disabled={selectedGroupID ? false : true}
      >
        Guardar
      </Button>
    </Box>

  <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={message.valid ? "success": "error"} sx={{ width: '100%' }}>
        {message.message}
        </Alert>
  </Snackbar>


  </>;
}
