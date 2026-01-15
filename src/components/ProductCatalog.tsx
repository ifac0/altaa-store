'use client';

import { Product } from '@/types/product';
import { useProductFilter } from '@/hooks/useProductFilter';
import { ProductCard } from './ProductCard';
import { Search, SlidersHorizontal, ChevronDown, X } from 'lucide-react'; 

interface ProductCatalogProps {
  initialProducts: Product[];
  categories: string[];
}

export function ProductCatalog({ initialProducts, categories }: ProductCatalogProps) {
  const { 
    search, setSearch,
    category, setCategory, 
    sort, setSort, 
    filteredProducts 
  } = useProductFilter(initialProducts);

  const hasActiveFilters = category !== 'all' || search !== '';

  const clearFilters = () => {
    setCategory('all');
    setSearch('');
    setSort('default');
  };

  return (
    <div className="space-y-8">
      {/* --- Barra de Ferramentas (Filtros e Busca) --- */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm sticky top-20 z-30 transition-shadow hover:shadow-md">
        <div className="flex flex-col md:flex-row gap-5 justify-between items-center">
          
          {/* Campo de Busca */}
          <div className="relative w-full md:max-w-md group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="O que você está procurando?"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-sm"
            />
            {search && (
              <button 
                onClick={() => setSearch('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Filtros Dropdown */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/* Filtro de Categoria */}
            <div className="relative w-full md:w-48">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SlidersHorizontal className="h-4 w-4 text-gray-500" />
              </div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="appearance-none block w-full pl-10 pr-10 py-3 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 rounded-xl bg-white hover:bg-gray-50 transition-colors cursor-pointer capitalize font-medium text-gray-700"
              >
                <option value="all">Todas Categorias</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>

            {/* Filtro de Ordenação */}
            <div className="relative w-full md:w-48">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as any)}
                className="appearance-none block w-full pl-4 pr-10 py-3 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 rounded-xl bg-white hover:bg-gray-50 transition-colors cursor-pointer font-medium text-gray-700"
              >
                <option value="default">Relevância</option>
                <option value="price-asc">Menor Preço</option>
                <option value="price-desc">Maior Preço</option>
                <option value="name-asc">Nome (A-Z)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé da Barra (Contador e Limpar) */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-sm">
          <span className="text-gray-500">
            Mostrando <span className="font-bold text-gray-900">{filteredProducts.length}</span> resultados
          </span>
          {hasActiveFilters && (
            <button 
              onClick={clearFilters}
              className="text-blue-600 hover:text-blue-800 font-semibold text-xs uppercase tracking-wide transition-colors flex items-center gap-1"
            >
              <X size={14} /> Limpar filtros
            </button>
          )}
        </div>
      </div>

      {/* --- Grid de Produtos --- */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-in fade-in duration-500">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        // --- Empty State Melhorado ---
        <div className="flex flex-col items-center justify-center py-24 px-4 bg-white rounded-2xl border border-dashed border-gray-300 text-center animate-in zoom-in-95 duration-300">
          <div className="bg-blue-50 p-6 rounded-full mb-6">
            <Search className="h-10 w-10 text-blue-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhum produto encontrado</h3>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Não encontramos resultados para sua busca atual. Tente usar termos diferentes ou limpar os filtros.
          </p>
          <button 
            onClick={clearFilters}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-semibold shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 hover:-translate-y-0.5"
          >
            Ver todos os produtos
          </button>
        </div>
      )}
    </div>
  );
}