import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useProductFilter } from './useProductFilter';
import { Product } from '@/types/product';

/**
 * Mock de dados para os testes.
 * Contém produtos variados para testar ordenação e filtros.
 */
const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Smartphone X',
    price: 900,
    category: 'electronics',
    description: 'Um celular',
    image: 'img1.jpg',
    rating: { rate: 4.5, count: 10 }
  },
  {
    id: 2,
    title: 'Camiseta Azul',
    price: 50,
    category: 'clothing',
    description: 'Uma roupa',
    image: 'img2.jpg',
    rating: { rate: 4.0, count: 5 }
  },
  {
    id: 3,
    title: 'Notebook Pro',
    price: 2000,
    category: 'electronics',
    description: 'Um computador',
    image: 'img3.jpg',
    rating: { rate: 5.0, count: 2 }
  },
  {
    id: 4,
    title: 'Abajur',
    price: 30,
    category: 'home',
    description: 'Luz para casa',
    image: 'img4.jpg',
    rating: { rate: 3.5, count: 1 }
  }
];

describe('useProductFilter Hook', () => {
  
  it('deve retornar todos os produtos inicialmente', () => {
    const { result } = renderHook(() => useProductFilter(mockProducts));
    
    expect(result.current.filteredProducts).toHaveLength(4);
    expect(result.current.filteredProducts).toEqual(mockProducts);
  });

  it('deve filtrar corretamente por categoria', () => {
    const { result } = renderHook(() => useProductFilter(mockProducts));

    // Ação: Mudar categoria para 'electronics'
    act(() => {
      result.current.setCategory('electronics');
    });

    expect(result.current.filteredProducts).toHaveLength(2);
    expect(result.current.filteredProducts[0].title).toBe('Smartphone X');
    expect(result.current.filteredProducts[1].title).toBe('Notebook Pro');
  });

  it('deve filtrar corretamente por termo de busca (case insensitive)', () => {
    const { result } = renderHook(() => useProductFilter(mockProducts));

    // Ação: Buscar por "smart"
    act(() => {
      result.current.setSearch('smart');
    });

    expect(result.current.filteredProducts).toHaveLength(1);
    expect(result.current.filteredProducts[0].title).toBe('Smartphone X');
  });

  it('deve ordenar por preço crescente (price-asc)', () => {
    const { result } = renderHook(() => useProductFilter(mockProducts));

    act(() => {
      result.current.setSort('price-asc');
    });

    const prices = result.current.filteredProducts.map(p => p.price);
    expect(prices).toEqual([30, 50, 900, 2000]); // Ordem esperada
  });

  it('deve ordenar por preço decrescente (price-desc)', () => {
    const { result } = renderHook(() => useProductFilter(mockProducts));

    act(() => {
      result.current.setSort('price-desc');
    });

    const prices = result.current.filteredProducts.map(p => p.price);
    expect(prices).toEqual([2000, 900, 50, 30]); // Ordem esperada
  });

  it('deve ordenar alfabeticamente (name-asc)', () => {
    const { result } = renderHook(() => useProductFilter(mockProducts));

    act(() => {
      result.current.setSort('name-asc');
    });

    const titles = result.current.filteredProducts.map(p => p.title);
    expect(titles).toEqual(['Abajur', 'Camiseta Azul', 'Notebook Pro', 'Smartphone X']);
  });

  it('deve combinar filtro de categoria e busca', () => {
    const { result } = renderHook(() => useProductFilter(mockProducts));

    act(() => {
      result.current.setCategory('electronics');
      result.current.setSearch('Note');
    });

    expect(result.current.filteredProducts).toHaveLength(1);
    expect(result.current.filteredProducts[0].title).toBe('Notebook Pro');
  });

  it('deve lidar com resultado vazio', () => {
    const { result } = renderHook(() => useProductFilter(mockProducts));

    act(() => {
      result.current.setSearch('Produto Inexistente XYZ');
    });

    expect(result.current.filteredProducts).toHaveLength(0);
  });
});