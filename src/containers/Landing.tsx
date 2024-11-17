import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress, Typography, Box, Switch, Collapse } from '@mui/material';

const SURROUND_HEIGHT = 5;
const DISCLAIMER_HEIGHT = 2;

// Balances
const advancedInfo = {
  networks: [
    { name: 'OP', balance: '1 USDC', logo: '/op.png' },
    { name: 'Base', balance: '2 USDC', logo: '/base.png' },
    { name: 'Unichain', balance: '1 USDC', logo: '/unichain.png' },
  ],
};

// Cafés
const products = [
  { id: 1, name: 'Flat White', price: '4 USDC', image: '/flat-white.webp' },
  { id: 2, name: 'Macciato', price: '2 USDC', image: '/macciato.webp' },
  { id: 3, name: 'Chocolate', price: '2 USDC', image: '/chocolate.webp' },
  { id: 4, name: 'Espresso', price: '6 USDC', image: '/expresso.webp' },
];

const ProductCard = ({ product, onBuyClick }) => (
  <CardContainer>
    <ProductImage src={product.image} alt={product.name} />
    <ProductName>{product.name}</ProductName>
    <ProductPrice>{product.price}</ProductPrice>
    <BuyButton variant="contained" onClick={() => onBuyClick(product)}>
      BUY <img src="/assets/1_Heads/head-bank.png" style={{ width: '20px', height: '20px' }} />
    </BuyButton>
  </CardContainer>
);

export const Landing = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showAdvancedInfo, setShowAdvancedInfo] = useState(false);

  const handleBuyClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    setIsLoading(true);
    setIsSuccess(false);

    // Simulamoooo
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 3000);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setIsLoading(false);
    setIsSuccess(false);
    setShowAdvancedInfo(false); 
  };

  const toggleAdvancedInfo = () => {
    setShowAdvancedInfo((prev) => !prev);
  };

  return (
    <LandingContainer>
      <img src="/assets/2_Glasses/glasses-square-red.png" alt="Glasses Square Red" style={{ width: '30%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px'}} />
      <Header>Welcome to Yerba Coffee Shop</Header>
      <ProductGrid>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onBuyClick={handleBuyClick} />
        ))}
      </ProductGrid>
      <Dialog
        open={isModalOpen}
        onClose={handleClose}
        PaperProps={{
          style: {
            borderRadius: '20px',
            padding: '2rem',
            maxWidth: '500px',
            width: '100%',
          },
        }}
      >
        <DialogTitle style={{ fontSize: '1.8rem', fontWeight: 'bold', textAlign: 'center' }}>
          Confirm Your Purchase
        </DialogTitle>
        <DialogContent>
          {!isLoading && !isSuccess && (
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap="1rem">
              <Typography variant="h6" textAlign="center">
                You are about to buy <b>{selectedProduct?.name}</b> for <b>{selectedProduct?.price}</b>.
              </Typography>
              <ProductImagePreview src={selectedProduct?.image} alt={selectedProduct?.name} />
            </Box>
          )}
          {isLoading && (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              gap="1rem"
              padding="2rem 0"
            >
              <CircularProgress size={50} />
              <Typography>Processing your transaction...</Typography>
            </Box>
          )}
          {isSuccess && (
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap="1rem">
              <Typography variant="h5" color="green" textAlign="center">
                🎉 Success! Show this to the cashier.
              </Typography>
              <ProductImagePreview src={selectedProduct?.image} alt={selectedProduct?.name} />
              {/* Toggle para información avanzada */}
              <Box display="flex" alignItems="center" gap="0.5rem" mt={2}>
                <Typography>Show Advanced Information</Typography>
                <Switch checked={showAdvancedInfo} onChange={toggleAdvancedInfo} />
              </Box>
              <Collapse in={showAdvancedInfo} timeout="auto" unmountOnExit>
                <Box mt={2} p={2} border="1px solid #ddd" borderRadius="10px">
                  <Typography variant="subtitle1" fontWeight="bold">
                   You've paid in Base with the following balance:
                  </Typography>
                  {advancedInfo.networks.map((network, index) => (
                    <Box key={index} display="flex" alignItems="center" gap="0.5rem" mb={1} ml={1}>
                      <img
                        src={network.logo}
                        alt={network.name}
                        style={{ width: '24px', height: '24px', borderRadius: '50%' }}
                      />
                      <Typography>{network.balance}</Typography>
                    </Box>
                  ))}
                </Box>
              </Collapse>
            </Box>
          )}
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center', padding: '1rem' }}>
          {!isLoading && !isSuccess && (
            <>
              <CancelButton onClick={handleClose}>Cancel</CancelButton>
              <ConfirmButton onClick={handleConfirm}>Confirm</ConfirmButton>
            </>
          )}
          {isSuccess && <ConfirmButton onClick={handleClose}>Close</ConfirmButton>}
        </DialogActions>
      </Dialog>
    </LandingContainer>
  );
};

const LandingContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  minHeight: `calc(100vh - ${SURROUND_HEIGHT}rem - ${DISCLAIMER_HEIGHT}rem)`,
  padding: '2rem 8rem',
  alignItems: 'center',
  width: '100%',
  gap: '2rem',
});

const Header = styled('h1')({
  marginTop: '0rem',
  fontSize: '5.5rem',
  fontFamily: 'sans-serif',
  textAlign: 'center',
  marginBottom: '0rem',
});

const ProductGrid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '2rem',
  width: '100%',
  maxWidth: '1200px',
});

const CardContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '1rem',
  borderRadius: '8px',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
});

const ProductImage = styled('img')({
  width: '100%',
  aspectRatio: '1',
  objectFit: 'cover',
  borderRadius: '8px',
});

const ProductImagePreview = styled('img')({
  width: '150px',
  height: '150px',
  borderRadius: '8px',
  objectFit: 'cover',
  border: '2px solid #ddd',
});

const ProductName = styled('h3')({
  margin: '0.5rem 0 0 0',
  fontSize: '1.2rem',
});

const ProductPrice = styled('p')({
  margin: '0',
  color: '#666',
});

const BuyButton = styled(Button)({
  backgroundColor: '#1B332C',
  color: 'white',
  padding: '0.5rem 2rem',
  borderRadius: '4px',
  textTransform: 'uppercase',
  '&:hover': {
    backgroundColor: '#2C4E44',
  },
});

const ConfirmButton = styled(Button)({
  backgroundColor: '#1B332C',
  color: 'white',
  padding: '0.7rem 2rem',
  borderRadius: '20px',
  textTransform: 'uppercase',
  '&:hover': {
    backgroundColor: '#2C4E44',
  },
});

const CancelButton = styled(Button)({
  backgroundColor: '#C62828',
  color: 'white',
  padding: '0.7rem 2rem',
  borderRadius: '20px',
  textTransform: 'uppercase',
  '&:hover': {
    backgroundColor: '#E53935',
  },
});

export default Landing;
