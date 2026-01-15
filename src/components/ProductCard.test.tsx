import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProductCard } from './ProductCard';
import { Product } from '@/types/product';

// Mock do produto para o teste
const mockProduct: Product = {
  id: 1,
  title: 'Tênis de Corrida',
  price: 299.99,
  description: 'Confortável',
  category: 'calçados',
  image: 'https://fakestoreapi.com/img/shoe.jpg',
  rating: { rate: 4.5, count: 10 }
};

describe('ProductCard Component', () => {
  it('deve renderizar as informações do produto corretamente', () => {
    render(<ProductCard product={mockProduct} />);

    // Verifica Título
    expect(screen.getByText('Tênis de Corrida')).toBeDefined();
    
    // Verifica Categoria (em uppercase no CSS, mas o texto no DOM é o original ou transformado dependendo do teste. 
    // O matcher do testing-library é case-insensitive por padrão para getByText se usar regex ou string parcial, 
    // mas aqui vamos buscar exato)
    expect(screen.getByText('calçados')).toBeDefined();

    // Verifica Preço formatado
    // R$ 299,99
    expect(screen.getByText('R$ 299,99')).toBeDefined();
  });

  it('deve conter o link correto para a página de detalhes', () => {
    render(<ProductCard product={mockProduct} />);
    
    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toBe('/product/1');
  });

  it('deve ter uma imagem com o texto alternativo correto', () => {
    render(<ProductCard product={mockProduct} />);
    
    const img = screen.getByRole('img');
    expect(img.getAttribute('alt')).toBe('Tênis de Corrida');
    // Note: Next/Image gera URLs complexas, então nem sempre testamos o src exato, mas a presença é vital.
  });
});