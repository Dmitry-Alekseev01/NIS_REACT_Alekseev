import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Chip,
  Rating,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useGetProductByIdQuery } from '@shared/api/products';
import { useSettings } from '@features/settings/hooks/useSettings';

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { theme } = useSettings();

  const { data: product, isLoading, error } = useGetProductByIdQuery(
    Number(id),
    { skip: !id }
  );

  if (isLoading) {
    return (
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container maxWidth="lg">
        <Alert severity="error" sx={{ mt: 2 }}>
          {t('errors.network')}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/products')}
        sx={{ mb: 3 }}
      >
        {t('common.back')}
      </Button>

      <Paper sx={{ p: 4 }}>
        {/* ✅ CSS Grid вместо MUI Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 4,
          }}
        >
          {/* Левая колонка — изображение */}
          <Box>
            <Box
              sx={{
                width: '100%',
                height: 400,
                overflow: 'hidden',
                borderRadius: 2,
              }}
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
          </Box>

          {/* Правая колонка — информация о товаре */}
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              {product.title}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={product.rating} precision={0.5} readOnly />
              <Typography variant="body2" sx={{ ml: 1 }}>
                ({product.rating})
              </Typography>
            </Box>

            <Typography variant="h5" color="primary" gutterBottom>
              ${product.price}
              {product.discountPercentage > 0 && (
                <Typography
                  component="span"
                  variant="body1"
                  color="text.secondary"
                  sx={{ textDecoration: 'line-through', ml: 1 }}
                >
                  ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                </Typography>
              )}
              {product.discountPercentage > 0 && (
                <Chip
                  label={`${product.discountPercentage}% off`}
                  color="error"
                  size="small"
                  sx={{ ml: 1 }}
                />
              )}
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Chip label={product.brand} sx={{ mr: 1 }} />
              <Chip label={product.category} color="primary" />
            </Box>

            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>

            {/* Сетка 2 колонки для остатка и SKU */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 2,
                mt: 2,
              }}
            >
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  textAlign: 'center',
                  backgroundColor:
                    theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#f5f5f5',
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {t('products.stock')}
                </Typography>
                <Typography variant="h6">{product.stock} units</Typography>
              </Paper>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  textAlign: 'center',
                  backgroundColor:
                    theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#f5f5f5',
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  SKU
                </Typography>
                <Typography variant="h6">
                  {product.id.toString().padStart(6, '0')}
                </Typography>
              </Paper>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProductDetailsPage;