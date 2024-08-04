import React from 'react';
import { Box, Button, TextField, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import LoginImg from '../img/loginImg.png';

const Login = () => {
  return (
    <Grid container style={{ height: '100vh' }}>
      <Grid item xs={12} md={6} style={{ backgroundImage: `url(${LoginImg})`, backgroundSize: 'cover' }}>
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
          <Typography variant="h4" gutterBottom>Login</Typography>
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
            Ingresar
          </Button>
          <Typography variant="body2">
            ¿No tienes cuenta? 
            <Link to="/register" style={{ marginLeft: '5px' }}>
              Haz click acá
            </Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
