import React, { useState } from 'react';
import axios from 'axios';
import { Snackbar, Alert } from '@mui/material';
import SearchBar from '../components/nftComponents/SearchBar';
import NftCard from '../components/nftComponents/NftCard';
import BlockchainSelector from '../components/nftComponents/BlockchainSelector';  

const NftValidation = () => {
  const [nftData, setNftData] = useState(null);
  const [selectedChainId, setSelectedChainId] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info'); // 'info', 'success', 'warning', 'error'

  const handleSearch = async (address, contractAddress) => {
    setNftData(null);
    setSnackbarOpen(false); // Close any previously open snackbar
    try {
      const response = await axios.get(`/api/chainbaseApi?address=${address}&contract_address=${contractAddress}&chain_id=${selectedChainId}`);
      if (response.data.data.length === 0) {
        setSnackbarMessage('No se encontraron NFTs para la dirección proporcionada.');
        setSnackbarSeverity('info');
      } else {
        setNftData(response.data.data);
      }
    } catch (error) {
      setSnackbarMessage('Error al obtener datos de NFTs. Por favor, intente de nuevo.');
      setSnackbarSeverity('error');
    }
    setSnackbarOpen(true); // Show snackbar
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div style={{ width: "95%", margin: "auto", borderRadius: "40px 40px 0px 0px", background: "white", height: "100vh" }}>
      <BlockchainSelector setSelectedChainId={setSelectedChainId} />
      <SearchBar onSearch={handleSearch} />

      {nftData && nftData.length > 0 ? (
        <div>
          <h2>NFTs para la dirección: {nftData[0].owner}</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {nftData.map((nft) => (
              <NftCard key={`${nft.contract_address}-${nft.token_id}`} nft={nft} />
            ))}
          </div>
        </div>
      ) : (
        <div></div>
      )}

      {/* Snackbar component */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default NftValidation;
