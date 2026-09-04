import { useState, useEffect, useCallback } from 'react';
import { Product, CategoryFilter, SortOption } from '../types/product';
import { apiService } from '../services/api';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [category, setCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('recommended');

  const fetchProductsList = useCallback(
    async (forceErr = false) => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.getProducts({
          category,
          query: searchQuery,
          sortBy,
          forceError: forceErr,
        });
        setProducts(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    },
    [category, searchQuery, sortBy]
  );

  useEffect(() => {
    fetchProductsList();
  }, [fetchProductsList]);

  return {
    products,
    loading,
    error,
    category,
    setCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    refetch: () => fetchProductsList(false),
    simulateError: () => fetchProductsList(true),
  };
}
