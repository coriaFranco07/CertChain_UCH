import React, { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';

const SearchBar = ({ onSearch }) => {
    const [inputAddress, setInputAddress] = useState(''); // The address manually entered by the user
    const [connectedAddress, setConnectedAddress] = useState(''); // The address connected from MetaMask
    const [contractAddress, setContractAddress] = useState('');

    const connectMetaMask = async () => {
        if (!window.ethereum) {
            alert('Porfavor primero instala metamask.');
            return;
        }

        let accounts;
        try {
            accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setConnectedAddress(accounts[0]);
            setInputAddress(''); // address is cleared after connection
        } catch (error) {
            alert('Solicitud Rechazada');
        }
    };

    const disconnectWallet = () => {
        setConnectedAddress(''); // Clear the connected MetaMask address
        setInputAddress(''); // Clear the input address at the same time
    };

    const handleSearch = () => {
        const addressToSearch = connectedAddress || inputAddress;
        onSearch(addressToSearch, contractAddress);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: 400,
                margin: 'auto',
                padding: 3,
                borderRadius: 2,
                boxShadow: 2,
                backgroundColor: 'background.paper',
            }}
        >
            {connectedAddress ? (
                <>
                    <Typography variant="h6" gutterBottom>
                        Direccion conectada: {connectedAddress}
                    </Typography>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={disconnectWallet}
                        sx={{ marginTop: 2 }}
                    >
                        Desconecta tu Wallet
                    </Button>
                </>
            ) : (
                <>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={connectMetaMask}
                        sx={{ marginBottom: 2 }}
                    >
                        Conectar a MetaMask
                    </Button>
                    <TextField
                        label="Ingrese tu direccion ETH"
                        variant="outlined"
                        fullWidth
                        value={inputAddress}
                        onChange={(e) => setInputAddress(e.target.value)}
                        sx={{ marginBottom: 2 }}
                    />
                </>
            )}
           {/* <TextField
                label="NFT Contract Address (optional)"
                variant="outlined"
                fullWidth
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                sx={{ marginBottom: 2 }}
            /> */}
            <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
                fullWidth
            >
                Buscar
            </Button>
        </Box>
    );
};

export default SearchBar;
