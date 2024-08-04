import React from 'react';
import { Box, Button, TextField, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import RegisterImg from '../img/registroImg.png';

const Register = () => {
  return (
    <Grid container style={{ height: '100vh' }}>
      <Grid item xs={12} md={6} style={{ backgroundImage: `url(${RegisterImg})`, backgroundSize: 'cover' }}>
      </Grid>
      <Grid 
        item 
        xs={12} 
        md={6} 
        container 
        direction="column" 
        alignItems="center" 
        justifyContent="center"
        style={{ padding: '0 20px',background: "white"}}
      >
        <Box 
          component="form"
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            width: '100%', 
            maxWidth: '400px'
          }}
        >
          <Typography variant="h4" gutterBottom>Registro</Typography>
          <TextField 
            label="Nombre" 
            variant="outlined" 
            fullWidth 
            margin="normal"
          />
          <TextField 
            label="Apellido" 
            variant="outlined" 
            fullWidth 
            margin="normal"
          />
          <TextField 
            label="Email" 
            variant="outlined" 
            fullWidth 
            margin="normal"
          />
          <TextField 
            label="Contraseña" 
            type="password" 
            variant="outlined" 
            fullWidth 
            margin="normal"
          />
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            style={{ margin: '20px 0' }}
          >
            Registrate!
          </Button>
          <Typography variant="body2">
            ¿Aun no tienes una cuenta? 
            <Link to="/login" style={{ marginLeft: '5px' }}>
              Haz click acá
            </Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Register;
