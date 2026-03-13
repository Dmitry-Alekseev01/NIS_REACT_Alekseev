import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ProductList } from '@widgets/ProductList';

const ProductsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('products.title')}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t('products.manage')}
        </Typography>
      </Box>
      <ProductList />
    </Container>
  );
};

export default ProductsPage;