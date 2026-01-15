import { Product } from '@/types/product';

const BASE_URL = 'https://fakestoreapi.com';

/**
 * Busca todos os produtos da API.
 * @returns {Promise<Product[]>} Lista de produtos.
 */
export async function getAllProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error('Falha ao buscar produtos');
  return res.json();
}

/**
 * Busca todas as categorias disponíveis.
 * @returns {Promise<string[]>} Lista de nomes de categorias.
 */
export async function getCategories(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/products/categories`);
  if (!res.ok) throw new Error('Falha ao buscar categorias');
  return res.json();
}

/**
 * Busca um produto específico pelo ID.
 * @param {string} id - O ID do produto.
 * @returns {Promise<Product>} O objeto do produto.
 */
export async function getProductById(id: string): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error('Falha ao buscar detalhes do produto');
  return res.json();
}