import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProductCatalog } from './ProductCatalog';
import { Product } from '@/types/product';

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Item Barato',
    price: 10,
    description: 'Desc A',
    category: 'cat1',
    image: 'img1.jpg',
    rating: { rate: 1, count: 1 }
  },
  {
    id: 2,
    title: 'Item Caro',
    price: 100,
    description: 'Desc B',
    category: 'cat2',
    image: 'img2.jpg',
    rating: { rate: 2, count: 2 }
  }
];

const mockCategories = ['cat1', 'cat2'];

describe('ProductCatalog Component', () => {
  it('deve renderizar a lista inicial de produtos', () => {
    render(<ProductCatalog initialProducts={mockProducts} categories={mockCategories} />);
    
    expect(screen.getByText('Item Barato')).toBeInTheDocument();
    expect(screen.getByText('Item Caro')).toBeInTheDocument();
    // Verifica se o contador de resultados mostra 2
    expect(screen.getByText('2')).toBeInTheDocument(); 
  });

  it('deve atualizar a lista ao mudar o filtro de categoria', () => {
    render(<ProductCatalog initialProducts={mockProducts} categories={mockCategories} />);

    const selects = screen.getAllByRole('combobox');
    const categorySelect = selects[0]; // Primeiro select é categoria

    fireEvent.change(categorySelect, { target: { value: 'cat1' } });

    expect(screen.getByText('Item Barato')).toBeInTheDocument();
    expect(screen.queryByText('Item Caro')).not.toBeInTheDocument();
    
    // Verifica se o botão "Limpar filtros" apareceu
    expect(screen.getByText(/Limpar filtros/i)).toBeInTheDocument();
  });

  it('deve reordenar a lista ao mudar o filtro de ordenação', () => {
    render(<ProductCatalog initialProducts={mockProducts} categories={mockCategories} />);

    const selects = screen.getAllByRole('combobox');
    const sortSelect = selects[1]; // Segundo select é ordenação

    fireEvent.change(sortSelect, { target: { value: 'price-desc' } });

    const productTitles = screen.getAllByRole('heading', { level: 2 });
    expect(productTitles[0]).toHaveTextContent('Item Caro');
    expect(productTitles[1]).toHaveTextContent('Item Barato');
  });

  it('deve filtrar por texto de busca', () => {
    render(<ProductCatalog initialProducts={mockProducts} categories={mockCategories} />);
    
    const input = screen.getByPlaceholderText(/O que você está procurando/i);
    
    fireEvent.change(input, { target: { value: 'Barato' } });
    
    expect(screen.getByText('Item Barato')).toBeInTheDocument();
    expect(screen.queryByText('Item Caro')).not.toBeInTheDocument();
  });

  it('deve limpar a busca ao clicar no botão X do input', () => {
    render(<ProductCatalog initialProducts={mockProducts} categories={mockCategories} />);
    
    const input = screen.getByPlaceholderText(/O que você está procurando/i);
    
    // Digita algo para fazer o botão X aparecer
    fireEvent.change(input, { target: { value: 'Barato' } });
    expect(screen.queryByText('Item Caro')).not.toBeInTheDocument();
    
    // Encontra o botão X dentro do input (é o primeiro botão na ordem do DOM quando a busca está ativa)
    const buttons = screen.getAllByRole('button');
    const clearSearchBtn = buttons[0]; 
    
    fireEvent.click(clearSearchBtn);
    
    expect(input).toHaveValue('');
    expect(screen.getByText('Item Caro')).toBeInTheDocument();
  });

  it('deve limpar todos os filtros ao clicar em Limpar filtros (rodapé)', () => {
    render(<ProductCatalog initialProducts={mockProducts} categories={mockCategories} />);
    
    // Aplica um filtro para ativar o botão
    const selects = screen.getAllByRole('combobox');
    fireEvent.change(selects[0], { target: { value: 'cat1' } });
    
    const clearAllBtn = screen.getByText(/Limpar filtros/i);
    fireEvent.click(clearAllBtn);
    
    // Verifica reset
    expect(screen.getByText('Item Caro')).toBeInTheDocument();
    expect(selects[0]).toHaveValue('all');
  });

  it('deve exibir o estado vazio e permitir limpar filtros pelo botão de ação', () => {
    render(<ProductCatalog initialProducts={mockProducts} categories={mockCategories} />);
    
    const input = screen.getByPlaceholderText(/O que você está procurando/i);
    fireEvent.change(input, { target: { value: 'Produto Inexistente XYZ' } });
    
    expect(screen.getByText(/Nenhum produto encontrado/i)).toBeInTheDocument();
    
    const resetBtn = screen.getByText(/Ver todos os produtos/i);
    fireEvent.click(resetBtn);
    
    expect(screen.getByText('Item Barato')).toBeInTheDocument();
    expect(input).toHaveValue('');
  });
});