import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Rating,
  TextField,
  InputAdornment,
  Pagination,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import debounce from 'lodash/debounce';

import { useGetProductsQuery } from '@shared/api/products';
import { useSettings } from '@features/settings/hooks/useSettings';

const FALLBACK_IMAGE = 'https://via.placeholder.com/200x200?text=No+Image';

export const ProductList: React.FC = () => {
  const { t } = useTranslation();
  const { pageSize } = useSettings();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [inputValue, setInputValue] = useState('');

  const debouncedSetSearch = useRef(
    debounce((value: string) => {
      setSearch(value);
      setPage(1);
    }, 400)
  ).current;

  useEffect(() => {
    return () => {
      debouncedSetSearch.cancel();
    };
  }, [debouncedSetSearch]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    debouncedSetSearch(value);
  };

  const { data: productsData, isLoading, error } = useGetProductsQuery({
    limit: pageSize,
    skip: (page - 1) * pageSize,
    search,
  });

  const products = productsData?.products || [];
  const total = productsData?.total || 0;
  const totalPages = Math.ceil(total / pageSize);

  if (isLoading && !products.length) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {t('errors.network')}
      </Alert>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder={t('products.searchPlaceholder')}
          value={inputValue}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {!isLoading && products.length === 0 ? (
        <Typography variant="h6" textAlign="center" sx={{ mt: 4 }}>
          {t('products.noProducts')}
        </Typography>
      ) : (
        <>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: '1fr 1fr',
                md: '1fr 1fr 1fr',
              },
              gap: 3,
            }}
          >
            {products.map((product) => (
              <Card
                key={product.id}
                component={Link}
                to={`/products/${product.id}`}
                sx={{
                  textDecoration: 'none',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.thumbnail}
                  alt={product.title}
                  sx={{ objectFit: 'cover' }}
                  loading="lazy"
                  fetchPriority="low"   // ✅ camelCase, ошибка исправлена
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_IMAGE;
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {product.description.substring(0, 100)}...
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating value={product.rating} precision={0.5} readOnly />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      ({product.rating})
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" color="primary">
                      ${product.price}
                    </Typography>
                    <Chip label={product.category} size="small" color="secondary" />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {t('products.stock')}: {product.stock}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>

          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, value) => setPage(value)}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};