import { getAllProducts, getCategories } from '@/services/api';
import { ProductCatalog } from '@/components/ProductCatalog';
import { Product } from '@/types/product';
import { ArrowRight, Tag, Truck, ShieldCheck } from 'lucide-react'; // Ícones para a Hero Section

export const revalidate = 60;

export default async function Home() {
  let products: Product[] = [];
  let categories: string[] = [];
  let apiError = false;

  try {
    products = await getAllProducts();
  } catch (error) {
    console.error("Erro crítico ao buscar produtos:", error);
    apiError = true;
  }

  try {
    categories = await getCategories();
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
  }

  return (
    <main className="flex-1 bg-white">
      
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-blue-500/30 px-3 py-1 rounded-full text-xs font-semibold mb-6 border border-blue-400/30">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Novas Ofertas de Verão
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Qualidade Premium, <br/>
              <span className="text-blue-200">Preços Incríveis.</span>
            </h1>
            <p className="text-lg text-blue-100 mb-8 leading-relaxed max-w-lg">
              Explore nossa coleção exclusiva de eletrônicos, moda e acessórios. 
              Tecnologia de ponta e estilo para o seu dia a dia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-blue-600 px-8 py-3.5 rounded-lg font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                Ver Produtos <ArrowRight size={18} />
              </button>
              <button className="bg-transparent border border-white/30 text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Saiba Mais
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            <div className="flex items-center gap-4 justify-center py-2">
              <div className="bg-blue-50 p-3 rounded-full text-blue-600"><Truck size={24} /></div>
              <div>
                <p className="font-bold text-gray-900">Frete Grátis</p>
                <p className="text-sm text-gray-500">Para compras acima de R$ 200</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center py-2">
              <div className="bg-blue-50 p-3 rounded-full text-blue-600"><ShieldCheck size={24} /></div>
              <div>
                <p className="font-bold text-gray-900">Pagamento Seguro</p>
                <p className="text-sm text-gray-500">Proteção total dos seus dados</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center py-2">
              <div className="bg-blue-50 p-3 rounded-full text-blue-600"><Tag size={24} /></div>
              <div>
                <p className="font-bold text-gray-900">Melhores Preços</p>
                <p className="text-sm text-gray-500">Garantia de preço baixo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Nossa Coleção</h2>
            <p className="text-gray-500 mt-1">Encontre exatamente o que você procura.</p>
          </div>
        </div>

        {apiError && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg">
            <div className="flex items-start">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Atenção</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  A API externa (FakeStore) não respondeu a tempo. Tente recarregar a página em alguns instantes.
                </p>
              </div>
            </div>
          </div>
        )}

        <ProductCatalog initialProducts={products} categories={categories} />
      </section>
    </main>
  );
}