import { useState, useMemo } from 'react';
import { Product, SortOption } from '@/types/product';

/**
 * Hook responsável por gerenciar a lógica de filtragem e ordenação local.
 * Recebe a lista bruta de produtos e retorna a lista processada.
 * * @param {Product[]} products - Lista inicial de produtos.
 */
export function useProductFilter(products: Product[]) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState<SortOption>('default');

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (category !== 'all') {
      result = result.filter((p) => p.category === category);
    }

    if (search) {
      const lowerSearch = search.toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(lowerSearch));
    }

    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return result;
  }, [products, category, search, sort]);

  return {
    search, setSearch,
    category, setCategory,
    sort, setSort,
    filteredProducts
  };
}