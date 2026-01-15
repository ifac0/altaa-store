import { getProductById } from '@/services/api';
import Image from 'next/image';
import Link from 'next/link';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

/**
 * Página de detalhes do produto.
 */
export default async function ProductDetails(props: ProductPageProps) {
  const params = await props.params;
  const id = params.id;

  const product = await getProductById(id);

  // Formatador de moeda
  const priceFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <div className="container bg-white mx-auto px-4 py-8">
      <Link href="/" className="text-blue-600 hover:underline mb-6 inline-block">
        &larr; Voltar para a loja
      </Link>

      <div className="grid md:grid-cols-2 gap-8 bg-gray-200 p-6 rounded-xl shadow-sm">
        <div className="relative h-96 w-full">
          <Image 
            src={product.image} 
            alt={product.title} 
            fill 
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="flex flex-col">
          <span className="uppercase text-sm tracking-wide text-blue-600 font-bold">
            {product.category}
          </span>
          <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-4">{product.title}</h1>
          
          <div className="flex items-center mb-6">
            <span className="text-yellow-500 text-xl mr-1">★</span>
            <span className="font-medium text-gray-700">{product.rating.rate}</span>
            <span className="text-gray-400 text-sm ml-2">({product.rating.count} avaliações)</span>
          </div>

          <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
          
          <div className="mt-auto pt-6 border-t">
            <span className="text-4xl font-bold text-gray-900">
                {priceFormatter.format(product.price)}
            </span>
            <button className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}