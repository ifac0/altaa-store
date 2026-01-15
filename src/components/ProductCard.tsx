import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

/**
 * Componente de apresentação de um card de produto individual.
 */
export function ProductCard({ product }: ProductCardProps) {
  // Formatador de moeda
  const priceFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <Link href={`/product/${product.id}`} className="group border rounded-lg p-4 hover:shadow-lg transition-shadow bg-gray-200 flex flex-col h-full">
      <div className="relative w-full h-48 mb-4 overflow-hidden rounded-md">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <div className="flex-1 flex flex-col">
        <span className="text-xs text-blue-600 font-semibold uppercase mb-1">
            {product.category}
        </span>
        <h2 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 flex-1" title={product.title}>
          {product.title}
        </h2>
        <p className="text-lg font-bold text-gray-900 mt-auto">
          {priceFormatter.format(product.price)}
        </p>
      </div>
    </Link>
  );
}