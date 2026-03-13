import { api } from './index';

const proxyImageUrl = (url: string): string => {
  if (!url) return url;
  return url.replace('https://cdn.dummyjson.com', '/cdn');
};

export const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, GetProductsParams>({
      query: (params) => {
        const baseParams: Record<string, any> = {
          limit: params.limit || 20,
          skip: params.skip || 0,
        };

        let url = '/products';
        if (params.search) {
          url = '/products/search';
          baseParams.q = params.search;
        }

        return { url, params: baseParams };
      },
      transformResponse: (response: ProductsResponse) => ({
        ...response,
        products: response.products.map((product) => ({
          ...product,
          thumbnail: proxyImageUrl(product.thumbnail),
          images: product.images.map(proxyImageUrl),
        })),
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.products.map(({ id }) => ({ type: 'Product' as const, id })),
              { type: 'Product', id: 'LIST' },
            ]
          : [{ type: 'Product', id: 'LIST' }],
      keepUnusedDataFor: 300,
    }),

    getProductById: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
      transformResponse: (response: Product) => ({
        ...response,
        thumbnail: proxyImageUrl(response.thumbnail),
        images: response.images.map(proxyImageUrl),
      }),
      providesTags: (_result, _error, id) => [{ type: 'Product', id }],
      keepUnusedDataFor: 300,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;

export interface GetProductsParams {
  limit?: number;
  skip?: number;
  search?: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}