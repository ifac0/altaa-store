/**
 * Representa a estrutura de avaliação de um produto.
 */
export interface Rating {
  /** Nota média do produto (0-5) */
  rate: number;
  /** Quantidade de avaliações */
  count: number;
}

/**
 * Representa um produto retornado pela Fake Store API.
 */
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

/**
 * Opções de ordenação disponíveis no filtro.
 */
export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc';