import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, TextField, Typography, Button, Grid, CircularProgress, IconButton } from '@mui/material';
import axios from 'axios';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';

// Esquema de validación de Yup
const schema = yup.object().shape({
  certificateName: yup.string().required('Nombre del Certificado es requerido'),
  description: yup.string(),
  email: yup.string().email('Correo electrónico inválido').required('Correo electrónico es requerido'),
});

const UploadCert = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState('');
  const [documentError, setDocumentError] = useState('');

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('certificateName', data.certificateName);
      formData.append('description', data.description);
      formData.append('email', data.email);
      if (file) {
        formData.append('file', file);
      }
      
      const response = await axios.post('/api/certificates', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      setFile(null);
      setFilePreview('');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(uploadedFile);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'application/pdf',
    onDrop: handleDrop
  });

  const goBack = () => {
    setFile(null);
    setFilePreview('');
  };

  const pdfjsVersion = '3.4.120'; 

  return (
    <Box
      sx={{
        width: "95%",
        margin: "auto",
        borderRadius: "40px 40px 0px 0px",
        background: "white",
        height: "100vh",
        padding: 4
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <Grid container sx={{display: "flex",flexDirection: "column"}} >
            <Typography variant="h5" gutterBottom>Datos sobre el Certificado</Typography>
            {!filePreview && (
              <Box
                {...getRootProps({ className: 'dropzone' })}
                sx={{
                  border: '2px dashed gray',
                  borderRadius: '8px',
                  padding: 2,
                  textAlign: 'center',
                  cursor: 'pointer',
                  height: '200px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <input {...getInputProps()} />
                <Typography variant="h6">Arrastra y suelta tu PDF aquí, o haz clic para seleccionar</Typography>
              </Box>
            )}
            {filePreview && (
              <> <IconButton
              onClick={goBack}
              sx={{ display: "flex",justifyContent: "start" }}
            >
              <ArrowBackIcon />
            </IconButton>
             <Box sx={{ marginTop: 3, position: 'relative', height: '600px' }}>
               <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`}>
                 <Viewer fileUrl={filePreview} />
               </Worker>
               {documentError && (
                 <Typography color="error">{documentError}</Typography>
               )}
             </Box></>
            )}
            <Controller
              name="certificateName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nombre del Certificado"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={!!errors.certificateName}
                  helperText={errors.certificateName ? errors.certificateName.message : ''}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Descripción"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Correo Electrónico del Receptor"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ''}
                />
              )}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 3 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Enviar'}
            </Button>
         
        </Grid>
      </form>
    </Box>
  );
};

export default UploadCert;
