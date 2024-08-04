import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputLabel, Select, MenuItem, Typography, Box } from '@mui/material';

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const useChainId = (initialNetwork) => {
  const networkToChainId = useMemo(() => ({
    ethereum: 1,
    polygon: 137,
    bsc: 56,
    avalanche: 43114,
    arbitrum: 42161,
    optimism: 10,
    base: 8453,
    zksync: 324,
  }), []);

  const [selectedNetwork, setSelectedNetwork] = useState(initialNetwork);
  const selectedChainId = networkToChainId[selectedNetwork];

  return {
    selectedNetwork,
    setSelectedNetwork,
    selectedChainId,
    networkToChainId 
  };
};

const BlockchainSelector = ({ setSelectedChainId }) => {
  const { selectedNetwork, setSelectedNetwork, selectedChainId, networkToChainId } = useChainId('ethereum');

  useEffect(() => {
    setSelectedChainId(selectedChainId);
  }, [selectedChainId, setSelectedChainId]);

  const handleChange = (event) => {
    setSelectedNetwork(event.target.value);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 360, margin: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Selecciona una Blockchain Network:
      </Typography>
      <FormControl fullWidth variant="outlined">
        <InputLabel id="blockchainSelector-label">Blockchain Network</InputLabel>
        <Select
          labelId="blockchainSelector-label"
          id="blockchainSelector"
          value={selectedNetwork}
          onChange={handleChange}
          label="Blockchain Network"
        >
          {Object.keys(networkToChainId).map((network) => (
            <MenuItem key={network} value={network}>
              {capitalizeFirstLetter(network)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

BlockchainSelector.propTypes = {
  setSelectedChainId: PropTypes.func.isRequired,
};

export default BlockchainSelector;
