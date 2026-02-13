import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  LinearProgress,
} from '@mui/material';
import {
  ShoppingCart,
  AttachMoney,
  People,
  TrendingUp,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useGetProductsQuery } from '@shared/api/products';

const DashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const { data: productsData } = useGetProductsQuery({ limit: 5 });

  const stats = [
    {
      titleKey: 'dashboard.totalProducts',
      value: productsData?.total || 0,
      icon: <ShoppingCart />,
      color: '#1976d2',
      progress: 75,
    },
    {
      titleKey: 'dashboard.revenue',
      value: '$24,580',
      icon: <AttachMoney />,
      color: '#2e7d32',
      progress: 60,
    },
    {
      titleKey: 'dashboard.customers',
      value: '1,254',
      icon: <People />,
      color: '#ed6c02',
      progress: 45,
    },
    {
      titleKey: 'dashboard.growth',
      value: '+23.5%',
      icon: <TrendingUp />,
      color: '#9c27b0',
      progress: 90,
    },
  ];

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        {t('navigation.dashboard')}
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
          gap: 3,
          mb: 4,
        }}
      >
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    backgroundColor: `${stat.color}20`,
                    borderRadius: '50%',
                    p: 1,
                  }}
                >
                  <Box sx={{ color: stat.color }}>{stat.icon}</Box>
                </Box>
                <Typography variant="h5">{stat.value}</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {t(stat.titleKey)}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={stat.progress}
                sx={{
                  mt: 1,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: `${stat.color}20`,
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: stat.color,
                  },
                }}
              />
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
          gap: 3,
        }}
      >
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            {t('dashboard.recentOrders')}
          </Typography>
          <Box
            sx={{
              height: 300,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography color="text.secondary">
              {t('dashboard.orderChartPlaceholder')}
            </Typography>
          </Box>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            {t('dashboard.recentProducts')}
          </Typography>
          <Box>
            {productsData?.products.slice(0, 5).map((product) => (
              <Box
                key={product.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  py: 1,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 1,
                    overflow: 'hidden',
                    mr: 2,
                  }}
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body2">{product.title}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    ${product.price}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default DashboardPage;